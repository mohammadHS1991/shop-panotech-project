import { NextResponse } from "next/server";
import { headers } from "next/headers";

import User from "../../[lang]/models/User";
import { logger } from "@/app/[lang]/utils/logger";
import mailer from "@/app/[lang]/utils/mailer";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";

//*-----------------------------get all users
export const GET = async () => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      await panotechDBConnect();
      const users = await User.find({}, {})
        .populate("customProducts")
        .populate({
          path: "customProducts.product",
          model: "Product",
          select: "_id name images price",
        })
        .populate({
          path: "openCart.product",
          model: "Product",
          select: "name slug price images _id qty",
        })
        .populate({
          path: "finishedCarts.cart.product", // Specify the path to populate
          model: "Product", // The model to populate from
          select: "name slug price images _id",
        });
      // .exec((err) => {
      //   console.log(err);
      // });
      return NextResponse.json(users, { status: 200 });
    } catch (err) {
      logger.error(`api users get error, status:500/ ${err}`);

      return NextResponse.json("db error", { status: 500 });
    }
  } else {
    logger.error(`api users get error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};

//*-----------------------------add localCart to user
export const PUT = async (request) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY) {
    try {
      const { email, localCart } = await request.json();
      await panotechDBConnect();
      const user = await User.findOne({ email });
      const openCart = user.openCart;
      let cartItemIndex;
      localCart.forEach((localItem) => {
        cartItemIndex = openCart.findIndex(
          (cartItem) => cartItem.product == localItem.product
        );
        if (cartItemIndex === -1) {
          openCart.push({ product: localItem.product, qty: +localItem.qty });
        } else if (cartItemIndex > 0) {
          if (+openCart[cartItemIndex].qty + +localItem.qty <= 30) {
            openCart[cartItemIndex].qty =
              +openCart[cartItemIndex].qty + +localItem.qty;
          } else if (+openCart[cartItemIndex].qty + +localItem.qty > 30) {
            openCart[cartItemIndex].qty = 30;
          }
        }
      });
      await User.findByIdAndUpdate(user._id, { openCart });

      const newOpenCart = (
        await User.findById(user._id).populate({
          path: "openCart.product",
          model: "Product",
          select: "name price images slug _id qty",
        })
      ).openCart;

      return NextResponse.json(
        { _id: user._id, openCart: newOpenCart },
        { status: 200 }
      );
    } catch (err) {
      const mailToAdmin = await mailer(
        process.env.ADMIN_EMAIL,
        "panotech | users",
        `<h1>api users put error, status:500</h1>
        <h2>${err}</h2>`
      );
      logger.error(`api users put error, status:500/ ${err}`);

      return NextResponse.json("db error", { status: 500 });
    }
  } else {
    const mailToAdmin = await mailer(
      process.env.ADMIN_EMAIL,
      "panotech | users",
      `<h1>api users put error, status:403</h1>`
    );
    logger.error(`api users put error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
