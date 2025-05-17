const CreateCustomProductFunction = async (data) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL + `/api/custom-products`,
      {
        method: "POST",
        cache: "no-cache",
        headers: { API_KEY: process.env.NEXT_PUBLIC_API_KEY },
        body: JSON.stringify({
          values: data.values,
          filesNames: data.filesNames,
          imagesNames: data.imagesNames,
          country: data.country,
          code: data.code,
          lang: data.lang,
          productId: data.productId,
        }),
      }
    );

    if (res.status === 422) {
      throw new Error(
        data.lang === "fa"
          ? "موارد وارد شده اشتباه است"
          : data.lang === "en"
          ? "The items entered are incorrect"
          : data.lang === "ar"
          ? "العناصر المدخلة غير صحيحة"
          : ""
      );
    }

    if (res.status === 500) {
      throw new Error(
        data.lang === "fa"
          ? "مشکلی در سرور پیش آمده. لطفاً مجدداً تلاش کنید"
          : data.lang === "en"
          ? "There is a problem with the server"
          : data.lang === "ar"
          ? "هناك مشكلة مع الخادم"
          : ""
      );
    }

    if (res.status === 403) {
      throw new Error(
        data.lang === "fa"
          ? "دسترسی غیرمجاز"
          : data.lang === "en"
          ? "Access denied"
          : data.lang === "ar"
          ? "تم الرفض"
          : ""
      );
    }

    if (res.status === 201) {
      return res.json();
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default CreateCustomProductFunction;
