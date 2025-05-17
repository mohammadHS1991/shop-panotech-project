const EditEventFunction = async (data) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL +
        `/api/blogs/events/${data.eventId}`,
      {
        method: "PUT",
        cache: "no-cache",
        headers: { API_KEY: process.env.NEXT_PUBLIC_API_KEY },
        body: JSON.stringify({
          values: data.values,
          imagesNames: data.imagesNames,
          userId: data.userId,
          faKeywords: data.faKeywords,
          enKeywords: data.enKeywords,
          arKeywords: data.arKeywords,
          imagesChanged: data.imagesChanged,
          date: data.date,
        }),
      }
    );

    if (res.status === 422) {
      throw new Error("موارد وارد شده اشتباه است");
    }

    if (res.status === 403) {
      throw new Error("دسترسی غیرمجاز");
    }

    if (res.status === 404) {
      throw new Error("رویدادی با این مشخصات یافت نشد");
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

export default EditEventFunction;
