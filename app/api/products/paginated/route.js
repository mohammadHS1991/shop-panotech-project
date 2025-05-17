import { headers } from "next/headers";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { Product } from "@/app/[lang]/models";
import { logger } from "@/app/[lang]/utils/logger";

export const GET = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const page = searchParams.get("page") || 1;
      const keyword = searchParams.get("keyword") || "null";
      const lang = searchParams.get("lang") || "fa";
      const itemsPerPage = searchParams.get("itemsPerPage") || 25;
      const skip = (page - 1) * itemsPerPage;
      await panotechDBConnect();
      let productsCount = 0;
      if (keyword === "null") {
        productsCount = await Product.find({
          status: "1",
        }).countDocuments();
      }
      if (keyword !== "null") {
        if (lang === "fa") {
          productsCount = await Product.find({
            "keywords.fa": keyword,
            status: "1",
          }).countDocuments();
        }
        if (lang === "en") {
          productsCount = await Product.find({
            "keywords.en": keyword,
            status: "1",
          }).countDocuments();
        }
        if (lang === "ar") {
          productsCount = await Product.find({
            "keywords.ar": keyword,
            status: "1",
          }).countDocuments();
        }
      }

      const pages = Math.ceil(productsCount / itemsPerPage);

      if (page > pages) {
        return Response.json([], { status: 200 });
      } else if (page <= 0) {
        return Response.json("صفحه وارد شده صحیح نمی‌باشد", {
          status: 422,
        });
      } else {
        let products;
        if (keyword === "null") {
          products = await Product.find({ status: "1" })
            .sort({ createAt: -1 })
            .skip(skip)
            .limit(itemsPerPage)
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
        if (keyword !== "null") {
          if (lang === "fa") {
            products = await Product.find({
              "keywords.fa": keyword,
              status: "1",
            })
              .sort({ createAt: -1 })
              .skip(skip)
              .limit(itemsPerPage)
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
            products = await Product.find({
              "keywords.en": keyword,
              status: "1",
            })
              .sort({ createAt: -1 })
              .skip(skip)
              .limit(itemsPerPage)
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
            products = await Product.find({
              "keywords.ar": keyword,
              status: "1",
            })
              .sort({ createAt: -1 })
              .skip(skip)
              .limit(itemsPerPage)
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
        }

        return Response.json(products, {
          status: 200,
          headers: {
            "Cache-Control": "max-age=120, must-revalidate",
          },
        });
      }
    } catch (err) {
      logger.error(`api products paginated get error, status:500/ ${err} `);

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error(`api products paginated get error, status:403`);

    return Response.json("access denied", { status: 403 });
  }
};
