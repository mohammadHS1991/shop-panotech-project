import { headers } from "next/headers";

import { Product } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { logger } from "@/app/[lang]/utils/logger";

export const GET = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const keyword = searchParams.get("keyword") || "null";
      const lang = searchParams.get("lang") || "fa";
      await panotechDBConnect();
      let productsCount;
      if (keyword === "null") {
        productsCount = await Product.find({
          status: "1",
        }).countDocuments();
      }
      if (keyword !== "null") {
        if (lang === "fa") {
          productsCount = await Product.find({
            "keywords.fa": keyword,
            status: "1",
          }).countDocuments();
        }
        if (lang === "en") {
          productsCount = await Product.find({
            "keywords.en": keyword,
            status: "1",
          }).countDocuments();
        }
        if (lang === "ar") {
          productsCount = await Product.find({
            "keywords.ar": keyword,
            status: "1",
          }).countDocuments();
        }
      }

      return Response.json(productsCount, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api products count get error, status:500/ ${err} `);

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error(`api products count get error, status:403`);

    return Response.json("access denied", { status: 403 });
  }
};
