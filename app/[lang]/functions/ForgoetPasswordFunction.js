import { customTostText } from "../data/data";

const ForgetPasswordFunction = async (data) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL + `/api/auth/forget-password`,
      {
        method: "POST",
        cache: "no-cache",
        headers: { API_KEY: process.env.NEXT_PUBLIC_API_KEY },
        body: JSON.stringify({
          values: data.values,
          lang: data.lang,
        }),
      }
    );

    if (res.status === 422) {
      throw new Error(customTostText.forgetPassword.status422[data.lang]);
    }

    if (res.status === 403) {
      throw new Error(customTostText.forgetPassword.status403[data.lang]);
    }

    if (res.status === 404) {
      throw new Error(customTostText.forgetPassword.status404[data.lang]);
    }

    if (res.status === 500) {
      throw new Error(customTostText.forgetPassword.status500[data.lang]);
    }

    if (res.status === 200) {
      return res.json();
    }
  } catch (err) {
    throw new Error(customTostText.forgetPassword.forgetPassErr[data.lang]);
  }
};

export default ForgetPasswordFunction;
