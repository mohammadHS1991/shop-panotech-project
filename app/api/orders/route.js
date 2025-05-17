import { headers } from "next/headers";

import panotechDBConnect from "../../[lang]/utils/panotechDBConnect";
import { Order } from "../../[lang]/models";
import { logger } from "@/app/[lang]/utils/logger";

export const GET = async () => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      await panotechDBConnect();
      const orders = await Order.find().populate("user").populate({
        path: "cart.product",
        model: "Product",
        select: "name _id images price",
      });

      return Response.json(orders, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api order get error, status:500/ ${err} `);

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error(`api order get error, status:403`);

    return Response.json("access denied", { status: 403 });
  }
};
