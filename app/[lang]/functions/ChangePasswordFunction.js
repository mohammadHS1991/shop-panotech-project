import { customTostText } from "../data/data";

const ChangePasswordFunction = async (data) => {
  const lang = data.lang;
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL + `/api/auth/reset-password`,
      {
        method: "POST",
        cache: "no-cache",
        headers: { API_KEY: process.env.NEXT_PUBLIC_API_KEY },
        body: JSON.stringify({
          password: data.password,
          email: data.email,
        }),
      }
    );

    if (res.status === 422) {
      throw new Error(customTostText.resetPassword.status422[lang]);
    }

    if (res.status === 403) {
      throw new Error(customTostText.resetPassword.status403[lang]);
    }

    if (res.status === 500) {
      throw new Error(customTostText.resetPassword.status500[lang]);
    }

    if (res.status === 200) {
      return res.json();
    }
  } catch (err) {
    throw new Error(customTostText.resetPassword.resetPasErr[lang]);
  }
};

export default ChangePasswordFunction;
