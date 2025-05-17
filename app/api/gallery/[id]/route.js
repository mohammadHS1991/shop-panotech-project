import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";

import { Gallery, User } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { logger } from "@/app/[lang]/utils/logger";

//*-----------------------------edit news
export const PUT = async (request, { params }) => {
  const headerList = headers();
  const session = await getServerSession(authOptions);

  const API_KEY = headerList.get("API_KEY");
  if (
    API_KEY === process.env.NEXT_PUBLIC_API_KEY &&
    (session?.user.role === "admin" || session?.user.role === "operator")
  ) {
    const { values, imagesNames, videosNames, imagesChanged, userId } =
      await request.json();
    const _id = params.id;
    const { faTitle, arTitle, enTitle, faSlug, arSlug, enSlug, status } =
      values;

    try {
      await panotechDBConnect();

      const gallery = await Gallery.findById(_id);

      if (!gallery) {
        return NextResponse.json(
          { message: "گالری با این مشخصات یافت نشد" },
          { status: 404 }
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
        status,
        images: imagesNames,
        videos: videosNames,
        writer: user,
      };

      await Gallery.findByIdAndUpdate(_id, {
        title: { fa: faTitle, ar: arTitle, en: enTitle },
        slug: { fa: faSlug, ar: arSlug, en: enSlug },
        status,
        images: imagesNames,
        videos: videosNames,
        writer: userId,
      });

      revalidateTag("galleriesChange");

      if (gallery.title.en !== enTitle && imagesChanged) {
        await rm(
          `./public/panotech/galleries/${gallery.slug.en.substring(0, 50)}`,
          {
            recursive: true,
            force: true,
          }
        );
      }

      return NextResponse.json(returnObject, { status: 200 });
    } catch (err) {
      logger.error(`api gallery id put error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api gallery id put error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};

//*-----------------------------delete product
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
      const gallery = await Gallery.findById(_id);

      if (!gallery) {
        return NextResponse.json(
          { message: "گالری با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      await Gallery.findByIdAndDelete(_id);
      await rm(
        `./public/panotech/galleries/${gallery.slug.en.substring(0, 50)}`,
        {
          recursive: true,
          force: true,
        }
      );
      revalidateTag("galleriesChange");

      return NextResponse.json(_id, { status: 200 });
    } catch (err) {
      logger.error(`api gallery id delete error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api gallery id delete error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
