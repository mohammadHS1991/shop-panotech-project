import { headers } from "next/headers";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { Gallery } from "@/app/[lang]/models";
import { logger } from "@/app/[lang]/utils/logger";

export const GET = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    const { slug } = params;
    try {
      await panotechDBConnect();

      const gallery = await Gallery.findOne({
        "slug.en": slug,
        status: "enable",
      }).populate({
        path: "writer",
        model: "User",
        select: "firstName lastName _id",
      });

      return Response.json(gallery, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api gallery slug get error, status:500/ ${err} `);
      return Response.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api gallery slug get error, status:403`);

    return Response.json({ message: "access denied" }, { status: 403 });
  }
};
