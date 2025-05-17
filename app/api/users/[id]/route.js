import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";

import { User } from "@/app/[lang]/models";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { logger } from "@/app/[lang]/utils/logger";
import mailer from "@/app/[lang]/utils/mailer";

//*-----------------------------update userInfos
export const PUT = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  const session = await getServerSession(authOptions);

  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY && session !== null) {
    const _id = params.id;
    try {
      const { values, country, code } = await request.json();
      const { firstName, lastName, mobile, job, postalCode, field, address } =
        values;

      await panotechDBConnect();

      const user = await User.findById(_id);
      if (!user) {
        return NextResponse.json(
          { message: "کاربری با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      try {
        const validatedUserInfos = await User.userInfoValidation({
          firstName,
          lastName,
          mobile,
          job,
          postalCode,
          field,
          address,
        });
      } catch (err) {
        return NextResponse.json(
          { message: "موارد وارد شده صحیح نمی‌باشد" },
          { status: 422 }
        );
      }

      const returnObject = {
        _id,
        firstName,
        lastName,
        country,
        countryCode: code,
        mobile,
        job,
        postalCode,
        field,
        address,
      };

      await User.findByIdAndUpdate(_id, {
        firstName,
        lastName,
        country,
        countryCode: code,
        mobile,
        job,
        postalCode,
        field,
        address,
      });

      return NextResponse.json(returnObject, { status: 200 });
    } catch (err) {
      logger.error(`api users id put error, status:500/ ${err} `);
      const mailToAdmin = await mailer(
        process.env.ADMIN_EMAIL,
        "panotech | users",
        `<h1>api users id put error, status:500</h1>
        <h2>${err}</h2>`
      );

      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    logger.error(`api users id put error, status:403`);
    const mailToAdmin = await mailer(
      process.env.ADMIN_EMAIL,
      "panotech | users",
      `<h1>api users id put error, status:403</h1>`
    );
    return NextResponse.json("access denied", { status: 403 });
  }
};
