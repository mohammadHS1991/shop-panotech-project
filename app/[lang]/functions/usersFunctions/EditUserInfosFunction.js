const EditUserInfosFunction = async (data) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL + `/api/users/${data.userId}`,
      {
        method: "PUT",
        cache: "no-cache",
        headers: { API_KEY: process.env.NEXT_PUBLIC_API_KEY },
        body: JSON.stringify({
          values: data.values,
          country: data.country,
          code: data.code,
        }),
      }
    );

    if (res.status === 422) {
      if (data.lang === "fa") {
        throw new Error("موارد وارد شده اشتباه است");
      }

      if (data.lang === "en") {
        throw new Error("The items entered are incorrect");
      }

      if (data.lang === "ar") {
        throw new Error("العناصر المدخلة غير صحيحة");
      }
    }

    if (res.status === 404) {
      if (data.lang === "fa") {
        throw new Error("کاربری با این مشخصات یافت نشد");
      }

      if (data.lang === "en") {
        throw new Error("No user with these specifications was found.");
      }

      if (data.lang === "ar") {
        throw new Error("لم يتم العثور على المستخدم مع هذا الملف الشخصي");
      }
    }

    if (res.status === 403) {
      if (data.lang === "fa") {
        throw new Error("دسترسی غیرمجاز");
      }

      if (data.lang === "en") {
        throw new Error("Access denied");
      }

      if (data.lang === "ar") {
        throw new Error("تم الرفض");
      }
    }

    if (res.status === 500) {
      if (data.lang === "fa") {
        throw new Error("مشکلی در سرور پیش آمده. لطفاً مجدداً تلاش کنید");
      }

      if (data.lang === "en") {
        throw new Error("There is a problem with the server");
      }

      if (data.lang === "ar") {
        throw new Error("هناك مشكلة مع الخادم");
      }
    }

    if (res.status === 200) {
      return res.json();
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default EditUserInfosFunction;
