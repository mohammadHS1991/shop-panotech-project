"use server";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";

import { Product, User } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { logger } from "@/app/[lang]/utils/logger";
import filterOpenCart from "@/app/[lang]/utils/filterOpenCart";

//*-----------------------------get single product by id
export const GET = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    const productId = params.id;
    try {
      await panotechDBConnect();
      const product = await Product.findById(productId)
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

      if (!product) {
        return Response.json(
          { message: "محصولی با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      return Response.json(product, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api products id get error, status:500/ ${err} `);

      return Response.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api products id get error, status:403`);

    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------edit product
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
      guideImagesNames,
      guideVideosNames,
      filesNames,
      faKeywords,
      enKeywords,
      arKeywords,
      filesChanged,
      userId,
    } = await request.json();
    const _id = params.id;
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

    try {
      await panotechDBConnect();
      const product = await Product.findById(_id);

      const user = await User.findById(userId);

      if (!product) {
        return NextResponse.json(
          { message: "محصولی با این مشخصات یافت نشد" },
          { status: 404 }
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
        return NextResponse.json(
          { message: "موارد وارد شده صحیح نمی‌باشد" },
          { status: 422 }
        );
      }
      const returnObject = {
        _id,
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
        writer: user,
      };

      await Product.findByIdAndUpdate(_id, {
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

      revalidateTag("productsChange");
      if (product.name.en !== enName && filesChanged) {
        const filesFolder = `./public/panotech/products/${product.slug.en.substring(
          0,
          50
        )}`;
        await rm(filesFolder, {
          recursive: true,
          force: true,
        });
      }

      //* --------------------------------------remove product from users cart
      let users = [];
      if (status === "disable" || +qty === 0) {
        const result = await filterOpenCart(_id);
        if (result.modifiedCount > 0) {
          users = await User.find({}, { password: 0 });
        }
      }
      //* --------------------------------------/remove product from users cart

      //* --------------------------------------remove product from users cart if cartQty is lt product qty
      if (qty > 0) {
        const result = await User.updateMany(
          {
            "openCart.product": _id,
            "openCart.qty": { $gt: qty },
          },
          { $pull: { openCart: { product: _id } } }
        );
      }
      //* --------------------------------------/remove product from users cart if cartQty is lt product qty

      return NextResponse.json({ returnObject, users }, { status: 200 });
    } catch (err) {
      logger.error(`api products id put error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api products id put error, status:403`);

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
      const product = await Product.findById(_id);

      if (!product) {
        return NextResponse.json(
          { message: "محصولی با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      await Product.findByIdAndDelete(_id);
      await rm(
        `./public/panotech/products/${product.slug.en.substring(0, 50)}`,
        {
          recursive: true,
          force: true,
        }
      );
      revalidateTag("productsChange");

      //* --------------------------------------remove product from users cart
      let users = [];
      const result = await filterOpenCart(_id);
      if (result.modifiedCount > 0) {
        users = await User.find({}, { password: 0 });
      }
      //* --------------------------------------/remove product from users cart

      return NextResponse.json({ _id, users }, { status: 200 });
    } catch (err) {
      logger.error(`api products id delete error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api products id delete error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
