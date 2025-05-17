const EditUserOpenCartFunction = async (data) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL +
        `/api/users/${data.userId}/edit-open-cart`,
      {
        method: "PUT",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          API_KEY: process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify({
          productId: data.productId,
          qty: data.qty,
        }),
      }
    );

    if (res.status === 404) {
      throw new Error("کاربر یا محصولی با این مشخصات یافت نشد");
    }

    if (res.status === 403) {
      throw new Error("دسترسی غیرمجاز");
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

export default EditUserOpenCartFunction;
