import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { mongo } from "mongoose";

import { authOptions } from "../../../auth/[...nextauth]/authOptions";
import { Product } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { logger } from "@/app/[lang]/utils/logger";

//*-----------------------------------add new comment
export const PUT = async (request) => {
  const headerList = headers();
  const session = await getServerSession(authOptions);

  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY && session !== null) {
    try {
      const { comment, author, productId } = await request.json();
      const newComment = {
        _id: new mongo.ObjectId().valueOf(),
        comment,
        author,
        status: 0,
        date: new Date(),
      };

      try {
        const validatedComment = await Product.addProductCommentValidation({
          comment,
        });
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          { message: "موارد وارد شده صحیح نمی‌باشد" },
          { status: 422 }
        );
      }

      await panotechDBConnect();
      const product = await Product.findById(productId);

      if (!product) {
        return NextResponse.json(
          { message: "محصولی با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      await Product.findByIdAndUpdate(productId, {
        comments: [...product.comments, newComment],
      });

      const newProduct = await Product.findById(productId).populate({
        path: "comments.author",
        model: "User",
        select: "_id firstName lastName email",
      });
      const newComments = await newProduct.comments;
      revalidateTag("productsChange");

      return NextResponse.json(
        { _id: productId, comments: newComments },
        { status: 200 }
      );
    } catch (err) {
      logger.error(`api products comments add put error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api products comments add put error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
