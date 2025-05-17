import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { Product, User } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const PUT = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  const session = await getServerSession(authOptions);

  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY && session !== null) {
    const userId = params.id;
    try {
      const { productId, qty } = await request.json();
      await panotechDBConnect();
      const product = await Product.findById(productId);
      const user = await User.findById(userId);
      if (!product || !user) {
        return NextResponse.json(
          { message: "محصول یا کاربری با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      let openCart = user.openCart;
      const productIndex = openCart.findIndex(
        (cartItem) => cartItem.product._id == productId
      );

      if (productIndex !== -1) {
        if (
          (+qty === 1 || +qty === 10) &&
          openCart[productIndex].qty + +qty <= 30 &&
          openCart[productIndex].qty + +qty <= product.qty
        ) {
          openCart[productIndex].qty += +qty;
        }

        if (+qty === -1) {
          if (openCart[productIndex].qty === 1) {
            openCart = openCart.filter(
              (cartItem) => cartItem.product._id != productId
            );
          } else if (openCart[productIndex].qty > 1) {
            openCart[productIndex].qty += +qty;
          }
        }

        if (+qty === -10) {
          if (openCart[productIndex].qty > 10) {
            openCart[productIndex].qty += +qty;
          } else if (openCart[productIndex].qty === 10) {
            openCart = openCart.filter(
              (cartItem) => cartItem.product._id != productId
            );
          }
        }
      }

      if (productIndex === -1 && +qty > 0) {
        openCart.push({ product: productId, qty: +qty });
      }

      await User.findByIdAndUpdate(userId, { openCart });
      const newOpenCart = (
        await User.findById(userId).populate({
          path: "openCart.product",
          model: "Product",
        })
      ).openCart;

      return NextResponse.json(
        { _id: userId, openCart: newOpenCart },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json("access denied", { status: 403 });
  }
};
