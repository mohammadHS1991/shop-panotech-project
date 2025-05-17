import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";

import { Event, User } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { logger } from "@/app/[lang]/utils/logger";

//*-----------------------------get single event by id
export const GET = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    const eventId = params.id;
    try {
      await panotechDBConnect();
      const event = await Event.findById(eventId).populate({
        path: "writer",
        model: "User",
        select: "firstName lastName _id",
      });

      if (!event) {
        return Response.json(
          { message: "رویدادی با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      return Response.json(event, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api events id get error, status:500/ ${err}`);

      return Response.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error("api events id get error, status:403");

    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------edit event
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
    } = values;

    try {
      await panotechDBConnect();
      const event = await Event.findById(_id);
      if (!event) {
        return NextResponse.json(
          { message: "رویدادی با این مشخصات یافت نشد" },
          { status: 404 }
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
        writer: user,
        date: new Date(`${date.year}-${date.month}-${date.day}`),
      };

      await Event.findByIdAndUpdate(_id, {
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

      revalidateTag("eventsChange");

      if (event.title.en !== enTitle && imagesChanged) {
        await rm(`./public/panotech/events/${event.slug.en.substring(0, 50)}`, {
          recursive: true,
          force: true,
        });
      }

      return NextResponse.json(returnObject, { status: 200 });
    } catch (err) {
      logger.error(`api events id put error, status:500/ ${err}`);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error("api events id put error, status:403");

    return NextResponse.json("access denied", { status: 403 });
  }
};

//*-----------------------------delete event
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
      const event = await Event.findById(_id);

      if (!event) {
        return NextResponse.json(
          { message: "رویدادی با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      await Event.findByIdAndDelete(_id);
      await rm(`./public/panotech/events/${event.slug.en.substring(0, 50)}`, {
        recursive: true,
        force: true,
      });

      revalidateTag("eventsChange");
      return NextResponse.json(_id, { status: 200 });
    } catch (err) {
      logger.error(`api events id delete error, status:500/ ${err}`);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error("api events id delete error, status:403");

    return NextResponse.json("access denied", { status: 403 });
  }
};
