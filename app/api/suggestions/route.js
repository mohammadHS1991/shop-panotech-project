import { NextResponse } from "next/server";
import { rm } from "node:fs/promises";
import { headers } from "next/headers";

import { Suggestion } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { recaptchaServerValidation } from "@/app/[lang]/utils";
import mailer from "@/app/[lang]/utils/mailer";
import { logger } from "@/app/[lang]/utils/logger";
import { revalidateTag } from "next/cache";

//*-----------------------------get all questions
export const GET = async () => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      await panotechDBConnect();
      const suggestions = await Suggestion.find();
      return Response.json(suggestions, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api suggestion get error, status:500/ ${err} `);

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error(`api suggestion get error, status:403`);

    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------create new questions
export const POST = async (request) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  let filesFolder = "";
  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY) {
    try {
      const { values, imagesNames, country, code } = await request.json();

      const { firstName, lastName, email, job, mobile, message, recaptcha } =
        values;

      if (imagesNames.length > 0) {
        filesFolder = `./public/${imagesNames[0].name
          .split("/")
          .slice(0, 4)
          .join("/")}`;
      }

      //? check recaptcha value with api
      const captchaResponse = await recaptchaServerValidation(
        process.env.CAPTCHA_SECRET_KEY,
        recaptcha
      );

      if (captchaResponse.success) {
        //? validate values with customProductsYupSchema
        try {
          const validatedSuggestion = await Suggestion.suggestionValidation({
            firstName,
            lastName,
            email,
            job,
            mobile,
            message,
            images: imagesNames,
            recaptcha,
          });
        } catch (err) {
          if (filesFolder) {
            await rm(filesFolder, {
              recursive: true,
              force: true,
            });
          }
          return NextResponse.json(
            { message: "موارد وارد شده صحیح نمی‌باشد" },
            { status: 422 }
          );
        }

        const newSuggestion = new Suggestion({
          firstName,
          lastName,
          email,
          job,
          country,
          countryCode: code,
          mobile,
          message,
          images: imagesNames,
        });

        await panotechDBConnect();
        await newSuggestion.save();

        //?------------------------------------------------------------ sendEmail

        const mailBody = `
            <div dir="rtl">
                <h2>پیشنهاد کننده: ${firstName} ${lastName}</h2>
                <h3>شماره تماس: ${mobile}</h3>
                <h3>ایمیل : ${email}</h3>
                <h3>شغل : ${job ? job : ""}</h3>
                <p>${message}</p>
            </div>
            `;
        const subject = "پانوتک | پیشنهاد جدید";

        const mail = await mailer(
          process.env.EMAIL_RECEIVER,
          subject,
          mailBody
        );

        revalidateTag("suggestionsChange");

        return NextResponse.json(newSuggestion, { status: 201 });
      } else {
        if (filesFolder) {
          await rm(filesFolder, {
            recursive: true,
            force: true,
          });
        }
        return NextResponse.json(
          { message: "موارد وارد شده صحیح نمی‌باشد" },
          { status: 422 }
        );
      }
    } catch (err) {
      if (filesFolder) {
        await rm(filesFolder, {
          recursive: true,
          force: true,
        });
      }

      const mailToAdmin = await mailer(
        process.env.ADMIN_EMAIL,
        "panotech | suggestion",
        `<h1>api suggestion post error, status:500</h1>
        <h2>${err}</h2>`
      );
      logger.error(`api suggestion post error, status:500/ ${err} `);

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    if (filesFolder) {
      await rm(filesFolder, {
        recursive: true,
        force: true,
      });
    }

    const mailToAdmin = await mailer(
      process.env.ADMIN_EMAIL,
      "panotech | suggestion",
      `<h1>api suggestion post error, status:403</h1>`
    );

    logger.error(`api suggestion post error, status:403`);

    return NextResponse.json("access denied", { status: 403 });
  }
};
