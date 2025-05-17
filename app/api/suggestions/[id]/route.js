import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";
import { getServerSession } from "next-auth";

import { Suggestion } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { logger } from "@/app/[lang]/utils/logger";
import { revalidateTag } from "next/cache";
//*-----------------------------delete product
export const DELETE = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  const session = await getServerSession(authOptions);

  if (
    API_KEY === process.env.NEXT_PUBLIC_API_KEY &&
    (session?.user.role === "admin" || session?.user.role === "operator")
  ) {
    try {
      const _id = await params.id;

      await panotechDBConnect();
      const suggestion = await Suggestion.findById(_id);

      if (!suggestion) {
        return NextResponse.json(
          { message: "پیشنهادی با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      await Suggestion.findByIdAndDelete(_id);
      if (suggestion.images.length > 0) {
        await rm(
          `./public/${suggestion.images[0].name
            .split("/")
            .splice(0, 4)
            .join("/")}`,
          {
            recursive: true,
            force: true,
          }
        );
      }

      revalidateTag("suggestionsChange");

      return NextResponse.json(_id, { status: 200 });
    } catch (err) {
      logger.error(`api suggestion id delete error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api suggestion id delete error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
