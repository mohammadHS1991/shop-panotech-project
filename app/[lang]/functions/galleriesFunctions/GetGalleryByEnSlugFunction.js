const GetGalleryByEnSlugFunction = async (slug) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL + `/api/gallery/slug/${slug}`,
      {
        method: "GET",
        headers: { API_KEY: process.env.GET_API_KEY },
        next: { tags: ["galleriesChange"] },
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
    return "error";
  }
};

export default GetGalleryByEnSlugFunction;
