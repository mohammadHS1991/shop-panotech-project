import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";

import { Event, User } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { logger } from "@/app/[lang]/utils/logger";

//*-----------------------------get all events
export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status") || "null";
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      let events = [];
      await panotechDBConnect();
      if (status !== "null") {
        events = await Event.find({ status }).sort({ date: -1 }).populate({
          path: "writer",
          model: "User",
          select: "firstName lastName _id",
        });
      }
      if (status === "null") {
        events = await Event.find().sort({ date: -1 }).populate({
          path: "writer",
          model: "User",
          select: "firstName lastName _id",
        });
      }

      return Response.json(events, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api events get error, status:500/ ${err}`);

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error("api events get error, status:403");

    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------create a new event
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
    } = values;

    filesFolder = `./public/panotech/events/${enSlug.substring(0, 50)}`;

    try {
      await panotechDBConnect();
      const existFaEvent = await Event.findOne({
        "title.fa": faTitle,
      });

      const existEnEvent = await Event.findOne({
        "title.en": enTitle,
      });

      const existArEvent = await Event.findOne({
        "title.ar": arTitle,
      });

      if (existFaEvent || existEnEvent || existArEvent) {
        return NextResponse.json(
          { message: "این رویداد قبلاً ثبت شده است" },
          { status: 409 }
        );
      }

      //? validate values with createEventSchema
      try {
        const validatedEvent = await Event.eventValidation({
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
          images: imagesNames,
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

      const newEvent = await new Event({
        title: { fa: faTitle, ar: arTitle, en: enTitle },
        slug: { fa: faSlug, ar: arSlug, en: enSlug },
        firstBody: { fa: faFirstBody, ar: arFirstBody, en: enFirstBody },
        secondBody: { fa: faSecondBody, ar: arSecondBody, en: enSecondBody },
        keywords: { fa: faKeywords, en: enKeywords, ar: arKeywords },
        status,
        images: imagesNames,
        writer: userId,
        date: new Date(`${date.year}-${date.month}-${date.day}`),
      });
      await newEvent.save();

      const user = await User.findById(userId, {
        _id: 1,
        firstName: 1,
        lastName: 1,
      });

      const returnObject = {
        _id: newEvent._id,
        title: { fa: faTitle, ar: arTitle, en: enTitle },
        slug: { fa: faSlug, ar: arSlug, en: enSlug },
        firstBody: { fa: faFirstBody, ar: arFirstBody, en: enFirstBody },
        secondBody: { fa: faSecondBody, ar: arSecondBody, en: enSecondBody },
        keywords: { fa: faKeywords, ar: arKeywords, en: enKeywords },
        status,
        images: imagesNames,
        writer: user,
        date: new Date(`${date.year}-${date.month}-${date.day}`),
      };

      revalidateTag("eventsChange");
      return NextResponse.json(returnObject, { status: 201 });
    } catch (err) {
      await rm(filesFolder, {
        recursive: true,
        force: true,
      });

      logger.error(`api events post error, status:500/ ${err}`);

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

    logger.error("api events post error, status:403");

    return NextResponse.json("access denied", { status: 403 });
  }
};
