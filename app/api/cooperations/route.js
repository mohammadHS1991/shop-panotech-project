import { NextResponse } from "next/server";
import { rm } from "node:fs/promises";
import { headers } from "next/headers";

import { CooperationRequest } from "@/app/[lang]/models";
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
      const cooperations = await CooperationRequest.find();
      return Response.json(cooperations, {
        status: 200,
      });
    } catch (err) {
      logger.error("api cooperations get error, status:500");

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error("api cooperations get error, status:403");

    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------create new cooperation
export const POST = async (request) => {
  const headerList = headers();
  let filesFolder = "";
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY) {
    try {
      const { values, filesNames, country, code } = await request.json();

      const { firstName, lastName, email, job, mobile, message, recaptcha } =
        values;

      if (filesNames.length > 0) {
        filesFolder = `./public/${filesNames[0].name
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
          const validatedCooperation =
            await CooperationRequest.cooperationValidation({
              firstName,
              lastName,
              email,
              job,
              mobile,
              message,
              resume: filesNames,
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

        const newCooperationRequest = new CooperationRequest({
          firstName,
          lastName,
          email,
          job,
          country,
          countryCode: code,
          mobile,
          message,
          resume: filesNames,
        });

        await panotechDBConnect();
        await newCooperationRequest.save();

        //?------------------------------------------------------------ sendEmail

        const mailBody = `
            <div style="text-align: right">
                <h2>درخواست کننده: ${firstName} ${lastName}</h2>
                <h3>شماره تماس: ${mobile}</h3>
                <h3>ایمیل : ${email}</h3>
                <h3>شغل : ${job ? job : ""}</h3>
                <p>${message}</p>
            </div>
            `;
        const subject = "پانوتک | درخواست همکاری جدید";

        const mail = await mailer(
          process.env.EMAIL_RECEIVER,
          subject,
          mailBody
        );
        revalidateTag("cooperationsChange");
        return NextResponse.json(newCooperationRequest, { status: 201 });
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

      logger.error(`api cooperations post error, status:500/ ${err}`);
      const mailToAdmin = await mailer(
        process.env.ADMIN_EMAIL,
        "panotech | cooperations",
        `<h1>api cooperations post error, status:500</h1>
        <h2>${err}</h2>`
      );
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
      "panotech | cooperations",
      `<h1>api cooperations post error, status:403</h1>`
    );

    logger.error("api cooperations post error, status:403");

    return NextResponse.json("access denied", { status: 403 });
  }
};
