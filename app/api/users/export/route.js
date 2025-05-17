import * as XLSX from "xlsx";
import panotechDBConnect from "@/app/[lang]/utils/panotechDBConnect";
import { getServerSession } from "next-auth";

import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { User } from "@/app/[lang]/models";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (session === null || session?.user.role !== "admin") {
    return new Response("access denied", { status: 403 });
  } else {
    try {
      await panotechDBConnect();
      const users = await User.find(
        {},
        {
          _id: 0,
          firstName: 1,
          lastName: 1,
          email: 1,
          mobile: 1,
          country: 1,
          countryCode: 1,
          address: 1,
          field: 1,
          job: 1,
          postalCode: 1,
        }
      );

      const exportUsers = users.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        country: user.country,
        countryCode: user.countryCode,
        field: user.field,
        job: user.job,
        postalCode: user.postalCode,
        address: user.address,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportUsers);
      worksheet["!cols"] = [
        { wch: 20 },
        { wch: 15 },
        { wch: 30 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 60 },
      ];
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
      const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

      return new Response(buf, {
        status: 200,
        headers: {
          "Content-Disposition": `attachment; filename="users.xlsx"`,
          "Content-Type": "application/vnd.ms-excel",
        },
      });
    } catch (err) {
      return new Response("error", { status: 500 });
    }
  }
};
