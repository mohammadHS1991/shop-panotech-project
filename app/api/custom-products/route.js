import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { CustomProduct, User } from "../../[lang]/models";
import panotechDBConnect from "../../[lang]/utils/panotechDBConnect";
import { recaptchaServerValidation } from "@/app/[lang]/utils";
import mailer from "@/app/[lang]/utils/mailer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { shop } from "@/public/data/data";
import { logger } from "@/app/[lang]/utils/logger";
import EmailBodyTemplate from "@/app/[lang]/components/EmailBodyTemplate";
import { revalidateTag } from "next/cache";

//*-----------------------------get all custom products
export const GET = async () => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.GET_API_KEY) {
    try {
      await panotechDBConnect();
      const customProducts = await CustomProduct.find().populate({
        path: "product",
        model: "Product",
        select: "_id name images price",
      });
      return Response.json(customProducts, {
        status: 200,
      });
    } catch (err) {
      logger.error(`api custom-products get error, status:500/ ${err} `);

      return Response.json("db error", { status: 500 });
    }
  } else {
    logger.error(`api custom-products get error, status:403 `);

    return Response.json("access denied", { status: 403 });
  }
};

//*-----------------------------create new custom product
export const POST = async (request) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY) {
    const session = await getServerSession(authOptions);
    try {
      const { values, country, code, lang, productId } = await request.json();

      const {
        firstName,
        lastName,
        email,
        job,
        mobile,
        postalCode,
        message,
        address,
        recaptcha,
      } = values;

      //? check recaptcha value with api
      const captchaResponse = await recaptchaServerValidation(
        process.env.CAPTCHA_SECRET_KEY,
        recaptcha
      );

      if (captchaResponse.success) {
        //? validate values with customProductsYupSchema
        try {
          const validatedProduct = await CustomProduct.customProductValidation({
            firstName,
            lastName,
            email,
            job,
            mobile,
            postalCode,
            message,
            address,
            recaptcha,
          });
        } catch (err) {
          return NextResponse.json(
            { message: "موارد وارد شده صحیح نمی‌باشد" },
            { status: 422 }
          );
        }
        const orderCode = `cp-${Math.ceil(Math.random() * 10000 + 10000)}`;
        const newCustomProduct = new CustomProduct({
          firstName,
          lastName,
          email,
          job,
          country,
          countryCode: code,
          mobile,
          postalCode,
          message,
          address,
          orderCode,
          lang,
          product: productId,
        });

        await panotechDBConnect();
        await newCustomProduct.save();

        //?------------------------------------------------------------ sendEmail

        const mailBody = `
      <div style="text-align: right">
          <h2>درخواست کننده: ${firstName} ${lastName}</h2>
          <h3>شماره تماس: ${mobile}</h3>
          <h3>ایمیل : ${email}</h3>
          <h3>شغل : ${job}</h3>
          <p>${message}</p>
      </div>
      `;
        const subject = "پانوتک | درخواست جدید محصول سفارشی";

        const userMailBody = EmailBodyTemplate(
          lang,
          shop[lang].customProductApi.subject,
          `${
            lang === "en" ? shop[lang].customProductApi.dearUser : ""
          }${firstName} ${lastName} ${
            lang !== "en" ? shop[lang].customProductApi.dearUser : ""
          }`,
          shop[lang].customProductApi.hello,
          shop[lang].customProductApi.submitText,
          shop[lang].customProductApi.thanks,
          "",
          `${shop[lang].customProductApi.orderCode}: ${orderCode}`
        );

        const userSubject = shop[lang].customProductApi.subject;

        const mail = await mailer(
          process.env.EMAIL_RECEIVER,
          subject,
          mailBody
        );
        const userMail = await mailer(email, userSubject, userMailBody);

        if (session !== null) {
          const user = await User.findById(session.user.id);
          const customProducts = user.customProducts;
          customProducts.push(newCustomProduct._id);
          await User.findByIdAndUpdate(session.user.id, { customProducts });
        }

        const returnedCustomProduct = await CustomProduct.findById(
          newCustomProduct._id
        ).populate({
          path: "product",
          model: "Product",
          select: "_id name images price",
        });

        revalidateTag("customProductsChange");
        return NextResponse.json(returnedCustomProduct, { status: 201 });
      } else {
        return NextResponse.json(
          { message: "موارد وارد شده صحیح نمی‌باشد" },
          { status: 422 }
        );
      }
    } catch (err) {
      logger.error(`api custom-products post error, status:500/ ${err} `);
      const mailToAdmin = await mailer(
        process.env.ADMIN_EMAIL,
        "panotech | custom-products",
        `<h1>api custom-products post error, status:500</h1>
        <h2>${err}</h2>`
      );

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api custom-products post error, status:403`);

    const mailToAdmin = await mailer(
      process.env.ADMIN_EMAIL,
      "panotech | custom-products",
      `<h1>api custom-products post error, status:403</h1>`
    );

    return NextResponse.json("access denied", { status: 403 });
  }
};
