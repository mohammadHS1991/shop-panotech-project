import { headers } from "next/headers";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { News } from "@/app/[lang]/models";
import { logger } from "@/app/[lang]/utils/logger";

export const GET = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const page = searchParams.get("page") || 1;
      const category = searchParams.get("category") || "null";
      const keyword = searchParams.get("keyword") || "null";
      const lang = searchParams.get("lang") || "fa";
      const itemsPerPage = searchParams.get("itemsPerPage") || 6;
      const skip = (page - 1) * itemsPerPage;
      await panotechDBConnect();
      let newsCount = 0;
      if (category === "null") {
        if (keyword === "null") {
          newsCount = await News.find({
            status: "enable",
          }).countDocuments();
        }
        if (keyword !== "null") {
          if (lang === "fa") {
            newsCount = await News.find({
              "keywords.fa": keyword,
              status: "enable",
            }).countDocuments();
          }
          if (lang === "en") {
            newsCount = await News.find({
              "keywords.en": keyword,
              status: "enable",
            }).countDocuments();
          }
          if (lang === "ar") {
            newsCount = await News.find({
              "keywords.ar": keyword,
              status: "enable",
            }).countDocuments();
          }
        }
      }
      if (category !== "null") {
        if (keyword === "null") {
          newsCount = await News.find({
            category,
            status: "enable",
          }).countDocuments();
        }
        if (keyword !== "null") {
          if (lang === "fa") {
            newsCount = await News.find({
              category,
              "keywords.fa": keyword,
              status: "enable",
            }).countDocuments();
          }
          if (lang === "en") {
            newsCount = await News.find({
              category,
              "keywords.en": keyword,
              status: "enable",
            }).countDocuments();
          }
          if (lang === "ar") {
            newsCount = await News.find({
              category,
              "keywords.ar": keyword,
              status: "enable",
            }).countDocuments();
          }
        }
      }

      const pages = Math.ceil(newsCount / itemsPerPage);

      if (page > pages) {
        return Response.json([], { status: 200 });
      } else if (page <= 0) {
        return Response.json("صفحه وارد شده صحیح نمی‌باشد", {
          status: 422,
        });
      } else {
        let news;
        if (category === "null") {
          if (keyword === "null") {
            news = await News.find({ status: "enable" })
              .sort({ date: -1 })
              .skip(skip)
              .limit(itemsPerPage)
              .populate({
                path: "writer",
                model: "User",
                select: "firstName lastName _id",
              });
          }
          if (keyword !== "null") {
            if (lang === "fa") {
              news = await News.find({
                status: "enable",
                "keywords.fa": keyword,
              })
                .sort({ date: -1 })
                .skip(skip)
                .limit(itemsPerPage)
                .populate({
                  path: "writer",
                  model: "User",
                  select: "firstName lastName _id",
                });
            }
            if (lang === "en") {
              news = await News.find({
                status: "enable",
                "keywords.en": keyword,
              })
                .sort({ date: -1 })
                .skip(skip)
                .limit(itemsPerPage)
                .populate({
                  path: "writer",
                  model: "User",
                  select: "firstName lastName _id",
                });
            }
            if (lang === "ar") {
              news = await News.find({
                status: "enable",
                "keywords.ar": keyword,
              })
                .sort({ date: -1 })
                .skip(skip)
                .limit(itemsPerPage)
                .populate({
                  path: "writer",
                  model: "User",
                  select: "firstName lastName _id",
                });
            }
          }
        }

        if (category !== "null") {
          if (keyword === "null") {
            news = await News.find({ category, status: "enable" })
              .sort({ date: -1 })
              .skip(skip)
              .limit(itemsPerPage)
              .populate({
                path: "writer",
                model: "User",
                select: "firstName lastName _id",
              });
          }
          if (keyword !== "null") {
            if (lang === "fa") {
              news = await News.find({
                status: "enable",
                "keywords.fa": keyword,
                category,
              })
                .sort({ date: -1 })
                .skip(skip)
                .limit(itemsPerPage)
                .populate({
                  path: "writer",
                  model: "User",
                  select: "firstName lastName _id",
                });
            }
            if (lang === "en") {
              news = await News.find({
                status: "enable",
                "keywords.en": keyword,
                category,
              })
                .sort({ date: -1 })
                .skip(skip)
                .limit(itemsPerPage)
                .populate({
                  path: "writer",
                  model: "User",
                  select: "firstName lastName _id",
                });
            }
            if (lang === "ar") {
              news = await News.find({
                status: "enable",
                "keywords.ar": keyword,
                category,
              })
                .sort({ date: -1 })
                .skip(skip)
                .limit(itemsPerPage)
                .populate({
                  path: "writer",
                  model: "User",
                  select: "firstName lastName _id",
                });
            }
          }
        }

        return Response.json(news, {
          status: 200,
          headers: {
            "Cache-Control": "max-age=120, must-revalidate",
          },
        });
      }
    } catch (err) {
      logger.error(`api news paginated get error, status:500/ ${err}`);

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error("api news paginated get error, status:403");

    return Response.json("access denied", { status: 403 });
  }
};
