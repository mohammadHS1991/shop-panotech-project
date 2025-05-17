import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";

import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { User } from "@/app/[lang]/models";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

//*-----------------------------update userRole
export const PUT = async (request, { params }) => {
  const headerList = headers();
  const API_KEY = headerList.get("API_KEY");
  const session = await getServerSession(authOptions);

  if (
    API_KEY === process.env.NEXT_PUBLIC_API_KEY &&
    session?.user.role === "admin"
  ) {
    const _id = params.id;
    try {
      const { values } = await request.json();
      const { role } = values;

      await panotechDBConnect();
      if (!(await User.findById(_id))) {
        return NextResponse.json(
          { message: "کاربری با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      try {
        const validatedUserInfos = await User.userRoleValidation({
          role,
        });
      } catch (err) {
        return NextResponse.json(
          { message: "موارد وارد شده صحیح نمی‌باشد" },
          { status: 422 }
        );
      }

      const returnObject = {
        _id,
        role,
      };

      await User.findByIdAndUpdate(_id, {
        role,
      });

      return NextResponse.json(returnObject, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { message: "مشکلی در سرور پیش آمده است" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json("access denied", { status: 403 });
  }
};
