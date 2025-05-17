import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { CustomProduct, User } from "@/app/[lang]/models";
import mailer from "@/app/[lang]/utils/mailer";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { shop } from "@/public/data/data";
import { logger } from "@/app/[lang]/utils/logger";
import EmailBodyTemplate from "@/app/[lang]/components/EmailBodyTemplate";
import { revalidateTag } from "next/cache";

//*-----------------------------update custom product status
export const PUT = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  const session = await getServerSession(authOptions);

  if (
    API_KEY === process.env.NEXT_PUBLIC_API_KEY &&
    (session?.user.role === "admin" || session?.user.role === "operator")
  ) {
    const _id = params.id;
    try {
      const { values } = await request.json();
      const { status } = values;

      await panotechDBConnect();
      const customProduct = await CustomProduct.findById(_id);

      if (!customProduct) {
        return NextResponse.json(
          { message: "سفارشی با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      try {
        const validatedCustomProduct =
          await CustomProduct.customProductEditStatusValidation({
            status,
          });
      } catch (err) {
        return NextResponse.json(
          { message: "موارد وارد شده صحیح نمی‌باشد" },
          { status: 422 }
        );
      }

      const returnObject = {
        _id,
        status,
      };

      await CustomProduct.findByIdAndUpdate(_id, {
        status,
      });

      //?------------------------------------------------------------ sendEmail
      const lang = customProduct.lang;

      const userSubject = shop[lang].customProductApi.subject;

      const userMailBody = EmailBodyTemplate(
        lang,
        shop[lang].customProductApi.subject,
        `${lang === "en" ? shop[lang].customProductApi.dearUser : ""} ${
          customProduct.firstName
        } ${customProduct.lastName} ${
          lang !== "en" ? shop[lang].customProductApi.dearUser : ""
        }`,
        shop[lang].customProductApi.hello,
        `${
          status === "inProgress"
            ? shop[lang].customProductApi.inProgress
            : status === "completed"
            ? shop[lang].customProductApi.completed
            : status === "rejected"
            ? shop[lang].customProductApi.rejected
            : ""
        }`,
        shop[lang].customProductApi.thanks,
        "",
        `${shop[lang].customProductApi.orderCode}: ${customProduct.orderCode}`
      );

      const userMail = await mailer(
        customProduct.email,
        userSubject,
        userMailBody
      );

      revalidateTag("customProductsChange");

      return NextResponse.json(returnObject, { status: 200 });
    } catch (err) {
      logger.error(`api custom-products id put error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api custom-products id put error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};

//*-----------------------------delete product
export const DELETE = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  const session = await getServerSession(authOptions);

  if (
    API_KEY === process.env.NEXT_PUBLIC_API_KEY &&
    (session?.user.role === "admin" || session?.user.role === "operator")
  ) {
    try {
      const _id = await params.id;

      await panotechDBConnect();
      const customProduct = await CustomProduct.findById(_id);

      if (!customProduct) {
        return NextResponse.json(
          { message: "سفارشی با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      await CustomProduct.findByIdAndDelete(_id);

      revalidateTag("customProductsChange");

      return NextResponse.json(_id, { status: 200 });
    } catch (err) {
      logger.error(`api custom-products id delete error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api custom-products id delete error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
