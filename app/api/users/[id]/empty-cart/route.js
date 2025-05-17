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

  if (API_KEY === process.env.NEXT_PUBLIC_API_KEY && session !== null) {
    const _id = params.id;
    try {
      await panotechDBConnect();
      if (!(await User.findById(_id))) {
        return NextResponse.json(
          { message: "کاربری با این مشخصات یافت نشد" },
          { status: 404 }
        );
      }

      const returnObject = {
        _id,
        openCart: [],
      };

      await User.findByIdAndUpdate(_id, {
        openCart: [],
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
