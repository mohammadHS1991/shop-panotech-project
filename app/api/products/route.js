import { NextResponse } from "next/server";
import { rm } from "node:fs/promises";
import { headers } from "next/headers";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { Product, User } from "@/app/[lang]/models";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { logger } from "@/app/[lang]/utils/logger";

//*-----------------------------get all products
export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status") || "null";
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      let products = [];
      await panotechDBConnect();
      if (status !== "null") {
        products = await Product.find({ status })
          .sort({ createdAt: -1 })
          .populate({
            path: "writer",
            model: "User",
            select: "firstName lastName _id",
          })
          .populate({
            path: "comments.author",
            model: "User",
            select: "_id firstName lastName email",
          });
      }
      if (status === "null") {
        products = await Product.find()
          .sort({ createdAt: -1 })
          .populate({
            path: "writer",
            model: "User",
            select: "firstName lastName _id",
          })
          .populate({
            path: "comments.author",
            model: "User",
            select: "_id firstName lastName email",
          });
      }
      return Response.json(products, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api products get error, status:500/ ${err} `);

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error(`api products get error, status:403`);

    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------create a new product
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
      guideImagesNames,
      guideVideosNames,
      filesNames,
      faKeywords,
      enKeywords,
      arKeywords,
      userId,
    } = await request.json();

    const {
      faName,
      arName,
      enName,
      faSlug,
      arSlug,
      enSlug,
      faFullDescription,
      arFullDescription,
      enFullDescription,
      faUseCases,
      arUseCases,
      enUseCases,
      faPrice,
      enPrice,
      faDiscount,
      enDiscount,
      qty,
      status,
      special,
    } = values;

    filesFolder = `./public/panotech/products/${enSlug.substring(0, 50)}`;

    try {
      await panotechDBConnect();
      const existFaProduct = await Product.findOne({
        "name.fa": faName,
      });
      const existEnProduct = await Product.findOne({
        "name.en": enName,
      });
      const existArProduct = await Product.findOne({
        "name.ar": arName,
      });

      if (existFaProduct || existEnProduct || existArProduct) {
        return NextResponse.json(
          { message: "این محصول قبلاً ثبت شده است" },
          { status: 409 }
        );
      }

      //? validate values with registerSchema
      try {
        const validatedProduct = await Product.productValidation({
          faName,
          arName,
          enName,
          faSlug,
          arSlug,
          enSlug,
          faFullDescription,
          arFullDescription,
          enFullDescription,
          faUseCases,
          arUseCases,
          enUseCases,
          faPrice,
          enPrice,
          faDiscount,
          enDiscount,
          qty,
          images: imagesNames,
          guideImages: guideImagesNames,
          guideVideos: guideVideosNames,
          files: filesNames,
          status,
          special,
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

      const newProduct = new Product({
        name: { fa: faName, ar: arName, en: enName },

        slug: { fa: faSlug, ar: arSlug, en: enSlug },

        fullDescription: {
          fa: faFullDescription,
          ar: arFullDescription,
          en: enFullDescription,
        },

        useCases: {
          fa: faUseCases,
          ar: arUseCases,
          en: enUseCases,
        },
        keywords: { fa: faKeywords, en: enKeywords, ar: arKeywords },

        price: {
          fa: { amount: faPrice, unit: "ریال", discount: faDiscount },
          ar: { amount: enPrice, unit: "$", discount: enDiscount },
          en: { amount: enPrice, unit: "$", discount: enDiscount },
        },

        qty,
        images: imagesNames,
        guideImages: guideImagesNames,
        guideVideos: guideVideosNames,
        files: filesNames,
        status,
        special,
        writer: userId,
      });

      await newProduct.save();

      const user = await User.findById(userId, {
        _id: 1,
        firstName: 1,
        lastName: 1,
      });

      const returnedProduct = {
        _id: newProduct._id,
        name: { fa: faName, ar: arName, en: enName },
        slug: { fa: faSlug, ar: arSlug, en: enSlug },
        fullDescription: {
          fa: faFullDescription,
          ar: arFullDescription,
          en: enFullDescription,
        },
        useCases: {
          fa: faUseCases,
          ar: arUseCases,
          en: enUseCases,
        },
        keywords: { fa: faKeywords, en: enKeywords, ar: arKeywords },

        price: {
          fa: { amount: faPrice, unit: "ریال", discount: faDiscount },
          en: { amount: enPrice, unit: "$", discount: enDiscount },
          ar: { amount: enPrice, unit: "$", discount: enDiscount },
        },
        qty,
        images: imagesNames,
        guideImages: guideImagesNames,
        guideVideos: guideVideosNames,
        files: filesNames,
        status,
        special,
        writer: user,
      };
      revalidateTag("productsChange");
      return NextResponse.json(returnedProduct, { status: 201 });
    } catch (err) {
      await rm(filesFolder, {
        recursive: true,
        force: true,
      });
      logger.error(`api products post error, status:500/ ${err} `);

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
    logger.error(`api products post error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
