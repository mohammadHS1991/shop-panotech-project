import { NextResponse } from "next/server";
import { headers } from "next/headers";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { SelectedGallery, User } from "@/app/[lang]/models";
import { revalidateTag } from "next/cache";
import { logger } from "@/app/[lang]/utils/logger";

//*-----------------------------get all selected galleries
export const GET = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      const _id = params.id;
      await panotechDBConnect();
      const selectedGallery = await SelectedGallery.findById(_id).populate(
        "writer"
      );
      return Response.json(selectedGallery, {
        status: 200,
      });
    } catch (err) {
      logger.error(
        `api gallery selected-gallery get error, status:500/ ${err} `
      );

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error(`api gallery selected-gallery get error, status:403 `);

    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------edit selected gallery
export const PUT = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY) {
    const { imagesNames, userId } = await request.json();
    const _id = params.id;

    try {
      await panotechDBConnect();

      const user = await User.findById(userId, {
        _id: 1,
        firstName: 1,
        lastName: 1,
      });

      if (!(await SelectedGallery.findById(_id))) {
        return NextResponse.json(
          { message: "گالری با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      //? validate values with createGallerySchema
      try {
        const validatedGallery =
          await SelectedGallery.selectedGalleryValidation({
            images: imagesNames,
          });
      } catch (err) {
        //   await rm(filesFolder, {
        //     recursive: true,
        //     force: true,
        //   });
        return NextResponse.json(
          { message: "موارد وارد شده صحیح نمی‌باشد" },
          { status: 422 }
        );
      }
      const returnObject = {
        _id,
        images: imagesNames,
        writer: user,
      };

      await SelectedGallery.findByIdAndUpdate(_id, {
        images: imagesNames,
        writer: userId,
      });
      revalidateTag("selectedGalleryChange");
      return NextResponse.json(returnObject, { status: 200 });
    } catch (err) {
      logger.error(
        `api gallery selected-gallery put error, status:500/ ${err} `
      );
      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api gallery selected-gallery put error, status:403`);
    return NextResponse.json("access denied", { status: 403 });
  }
};
