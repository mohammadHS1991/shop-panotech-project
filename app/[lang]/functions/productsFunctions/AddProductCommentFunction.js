const AddProductCommentFunction = async (data) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL + `/api/products/comments/add`,
      {
        method: "PUT",
        cache: "no-cache",
        headers: { API_KEY: process.env.NEXT_PUBLIC_API_KEY },
        body: JSON.stringify({
          comment: data.values.comment,
          author: data.author,
          productId: data.productId,
        }),
      }
    );

    if (res.status === 422) {
      throw new Error("موارد وارد شده اشتباه است");
    }

    if (res.status === 403) {
      throw new Error("دسترسی غیرمجاز");
    }

    if (res.status === 500) {
      throw new Error("مشکلی در سرور پیش آمده. لطفاً مجدداً تلاش کنید");
    }

    if (res.status === 404) {
      throw new Error("محصولی با این مشخصات یافت نشد.");
    }

    if (res.status === 200) {
      return res.json();
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default AddProductCommentFunction;
