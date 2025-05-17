"use client";

import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, useSession } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";
import { loginSchema } from "../../validations/formsValidation";
import CustomToast from "../CustomToast";
import { getLocalCart } from "../../reducers/localCartSlice";
import { addLocalCartToUser } from "../../reducers/userSlice";
import InputCustom from "../InputCustom";
import InputPasswordCustom from "../InputPasswordCustom";
import { customTostText, loginText } from "../../data/data";
import { arLoginSchema } from "../../validations/arFormValidation";
import { enLoginSchema } from "../../validations/enFormValidation";

const Login = ({ params }) => {
  const lang = params.lang;
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);

  //? ============= START Push to home when use is login ==============
  const session = useSession();
  if (session.status == "authenticated") {
    router.push(`/${lang}`);
  }
  //? ============= / END Push to home when use is login ==============

  //? ======================= START useSelector =======================
  const localCart =
    useSelector(getLocalCart).length > 0 ? useSelector(getLocalCart) : [];
  //? ======================= / END useSelector =======================
  //? ======================= START useDispatch =======================
  const dispatch = useDispatch();
  //? ======================= / END useDispatch =======================
  //? =============== START handleLogin (use in formik) ===============
  const handleLogin = async (values, resetForm) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        recaptcha: values.recaptcha,
        redirect: false,
      });
      if (result.ok) {
        CustomToast("success", customTostText.login.status200[lang]);
        if (localCart.length > 0) {
          const data = { email: values.email, localCart };
          dispatch(addLocalCartToUser(data));
          localStorage.setItem("localCart", JSON.stringify([]));
          resetForm();
        }
        router.replace(`/${lang}/${callbackUrl}`);
      } else {
        CustomToast("error", customTostText.login.status422[lang]);
      }
    } catch (err) {
      CustomToast("error", customTostText.login.status500[lang]);
    } finally {
      setLoading(false);
    }
  };
  //? =============== / END handleLogin (use in formik) ===============
  //? ========================= START FORMIK ==========================
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      recaptcha: "",
    },
    validationSchema:
      (lang == "fa" && loginSchema) ||
      (lang == "en" && enLoginSchema) ||
      (lang == "ar" && arLoginSchema),
    onSubmit: (values, { resetForm }) => {
      handleLogin(values, resetForm);
    },
  });
  //? ========================= / END FORMIK ==========================
  //? ================ START getInnerWidthForRecaptcha ================
  const [innerWidth, setInnerWidth] = useState(window?.innerWidth);
  // useEffect(() => {
  //   setInnerWidth(window.innerWidth);
  // }, []);
  //? ================ / END getInnerWidthForRecaptcha ================
  return (
    <section className=" flex flex-col justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="
        w-11/12 sm:w-4/5 lg:w-3/5 xl:w-2/5 my-10 p-2 xs:p-10
        bg-gray-50 rounded-3xl shadow-xl
        flex flex-col justify-center items-center "
      >
        <div className="flex flex-col justify-center items-center mb-10">
          <Link href={`/${lang}`}>
            <Image
              src="/images/panotech.jpg"
              width={236}
              height={48}
              alt={loginText.logoTitle[lang]}
              className=" rounded-lg mb-1 hover:shadow-md hover:shadow-green-100"
            />
          </Link>
          <p className=" text-gray-400 "> {loginText.logoTitle[lang]} </p>
        </div>
        <h2 className="text-green-700 text-2xl font-bold mb-10">
          {" "}
          {loginText.title[lang]}{" "}
        </h2>
        <InputCustom
          name={"email"}
          label={loginText.email[lang]}
          formik={formik}
          dir={lang === "en" ? "ltr" : "rtl"}
        />
        <InputPasswordCustom
          name={"password"}
          label={loginText.password[lang]}
          formik={formik}
          dir={lang === "en" ? "ltr" : "rtl"}
        />
        <div className="p-2 mb-4">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
            theme="light"
            hl={lang}
            onChange={(value) => {
              formik.setFieldValue("recaptcha", value);
            }}
            size={innerWidth < 380 ? "compact" : "normal"}
          />
          {formik.touched.recaptcha && formik.errors.recaptcha && (
            <p className="mt-2 text-warning text-xs">
              {formik.errors.recaptcha}
            </p>
          )}
        </div>
        <Button
          type="submit"
          isLoading={loading}
          className="
          py-2 h-14 w-full mb-10
          text-center text-white font-semibold
          hover:bg-green-300 bg-green-500 rounded-xl"
        >
          {loginText.btn[lang]}
        </Button>
        <div className="flex justify-between mb-4 drop-shadow-2xl">
          <p className="me-2 text-green-900 font-bold">
            {loginText.text1[lang]}
          </p>
          <Link
            href={`/${lang}/forgot-password`}
            className=" hover:text-green-300 text-green-500 font-bold underline"
          >
            {loginText.text2[lang]}
          </Link>
        </div>
        <div className="flex justify-between drop-shadow-2xl">
          <p className="me-2 text-green-900 font-bold">
            {loginText.text3[lang]}
          </p>
          <Link
            href={`/${lang}/register`}
            className=" hover:text-green-300 text-green-500 font-bold underline"
          >
            {loginText.text4[lang]}
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
