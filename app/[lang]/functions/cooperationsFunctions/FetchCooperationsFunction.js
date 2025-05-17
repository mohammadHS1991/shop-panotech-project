"use server";
const FetchCooperationsFunction = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL + `/api/cooperations`,
      {
        method: "GET",
        next: { tags: ["cooperationsChange"] },
        headers: { API_KEY: process.env.GET_API_KEY },
      }
    );

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
    // console.log(err);
    throw new Error(err);
  }
};

export default FetchCooperationsFunction;
