import { NextResponse } from "next/server";
import crypto from "crypto";
import { headers } from "next/headers";

import { User } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import mailer from "@/app/[lang]/utils/mailer";
import { forgetPassword } from "@/public/data/data";
import { logger } from "@/app/[lang]/utils/logger";
import { recaptchaServerValidation } from "@/app/[lang]/utils";
import EmailBodyTemplate from "@/app/[lang]/components/EmailBodyTemplate";

export const POST = async (request) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY) {
    const { values, lang } = await request.json();
    const { email, recaptcha } = values;

    const captchaResponse = await recaptchaServerValidation(
      process.env.CAPTCHA_SECRET_KEY,
      recaptcha
    );

    if (captchaResponse.success) {
      await panotechDBConnect();
      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json("کاربری با ایمیل واردشده ثبت نشده است", {
          status: 404,
        });
      }

      //? this token will send with url in link in email
      const resetToken = crypto.randomBytes(20).toString("hex");

      //? this token will save to user database
      const passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      const passwordResetExpires = Date.now() + 1 * 60 * 60 * 1000; //? 1hr

      user.resetToken = passwordResetToken;
      user.resetTokenExpiry = passwordResetExpires;
      const resetUrl = `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/${lang}/reset-password/${resetToken}`;

      const mailBody = EmailBodyTemplate(
        lang,
        forgetPassword[lang].api.mailSubject,
        `${lang === "en" ? forgetPassword[lang].api.dearUser : ""}${
          user.firstName
        } ${user.lastName} ${
          lang !== "en" ? forgetPassword[lang].api.dearUser : ""
        }`,
        forgetPassword[lang].api.hello,
        forgetPassword[lang].api.mailBody,
        "",
        resetUrl
      );
      const subject = forgetPassword[lang].api.mailSubject;

      try {
        const mail = await mailer(email, subject, mailBody);

        if (mail.message === "success") {
          return NextResponse.json(
            { message: "ایمیل با موفقیت ارسال شد" },
            {
              status: 200,
            }
          );
        } else if (mail.message === "fail") {
          user.resetToken = undefined;
          user.resetTokenExpiry = undefined;
          const mailToAdmin = await mailer(
            process.env.ADMIN_EMAIL,
            "panotech | auth",
            `<h1>api auth forget-password post error, status:500</h1>`
          );
          logger.error(
            `api auth forget-password post error, status:500/ ${err}`
          );
          return NextResponse.json(
            { message: "مشکلی در سرور پیش آمده است" },
            {
              status: 500,
            }
          );
        }
      } catch (err) {
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        const mailToAdmin = await mailer(
          process.env.ADMIN_EMAIL,
          "panotech | auth",
          `<h1>api auth forget-password post error, status:500</h1>
        <h2>${err}</h2>`
        );
        logger.error(`api auth forget-password post error, status:500/ ${err}`);
        return NextResponse.json(
          { message: "مشکلی در سرور پیش آمده است" },
          {
            status: 500,
          }
        );
      } finally {
        await user.save();
      }
    } else {
      return NextResponse.json(
        { message: "موارد وارد شده صحیح نمی‌باشد" },
        { status: 422 }
      );
    }
  } else {
    const mailToAdmin = await mailer(
      process.env.ADMIN_EMAIL,
      "panotech | auth",
      `<h1>api auth forget-password post error, status:403</h1>`
    );
    logger.error(`api auth forget-password post error, status:403`);
    return NextResponse.json("access denied", { status: 403 });
  }
};
