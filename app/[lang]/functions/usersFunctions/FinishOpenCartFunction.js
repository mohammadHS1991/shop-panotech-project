const FinishOpenCartFunction = async (data) => {
  console.log(data.lang);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL +
        `/api/users/${data.userId}/finish-open-cart`,
      {
        method: "PUT",
        cache: "no-cache",
        headers: { API_KEY: process.env.NEXT_PUBLIC_API_KEY },
        body: JSON.stringify({
          totalCartPrice: data.totalCartPrice,
          lang: data.lang,
          shippingPrice: data.shippingPrice,
          totalDiscount: data.totalDiscount,
        }),
      }
    );

    if (res.status === 403) {
      throw new Error("دسترسی غیرمجاز");
    }

    if (res.status === 404) {
      throw new Error("کاربری با این مشخصات یافت نشد");
    }

    if (res.status === 500) {
      throw new Error("مشکلی در سرور پیش آمده. لطفاً مجدداً تلاش کنید");
    }

    if (res.status === 200) {
      return res.json();
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default FinishOpenCartFunction;
