import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";

import { News, User } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { logger } from "@/app/[lang]/utils/logger";

//*-----------------------------get single event by id
export const GET = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    const newsId = params.id;
    try {
      await panotechDBConnect();
      const news = await News.findById(newsId).populate({
        path: "writer",
        model: "User",
        select: "firstName lastName _id",
      });

      if (!news) {
        return Response.json(
          { message: "خبری با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      return Response.json(news, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api news id get error, status:500/ ${err}`);

      return Response.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error("api news id get error, status:403");

    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------edit news
export const PUT = async (request, { params }) => {
  const headerList = headers();
  const session = await getServerSession(authOptions);

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
      imagesChanged,
      date,
    } = await request.json();
    const _id = params.id;
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

    try {
      await panotechDBConnect();

      const news = await News.findById(_id);
      if (!news) {
        return NextResponse.json(
          { message: "خبری با این مشخصات یافت نشد" },
          { status: 404 }
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
        return NextResponse.json(
          { message: "موارد وارد شده صحیح نمی‌باشد" },
          { status: 422 }
        );
      }

      const user = await User.findById(userId, {
        _id: 1,
        firstName: 1,
        lastName: 1,
      });

      const returnObject = {
        _id,
        title: { fa: faTitle, ar: arTitle, en: enTitle },
        slug: { fa: faSlug, ar: arSlug, en: enSlug },
        firstBody: { fa: faFirstBody, ar: arFirstBody, en: enFirstBody },
        secondBody: { fa: faSecondBody, ar: arSecondBody, en: enSecondBody },
        keywords: { fa: faKeywords, en: enKeywords, ar: arKeywords },
        status,
        images: imagesNames,
        videos: videosNames,
        writer: user,
        date: new Date(`${date.year}-${date.month}-${date.day}`),
      };

      await News.findByIdAndUpdate(_id, {
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

      revalidateTag("newsChange");

      if (news.title.en !== enTitle && imagesChanged) {
        await rm(`./public/panotech/news/${news.slug.en.substring(0, 50)}`, {
          recursive: true,
          force: true,
        });
      }

      return NextResponse.json(returnObject, { status: 200 });
    } catch (err) {
      logger.error("api news id put error, status:500");

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error("api news id put error, status:403");

    return NextResponse.json("access denied", { status: 403 });
  }
};

//*-----------------------------delete news
export const DELETE = async (request, { params }) => {
  const headerList = headers();
  const session = await getServerSession(authOptions);

  const API_KEY = headerList.get("API_KEY");
  if (
    API_KEY === process.env.NEXT_PUBLIC_API_KEY &&
    (session?.user.role === "admin" || session?.user.role === "operator")
  ) {
    try {
      const _id = await params.id;

      await panotechDBConnect();
      const news = await News.findById(_id);

      if (!news) {
        return NextResponse.json(
          { message: "خبری با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      await News.findByIdAndDelete(_id);
      await rm(`./public/panotech/news/${news.slug.en.substring(0, 50)}`, {
        recursive: true,
        force: true,
      });

      revalidateTag("newsChange");
      return NextResponse.json(_id, { status: 200 });
    } catch (err) {
      logger.error(`api news id delete error, status:500/ ${err}`);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error("api news id delete error, status:403");

    return NextResponse.json("access denied", { status: 403 });
  }
};
