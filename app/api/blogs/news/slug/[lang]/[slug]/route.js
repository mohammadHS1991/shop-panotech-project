import { headers } from "next/headers";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { News } from "@/app/[lang]/models";
import { logger } from "@/app/[lang]/utils/logger";

//*-----------------------------get single product by enSlug
export const GET = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    const { lang, slug } = params;
    try {
      let news = {};
      await panotechDBConnect();
      if (lang === "fa") {
        news = await News.findOne({
          "slug.fa": slug,
          status: "enable",
        }).populate({
          path: "writer",
          model: "User",
          select: "firstName lastName _id",
        });
      }

      if (lang === "en") {
        news = await News.findOne({
          "slug.en": slug,
          status: "enable",
        }).populate({
          path: "writer",
          model: "User",
          select: "firstName lastName _id",
        });
      }

      if (lang === "ar") {
        news = await News.findOne({
          "slug.ar": slug,
          status: "enable",
        }).populate({
          path: "writer",
          model: "User",
          select: "firstName lastName _id",
        });
      }

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
      logger.error(`api news slug get error, status:500/ ${err}`);

      return Response.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error("api news slug get error, status:403");

    return Response.json({ message: "access denied" }, { status: 403 });
  }
};
