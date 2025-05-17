import { headers } from "next/headers";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { Event } from "@/app/[lang]/models";
import { logger } from "@/app/[lang]/utils/logger";

export const GET = async (request, { params }) => {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || "null";
  const lang = searchParams.get("lang") || "fa";
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      await panotechDBConnect();
      let eventsCount = 0;
      if (keyword === "null") {
        eventsCount = await Event.find({
          status: "enable",
        }).countDocuments();
      }

      if (keyword !== "null") {
        if (lang === "fa") {
          eventsCount = await Event.find({
            "keywords.fa": keyword,
            status: "enable",
          }).countDocuments();
        }
        if (lang === "en") {
          eventsCount = await Event.find({
            "keywords.en": keyword,
            status: "enable",
          }).countDocuments();
        }
        if (lang === "ar") {
          eventsCount = await Event.find({
            "keywords.ar": keyword,
            status: "enable",
          }).countDocuments();
        }
      }

      return Response.json(eventsCount, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api events count get error, status:500/ ${err}`);

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error("api events count get error, status:403");

    return Response.json("access denied", { status: 403 });
  }
};
