import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { FAQuestion } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { logger } from "@/app/[lang]/utils/logger";
import { revalidateTag } from "next/cache";

//*-----------------------------edit FAQuestion
export const PUT = async (request, { params }) => {
  const headerList = headers();
  const session = await getServerSession(authOptions);

  const API_KEY = headerList.get("API_KEY");
  if (
    API_KEY === process.env.NEXT_PUBLIC_API_KEY &&
    (session?.user.role === "admin" || session?.user.role === "operator")
  ) {
    const { values } = await request.json();
    const _id = params.id;
    const { faTitle, arTitle, enTitle, faBody, arBody, enBody, status } =
      values;

    try {
      await panotechDBConnect();

      if (!(await FAQuestion.findById(_id))) {
        return NextResponse.json(
          { message: "سؤالی با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      //? validate values with createNewsSchema
      try {
        const validatedFAQuestion = await FAQuestion.FAQuestionsValidation({
          faTitle,
          arTitle,
          enTitle,
          faBody,
          arBody,
          enBody,
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
        title: { fa: faTitle, ar: arTitle, en: enTitle },
        body: { fa: faBody, ar: arBody, en: enBody },
        status,
      };

      await FAQuestion.findByIdAndUpdate(_id, {
        title: { fa: faTitle, ar: arTitle, en: enTitle },
        body: { fa: faBody, ar: arBody, en: enBody },
        status,
      });

      revalidateTag("faqsChange");

      return NextResponse.json(returnObject, { status: 200 });
    } catch (err) {
      logger.error(`api faqs id put error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api faqs id put error, status:403`);

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
      const faq = await FAQuestion.findById(_id);

      if (!faq) {
        return NextResponse.json(
          { message: "سؤالی با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      await FAQuestion.findByIdAndDelete(_id);
      revalidateTag("faqsChange");

      return NextResponse.json(_id, { status: 200 });
    } catch (err) {
      logger.error(`api faqs id delete error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api faqs id delete error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
