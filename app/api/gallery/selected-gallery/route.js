import { NextResponse } from "next/server";
import { rm } from "node:fs/promises";
import { headers } from "next/headers";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { User, SelectedGallery } from "@/app/[lang]/models";

//*-----------------------------get all galleries
export const GET = async () => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      await panotechDBConnect();
      const selectedGallery = await SelectedGallery.find().populate("writer");
      return Response.json(selectedGallery, {
        status: 200,
      });
    } catch (err) {
      return Response.json("db error", { status: 500 });
    }
  } else {
    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------create a new gallery
export const POST = async (request) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY) {
    const { imagesNames, userId } = await request.json();

    const filesFolder = `./public/${imagesNames[0].name
      .split("/")
      .slice(0, 3)
      .join("/")}`;

    try {
      await panotechDBConnect();

      //? validate values with createGallerySchema
      try {
        const validatedGallery =
          await SelectedGallery.selectedGalleryValidation({
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

      const newSelectedGallery = new SelectedGallery({
        images: imagesNames,
        writer: userId,
      });
      await newSelectedGallery.save();

      const user = await User.findById(userId, {
        _id: 1,
        firstName: 1,
        lastName: 1,
      });

      const returnObject = {
        _id: newGallery._id,
        images: imagesNames,
        writer: user,
      };

      return NextResponse.json(returnObject, { status: 201 });
    } catch (err) {
      await rm(filesFolder, {
        recursive: true,
        force: true,
      });
      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json("access denied", { status: 403 });
  }
};
