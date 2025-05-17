import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { logger } from "@/app/[lang]/utils/logger";
import { Product } from "@/app/[lang]/models";

//*-----------------------------------edit comment status
export const PUT = async (request) => {
  const headerList = headers();
  const session = await getServerSession(authOptions);

  const API_KEY = headerList.get("API_KEY");
  if (
    API_KEY === process.env.NEXT_PUBLIC_API_KEY &&
    (session?.user.role === "admin" || session?.user.role === "operator")
  ) {
    try {
      const { productId, commentId, status } = await request.json();
      try {
        const validatedComment = await Product.editProductCommentValidation({
          status,
        });
      } catch (err) {
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
      const comments = product.comments;
      const commentIndex = comments.findIndex(
        (comment) => comment._id == commentId
      );

      if (commentIndex === -1) {
        return NextResponse.json(
          { message: "نظری با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      comments[commentIndex].status = status;

      await Product.findByIdAndUpdate(productId, { comments });

      revalidateTag("productsChange");

      const newProduct = await Product.findById(productId).populate({
        path: "comments.author",
        model: "User",
        select: "_id firstName lastName email",
      });
      const populatedComments = await newProduct.comments;
      return NextResponse.json(
        { _id: productId, comments: populatedComments },
        { status: 200 }
      );
    } catch (err) {
      logger.error(`api products comments edit put error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api products comments edit put error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
