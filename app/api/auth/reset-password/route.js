import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { User } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import mailer from "@/app/[lang]/utils/mailer";
import { logger } from "@/app/[lang]/utils/logger";

export const POST = async (request) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY) {
    try {
      const { password, email } = await request.json();

      await panotechDBConnect();
      const user = await User.findOne({ email: email });

      if (!user) {
        return NextResponse.json(
          { message: "کاربری با این مشخصات یافت نشد" },
          {
            status: 404,
          }
        );
      }

      user.password = password;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;

      user.save();

      return NextResponse.json("رمز ورود با موفقیت تغییر کرد", {
        status: 200,
      });
    } catch (err) {
      const mailToAdmin = await mailer(
        process.env.ADMIN_EMAIL,
        "panotech | auth",
        `<h1>api auth reset-password post error, status:500</h1>
        <h2>${err}</h2>`
      );
      logger.error(`api auth reset-password post error, status:500/ ${err}`);
      return NextResponse.json(
        "مشکلی در سرور رخ داده است، لطفاً مجدداً تلاش کنید",
        {
          status: 500,
        }
      );
    }
  } else {
    const mailToAdmin = await mailer(
      process.env.ADMIN_EMAIL,
      "panotech | auth",
      `<h1>api auth reset-password post error, status:403</h1>`
    );
    logger.error(`api auth reset-password post error, status:403`);
    return NextResponse.json("access denied", { status: 403 });
  }
};
