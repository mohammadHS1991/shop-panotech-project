import { NextResponse } from "next/server";
import { headers } from "next/headers";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { Order, User } from "@/app/[lang]/models";
import mailer from "@/app/[lang]/utils/mailer";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { logger } from "@/app/[lang]/utils/logger";
import { orderTexts } from "@/public/data/data";
import EmailBodyTemplate from "@/app/[lang]/components/EmailBodyTemplate";
import { revalidateTag } from "next/cache";
//*-----------------------------update cart status
export const PUT = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  const session = await getServerSession(authOptions);

  if (
    API_KEY === process.env.NEXT_PUBLIC_API_KEY &&
    (session?.user.role === "admin" || session?.user.role === "operator")
  ) {
    try {
      const _id = params.id;
      const { values } = await request.json();
      const { status } = values;

      await panotechDBConnect();
      const singleOrder = await Order.findById(_id);
      const user = await User.findById(singleOrder.user);

      if (!singleOrder) {
        return NextResponse.json(
          { message: "سفارشی با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      const returnObject = {
        _id,
        status,
      };

      await Order.findByIdAndUpdate(_id, {
        status,
      });

      await User.findByIdAndUpdate(
        singleOrder.user,
        {
          $set: { "finishedCarts.$[elem].status": status },
        },
        { arrayFilters: [{ "elem._id": _id }] }
      );

      //?------------------------------------------------------------ sendEmail
      const lang = singleOrder.lang;

      const userSubject = orderTexts[lang].orderApi.statusSubject;

      const userMailBody = EmailBodyTemplate(
        lang,
        userSubject,
        `${lang === "en" ? orderTexts[lang].orderApi.dearUser : ""} ${
          user.firstName
        } ${user.lastName} ${
          lang !== "en" ? orderTexts[lang].orderApi.dearUser : ""
        }`,
        orderTexts[lang].orderApi.hello,
        status === "inProgress"
          ? orderTexts[lang].orderApi.inProgress
          : status === "completed"
          ? orderTexts[lang].orderApi.completed
          : status === "canceled"
          ? orderTexts[lang].orderApi.rejected
          : "",
        orderTexts[lang].orderApi.thanks,
        "",
        `${orderTexts[lang].orderApi.orderCode}: ${singleOrder.orderCode}`
      );

      const userMail = await mailer(user.email, userSubject, userMailBody);
      //?------------------------------------------------------------ /sendEmail

      revalidateTag("ordersChange");
      return NextResponse.json(returnObject, { status: 200 });
    } catch (err) {
      logger.error(`api order id put error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api order id put error, status:403 `);

    return NextResponse.json("access denied", { status: 403 });
  }
};
