import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { authOptions } from "../auth/[...nextauth]/authOptions";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { FAQuestion } from "@/app/[lang]/models";
import { logger } from "@/app/[lang]/utils/logger";
import { revalidateTag } from "next/cache";

//*-----------------------------get all faqs
export const GET = async () => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      await panotechDBConnect();
      const faqs = await FAQuestion.find();
      return Response.json(faqs, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api faqs get error, status:500/ ${err} `);

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error(`api faqs get error, status:403`);

    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------create a new news
export const POST = async (request) => {
  const headerList = headers();
  const session = await getServerSession(authOptions);

  const API_KEY = headerList.get("API_KEY");
  if (
    API_KEY === process.env.NEXT_PUBLIC_API_KEY &&
    (session?.user.role === "admin" || session?.user.role === "operator")
  ) {
    const { values } = await request.json();

    const { faTitle, arTitle, enTitle, faBody, arBody, enBody, status } =
      values;

    try {
      await panotechDBConnect();
      const existFaQuestion = await FAQuestion.findOne({
        "title.fa": faTitle,
      });
      const existEnQuestion = await FAQuestion.findOne({
        "title.en": enTitle,
      });
      const existArQuestion = await FAQuestion.findOne({
        "title.ar": arTitle,
      });

      if (existFaQuestion || existEnQuestion || existArQuestion) {
        return NextResponse.json(
          { message: "این سؤال قبلاً ثبت شده است" },
          { status: 409 }
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

      const newFAQuestion = new FAQuestion({
        title: { fa: faTitle, ar: arTitle, en: enTitle },
        body: { fa: faBody, ar: arBody, en: enBody },
        status,
      });
      await newFAQuestion.save();

      const returnObject = {
        _id: newFAQuestion._id,
        title: { fa: faTitle, ar: arTitle, en: enTitle },
        body: { fa: faBody, ar: arBody, en: enBody },
        status,
      };

      revalidateTag("faqsChange");
      return NextResponse.json(returnObject, { status: 201 });
    } catch (err) {
      logger.error(`api faqs post error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api faqs post error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
