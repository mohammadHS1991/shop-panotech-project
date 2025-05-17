import { headers } from "next/headers";

import { Product } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { logger } from "@/app/[lang]/utils/logger";

//*-----------------------------get single product by slug
export const GET = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    const { lang, slug } = params;
    try {
      let product = {};
      await panotechDBConnect();
      if (lang === "fa") {
        product = await Product.findOne({
          "slug.fa": slug,
          status: "1",
        })
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

      if (lang === "en") {
        product = await Product.findOne({
          "slug.en": slug,
          status: "1",
        })
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
      if (lang === "ar") {
        product = await Product.findOne({
          "slug.ar": slug,
          status: "1",
        })
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
      logger.error(`api products slug get error, status:500/ ${err} `);

      return Response.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api products slug get error, status:403`);

    return Response.json({ message: "access denied" }, { status: 403 });
  }
};
