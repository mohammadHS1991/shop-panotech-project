import { NextResponse } from "next/server";
import { headers } from "next/headers";

import User from "@/app/[lang]/models/User";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { recaptchaServerValidation } from "@/app/[lang]/utils";
import { register } from "@/public/data/data";
import mailer from "@/app/[lang]/utils/mailer";
import { logger } from "@/app/[lang]/utils/logger";
import EmailBodyTemplate from "@/app/[lang]/components/EmailBodyTemplate";

export const POST = async (request) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY) {
    //*---------------------------destructor values
    const { values, code, country, lang } = await request.json();

    const {
      firstName,
      lastName,
      email,
      mobile,
      password,
      confirmPassword,
      recaptcha,
    } = values;

    //*---------------------------/destructor values

    //? check recaptcha value with api
    const captchaResponse = await recaptchaServerValidation(
      process.env.CAPTCHA_SECRET_KEY,
      recaptcha
    );

    if (captchaResponse.success) {
      try {
        await panotechDBConnect();
        //? check if user with email is already registered
        const user = await User.findOne({ email: email });
        if (user) {
          return NextResponse.json(
            { message: "این ایمیل قبلاً ثبت شده است" },
            { status: 409 }
          );
        }
        //? validate values with registerSchema

        try {
          const validatedUser = await User.userValidation({
            firstName,
            lastName,
            email,
            mobile,
            password,
            confirmPassword,
            recaptcha,
          });
        } catch (err) {
          return NextResponse.json(
            { message: "موارد وارد شده صحیح نمی‌باشد" },
            { status: 422 }
          );
        }
        const newUser = new User({
          firstName,
          lastName,
          email,
          mobile,
          country,
          countryCode: code,
          password,
          lang,
        });
        await newUser.save();

        const userMailBody = EmailBodyTemplate(
          lang,
          register[lang].registerApi.subject,
          `${
            lang === "en" ? register[lang].registerApi.dearUser : ""
          }${firstName} ${lastName} ${
            lang !== "en" ? register[lang].registerApi.dearUser : ""
          }`,
          register[lang].registerApi.hello,
          register[lang].registerApi.mailBody
        );

        const userSubject = register[lang].registerApi.subject;

        const userMail = await mailer(email, userSubject, userMailBody);

        return NextResponse.json({ message: "موفق" }, { status: 201 });
      } catch (err) {
        const mailToAdmin = await mailer(
          process.env.ADMIN_EMAIL,
          "panotech | auth",
          `<h1>api auth register post error, status:500</h1>
          <h2>${err}</h2>`
        );
        logger.error(`api auth register post error, status:500/ ${err}`);
        return NextResponse.json(
          { message: "مشکلی در سرور پیش آمده است" },
          { status: 500 }
        );
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
      `<h1>api auth register post error, status:403</h1>`
    );
    logger.error(`api auth register post error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
