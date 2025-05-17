import { customTostText } from "../data/data";

const RegisterFunction = async (data) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PANOTECH_BASE_URL + `/api/auth/register`,
      {
        method: "POST",
        cache: "no-cache",
        headers: { API_KEY: process.env.NEXT_PUBLIC_API_KEY },
        body: JSON.stringify({
          values: data.values,
          code: data.code,
          country: data.country,
          lang: data.lang,
        }),
      }
    );

    if (res.status === 422) {
      throw new Error(customTostText.register.status422[data.lang]);
    }

    if (res.status === 403) {
      throw new Error(customTostText.register.status403[data.lang]);
    }

    if (res.status === 409) {
      throw new Error(customTostText.register.status409[data.lang]);
    }

    if (res.status === 500) {
      throw new Error(customTostText.register.status500[data.lang]);
    }

    if (res.status === 201) {
      return res.json();
    }
  } catch (err) {
    throw new Error(customTostText.register.registerErr[data.lang]);
  }
};

export default RegisterFunction;
