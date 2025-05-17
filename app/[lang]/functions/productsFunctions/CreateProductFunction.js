const CreateProductFunction = async (data) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL + `/api/products`,
      {
        method: "POST",
        cache: "no-cache",
        headers: { API_KEY: process.env.NEXT_PUBLIC_API_KEY },
        body: JSON.stringify({
          values: data.values,
          imagesNames: data.imagesNames,
          guideImagesNames: data.guideImagesNames,
          guideVideosNames: data.guideVideosNames,
          filesNames: data.filesNames,
          faKeywords: data.faKeywords,
          enKeywords: data.enKeywords,
          arKeywords: data.arKeywords,
          userId: data.userId,
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

    if (res.status === 409) {
      throw new Error("این محصول قبلاً ثبت شده است");
    }

    if (res.status === 201) {
      return res.json();
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default CreateProductFunction;
