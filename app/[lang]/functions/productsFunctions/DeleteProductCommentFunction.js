const DeleteProductCommentFunction = async (data) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL +
        `/api/products/comments/delete`,
      {
        method: "PUT",
        cache: "no-cache",
        headers: { API_KEY: process.env.NEXT_PUBLIC_API_KEY },
        body: JSON.stringify({
          commentId: data.commentId,
          productId: data.productId,
        }),
      }
    );

    if (res.status === 403) {
      throw new Error("دسترسی غیرمجاز");
    }

    if (res.status === 500) {
      throw new Error("مشکلی در سرور پیش آمده. لطفاً مجدداً تلاش کنید");
    }

    if (res.status === 404) {
      throw new Error("محصولی یا نظری با این مشخصات یافت نشد.");
    }

    if (res.status === 200) {
      return res.json();
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default DeleteProductCommentFunction;
