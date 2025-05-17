import { headers } from "next/headers";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { News } from "@/app/[lang]/models";
import { logger } from "@/app/[lang]/utils/logger";

export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category") || "null";
  const keyword = searchParams.get("keyword") || "null";
  const lang = searchParams.get("lang") || "fa";
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      await panotechDBConnect();
      let newsCount;
      if (category === "null") {
        if (keyword === "null") {
          newsCount = await News.find({
            status: "enable",
          }).countDocuments();
        }
        if (keyword !== "null") {
          if (lang === "fa") {
            newsCount = await News.find({
              "keywords.fa": keyword,
              status: "enable",
            }).countDocuments();
          }
          if (lang === "en") {
            newsCount = await News.find({
              "keywords.en": keyword,
              status: "enable",
            }).countDocuments();
          }
          if (lang === "ar") {
            newsCount = await News.find({
              "keywords.ar": keyword,
              status: "enable",
            }).countDocuments();
          }
        }
      }
      if (category !== "null") {
        if (keyword === "null") {
          newsCount = await News.find({
            category,
            status: "enable",
          }).countDocuments();
        }
        if (keyword !== "null") {
          if (lang === "fa") {
            newsCount = await News.find({
              "keywords.fa": keyword,
              category,
              status: "enable",
            }).countDocuments();
          }
          if (lang === "en") {
            newsCount = await News.find({
              "keywords.en": keyword,
              category,
              status: "enable",
            }).countDocuments();
          }
          if (lang === "ar") {
            newsCount = await News.find({
              "keywords.ar": keyword,
              category,
              status: "enable",
            }).countDocuments();
          }
        }
      }
      return Response.json(newsCount, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api news count get error, status:500/ ${err}`);

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error("api news count get error, status:403");

    return Response.json("access denied", { status: 403 });
  }
};
