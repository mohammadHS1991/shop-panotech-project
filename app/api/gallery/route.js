import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";

import { Gallery, User } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { revalidateTag } from "next/cache";
import { logger } from "@/app/[lang]/utils/logger";

//*-----------------------------get all galleries
export const GET = async () => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      await panotechDBConnect();
      const galleries = await Gallery.find().sort({ createdAt: -1 }).populate({
        path: "writer",
        model: "User",
        select: "firstName lastName _id",
      });
      return Response.json(galleries, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api gallery get error, status:500/ ${err} `);

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error(`api gallery get error, status:403`);

    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------create a new gallery
export const POST = async (request) => {
  const headerList = headers();
  const session = await getServerSession(authOptions);
  let filesFolder = "";
  const API_KEY = headerList.get("API_KEY");
  if (
    API_KEY === process.env.NEXT_PUBLIC_API_KEY &&
    (session?.user.role === "admin" || session?.user.role === "operator")
  ) {
    const { values, imagesNames, videosNames, userId } = await request.json();

    const { faTitle, arTitle, enTitle, faSlug, arSlug, enSlug, status } =
      values;

    filesFolder = `./public/panotech/galleries/${enSlug.substring(0, 50)}`;

    try {
      await panotechDBConnect();
      const existFaGallery = await Gallery.findOne({
        "title.fa": faTitle,
      });
      const existEnGallery = await Gallery.findOne({
        "title.en": enTitle,
      });
      const existArGallery = await Gallery.findOne({
        "title.ar": arTitle,
      });

      if (existFaGallery || existEnGallery || existArGallery) {
        return NextResponse.json(
          { message: "این گالری قبلاً ثبت شده است" },
          { status: 409 }
        );
      }

      //? validate values with createGallerySchema
      try {
        const validatedGallery = await Gallery.galleryValidation({
          faTitle,
          arTitle,
          enTitle,
          faSlug,
          arSlug,
          enSlug,
          status,
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

      const newGallery = new Gallery({
        title: { fa: faTitle, ar: arTitle, en: enTitle },
        slug: { fa: faSlug, ar: arSlug, en: enSlug },
        status,
        images: imagesNames,
        videos: videosNames,
        writer: userId,
      });
      await newGallery.save();

      const user = await User.findById(userId, {
        _id: 1,
        firstName: 1,
        lastName: 1,
      });

      const returnObject = {
        _id: newGallery._id,
        title: { fa: faTitle, ar: arTitle, en: enTitle },
        slug: { fa: faSlug, ar: arSlug, en: enSlug },
        status,
        images: imagesNames,
        videos: videosNames,
        writer: user,
      };
      revalidateTag("galleriesChange");

      return NextResponse.json(returnObject, { status: 201 });
    } catch (err) {
      await rm(filesFolder, {
        recursive: true,
        force: true,
      });

      logger.error(`api gallery post error, status:500/ ${err} `);

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

    logger.error(`api gallery post error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
