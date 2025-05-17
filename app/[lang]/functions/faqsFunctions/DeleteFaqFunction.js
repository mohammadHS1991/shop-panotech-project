const DeleteFaqFunction = async (faqId) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL + `/api/faqs/${faqId}`,
      {
        method: "DELETE",
        cache: "no-cache",
        headers: { API_KEY: process.env.NEXT_PUBLIC_API_KEY },
      }
    );

    if (res.status === 403) {
      throw new Error("دسترسی غیرمجاز");
    }

    if (res.status === 500) {
      throw new Error("مشکلی در سرور پیش آمده. لطفاً مجدداً تلاش کنید");
    }

    if (res.status === 404) {
      throw new Error("رویدادی با این مشخصات یافت نشد");
    }

    if (res.status === 200) {
      return res.json();
    }
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
};

export default DeleteFaqFunction;
