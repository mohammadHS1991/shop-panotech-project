const recaptchaServerValidation = async (secretKey, recaptchaToken) => {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: `secret=${secretKey}&response=${recaptchaToken}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
  });
  return res.json();
};

export default recaptchaServerValidation;
