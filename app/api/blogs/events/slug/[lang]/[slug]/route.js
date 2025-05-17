import { NextResponse } from "next/server";
import { headers } from "next/headers";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { Event } from "@/app/[lang]/models";
import { logger } from "@/app/[lang]/utils/logger";

//*-----------------------------get single product by enSlug
export const GET = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    const { lang, slug } = params;
    try {
      let event = {};
      await panotechDBConnect();
      if (lang === "fa") {
        event = await Event.findOne({
          "slug.fa": slug,
          status: "enable",
        }).populate({
          path: "writer",
          model: "User",
          select: "firstName lastName _id",
        });
      }

      if (lang === "en") {
        event = await Event.findOne({
          "slug.en": slug,
          status: "enable",
        }).populate({
          path: "writer",
          model: "User",
          select: "firstName lastName _id",
        });
      }

      if (lang === "ar") {
        event = await Event.findOne({
          "slug.ar": slug,
          status: "enable",
        }).populate({
          path: "writer",
          model: "User",
          select: "firstName lastName _id",
        });
      }

      if (!event) {
        return NextResponse.json(
          { message: "رویدادی با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      return NextResponse.json(event, { status: 200 });
    } catch (err) {
      logger.error(`api events slug get error, status:500/ ${err}`);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error("api events slug get error, status:403");

    return NextResponse.json({ message: "access denied" }, { status: 403 });
  }
};
