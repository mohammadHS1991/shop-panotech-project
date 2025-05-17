import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { Order, Product, User } from "@/app/[lang]/models";
import mailer from "@/app/[lang]/utils/mailer";
import { orderTexts } from "@/public/data/data";
import { logger } from "@/app/[lang]/utils/logger";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import filterOpenCart from "@/app/[lang]/utils/filterOpenCart";
import EmailBodyTemplate from "@/app/[lang]/components/EmailBodyTemplate";
import { revalidateTag } from "next/cache";

export const PUT = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  const session = await getServerSession(authOptions);

  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY && session !== null) {
    try {
      const userId = params.id;
      const { totalCartPrice, shippingPrice, totalDiscount, lang } =
        await request.json();
      await panotechDBConnect();
      const user = await User.findById(userId).populate({
        path: "openCart.product",
        model: "Product",
        select: "name price images slug _id",
      });

      if (!user) {
        return NextResponse.json(
          { message: "کاربری با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      const openCart = user.openCart;
      let product = {};
      openCart.forEach(async (cartItem) => {
        product = await Product.findById(cartItem.product._id);
        const qty = +product.qty - +cartItem.qty;
        const soldQty = +product.soldQty + +cartItem.qty;
        await Product.findByIdAndUpdate(cartItem.product._id, {
          qty,
          soldQty,
        });
        if (qty === 0) {
          const result = await filterOpenCart(cartItem.product._id);
        }

        if (qty > 0) {
          const result = await User.updateMany(
            {
              "openCart.product": cartItem.product._id,
              "openCart.qty": { $gt: qty },
            },
            { $pull: { openCart: { product: cartItem.product._id } } }
          );
        }
      });

      const orderCode = `rp-${Math.ceil(Math.random() * 10000 + 10000)}`;
      const finishedCarts = user.finishedCarts;
      const newOrder = new Order({
        user: userId,
        cart: openCart,
        totalCartPrice,
        shippingPrice,
        totalDiscount,
        currency: lang === "fa" ? "ریال" : "$",
        lang,
        orderCode,
      });

      finishedCarts.push({
        _id: newOrder._id,
        cart: openCart,
        totalCartPrice,
        shippingPrice,
        totalDiscount,
        currency: lang === "fa" ? "ریال" : "$",
        orderCode,
      });

      await newOrder.save();
      await User.findByIdAndUpdate(userId, { finishedCarts, openCart: [] });

      const newUser = await User.findById(userId).populate({
        path: "finishedCarts.cart.product", // Specify the path to populate
        model: "Product", // The model to populate from
        select: "name slug price images _id",
      });
      const populatedFinishedCarts = await newUser.finishedCarts;
      //?------------------------------------------------------------ sendEmail
      const userSubject = orderTexts[lang].orderApi.submitSubject;
      const userMailBody = EmailBodyTemplate(
        lang,
        userSubject,
        `${lang === "en" ? orderTexts[lang].orderApi.dearUser : ""}${
          user.firstName
        } ${user.lastName} ${
          lang !== "en" ? orderTexts[lang].orderApi.dearUser : ""
        }`,
        orderTexts[lang].orderApi.hello,
        orderTexts[lang].orderApi.submitText,
        orderTexts[lang].orderApi.thanks,
        "",
        `${orderTexts[lang].orderApi.orderCode}: ${orderCode}`
      );

      const userMail = await mailer(user.email, userSubject, userMailBody);

      const populatedOrder = await Order.findById(newOrder._id)
        .populate("user")
        .populate({
          path: "cart.product",
          model: "Product",
          select: "name _id",
        });

      revalidateTag("ordersChange");
      revalidateTag("productsChange");
      return NextResponse.json(
        {
          user: {
            _id: userId,
            openCart: [],
            finishedCarts: populatedFinishedCarts,
          },
          order: populatedOrder,
        },
        { status: 200 }
      );
    } catch (err) {
      logger.error(
        `api users id finish-open-cart put error, status:500/ ${err} `
      );
      const mailToAdmin = await mailer(
        process.env.ADMIN_EMAIL,
        "panotech | users",
        `<h1>api users id finish-open-cart put error, status:500</h1>
        <h2>${err}</h2>`
      );
      return NextResponse.json("db error", { status: 500 });
    }
  } else {
    logger.error(`api users id finish-open-cart put error, status:403`);

    const mailToAdmin = await mailer(
      process.env.ADMIN_EMAIL,
      "panotech | users",
      `<h1>api users id finish-open-cart put error, status:403</h1>`
    );

    return NextResponse.json("access denied", { status: 403 });
  }
};
