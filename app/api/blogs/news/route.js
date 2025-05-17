import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";

import { authOptions } from "../../auth/[...nextauth]/authOptions";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { News, User } from "@/app/[lang]/models";
import { logger } from "@/app/[lang]/utils/logger";

//*-----------------------------get all news
export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status") || "null";
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      let news = [];
      await panotechDBConnect();
      if (status !== "null") {
        news = await News.find({ status }).sort({ date: -1 }).populate({
          path: "writer",
          model: "User",
          select: "firstName lastName _id",
        });
      }
      if (status === "null") {
        news = await News.find().sort({ date: -1 }).populate({
          path: "writer",
          model: "User",
          select: "firstName lastName _id",
        });
      }
      return Response.json(news, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api news get error, status:500/ ${err}`);
      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error("api news get error, status:403");
    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------create a new news
export const POST = async (request) => {
  const headerList = headers();
  const session = await getServerSession(authOptions);
  let filesFolder = "";
  const API_KEY = headerList.get("API_KEY");
  if (
    API_KEY === process.env.NEXT_PUBLIC_API_KEY &&
    (session?.user.role === "admin" || session?.user.role === "operator")
  ) {
    const {
      values,
      imagesNames,
      videosNames,
      faKeywords,
      enKeywords,
      arKeywords,
      userId,
      date,
    } = await request.json();

    const {
      faTitle,
      arTitle,
      enTitle,
      faSlug,
      arSlug,
      enSlug,
      faFirstBody,
      arFirstBody,
      enFirstBody,
      faSecondBody,
      arSecondBody,
      enSecondBody,
      status,
      category,
    } = values;

    filesFolder = `./public/panotech/news/${enSlug.substring(0, 50)}`;

    try {
      await panotechDBConnect();
      const existFaNews = await News.findOne({
        "title.fa": faTitle,
      });

      const existEnNews = await News.findOne({
        "title.en": enTitle,
      });

      const existArNews = await News.findOne({
        "title.ar": arTitle,
      });

      if (existFaNews || existEnNews || existArNews) {
        return NextResponse.json(
          { message: "این خبر قبلاً ثبت شده است" },
          { status: 409 }
        );
      }

      //? validate values with createNewsSchema
      try {
        const validatedNews = await News.newsValidation({
          faTitle,
          arTitle,
          enTitle,
          faSlug,
          arSlug,
          enSlug,
          faFirstBody,
          arFirstBody,
          enFirstBody,
          faSecondBody,
          arSecondBody,
          enSecondBody,
          status,
          category,
          images: imagesNames,
          videos: videosNames,
        });
      } catch (err) {
        await rm(filesFolder, {
          recursive: true,
          force: true,
        });
        return NextResponse.json(
          { message: "موارد وارد شده صحیح نمی‌باشد" },
          { status: 422 }
        );
      }

      const newNews = new News({
        title: { fa: faTitle, ar: arTitle, en: enTitle },
        slug: { fa: faSlug, ar: arSlug, en: enSlug },
        firstBody: { fa: faFirstBody, ar: arFirstBody, en: enFirstBody },
        secondBody: { fa: faSecondBody, ar: arSecondBody, en: enSecondBody },
        keywords: { fa: faKeywords, en: enKeywords, ar: arKeywords },
        status,
        category,
        images: imagesNames,
        videos: videosNames,
        writer: userId,
        date: new Date(`${date.year}-${date.month}-${date.day}`),
      });
      await newNews.save();

      const user = await User.findById(userId, {
        _id: 1,
        firstName: 1,
        lastName: 1,
      });

      const returnObject = {
        _id: newNews._id,
        title: { fa: faTitle, ar: arTitle, en: enTitle },
        slug: { fa: faSlug, ar: arSlug, en: enSlug },
        firstBody: { fa: faFirstBody, ar: arFirstBody, en: enFirstBody },
        secondBody: { fa: faSecondBody, ar: arSecondBody, en: enSecondBody },
        keywords: { fa: faKeywords, en: enKeywords, ar: arKeywords },
        status,
        category,
        images: imagesNames,
        videos: videosNames,
        writer: user,
        date: new Date(`${date.year}-${date.month}-${date.day}`),
      };

      revalidateTag("newsChange");
      return NextResponse.json(returnObject, { status: 201 });
    } catch (err) {
      await rm(filesFolder, {
        recursive: true,
        force: true,
      });

      logger.error(`api news post error, status:500/ ${err}`);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    await rm(filesFolder, {
      recursive: true,
      force: true,
    });

    logger.error("api news post error, status:403");

    return NextResponse.json("access denied", { status: 403 });
  }
};
