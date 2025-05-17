"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { registerSchema } from "../../validations/formsValidation";
import ReCAPTCHA from "react-google-recaptcha";
import RegisterFunction from "../../functions/RegisterFunction";
import CustomMobileInput from "../CustomMobileInput";
import CustomToast from "../CustomToast";
import InputCustom from "../InputCustom";
import InputPasswordCustom from "../InputPasswordCustom";
import { useSession } from "next-auth/react";
import { customTostText, registerText } from "../../data/data";
import { arRegisterSchema } from "../../validations/arFormValidation";
import { enRegisterSchema } from "../../validations/enFormValidation";

const Register = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const lang = params.lang;
  const [selected, setSelected] = useState("IR");
  const [code, setCode] = useState("+98");
  const [country, setCountry] = useState("Iran");

  //? ====================== START Push to home when use is login =====================
  const session = useSession();
  if (session.status == "authenticated") {
    router.push(`/${lang}`);
  }
  //? ====================== / END Push to home when use is login =====================

  //? ============================== START handelRegister =============================
  const handelRegister = async (values, code, country, lang, resetForm) => {
    setLoading(true);
    const data = { values, code, country, lang };
    try {
      const res = await RegisterFunction(data);
      CustomToast("success", customTostText.register.status201[lang]);
      resetForm();
      router.replace(`/${lang}/login`);
    } catch (err) {
      CustomToast("error", err);
    } finally {
      setLoading(false);
    }
  };
  //? ============================== / END handelRegister =============================
  //? ================================ START useFormik ================================
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      recaptcha: "",
    },
    validationSchema:
      (lang == "fa" && registerSchema) ||
      (lang == "en" && enRegisterSchema) ||
      (lang == "ar" && arRegisterSchema),
    onSubmit: (values, { resetForm }) => {
      handelRegister(values, code, country, lang, resetForm);
    },
  });
  //? ================================ / END useFormik ================================
  //? ======================== START getInnerWidthForRecaptcha ========================
  const [innerWidth, setInnerWidth] = useState(window?.innerWidth);
  // useEffect(() => {
  //   setInnerWidth(window.innerWidth);
  // }, []);
  //? ======================== / END getInnerWidthForRecaptcha ========================

  return (
    <section className="flex flex-col justify-center items-center">
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
              alt={registerText.logoTitle[lang]}
              className=" rounded-lg mb-1 hover:shadow-md hover:shadow-green-100"
            />
          </Link>
          <p className=" text-gray-400 "> {registerText.logoTitle[lang]} </p>
        </div>
        <h2 className="text-green-700 text-2xl font-bold mb-10">
          {" "}
          {registerText.title[lang]}{" "}
        </h2>
        <InputCustom
          name={"firstName"}
          label={registerText.firstName[lang]}
          formik={formik}
          dir={lang === "en" ? "ltr" : "rtl"}
        />
        <InputCustom
          name={"lastName"}
          label={registerText.lastName[lang]}
          formik={formik}
          dir={lang === "en" ? "ltr" : "rtl"}
        />
        <CustomMobileInput
          name={"mobile"}
          label={registerText.mobile[lang]}
          formik={formik}
          selected={selected}
          setSelected={setSelected}
          setCode={setCode}
          setCountry={setCountry}
          lang={lang}
          dir={lang === "en" ? "ltr" : "rtl"}
          isRequired={lang === "fa" ? true : false}
        />
        <InputCustom
          name={"email"}
          label={registerText.email[lang]}
          formik={formik}
          dir={lang === "en" ? "ltr" : "rtl"}
        />
        <InputPasswordCustom
          name={"password"}
          label={registerText.password[lang]}
          formik={formik}
          dir={lang === "en" ? "ltr" : "rtl"}
        />
        <InputPasswordCustom
          name={"confirmPassword"}
          label={registerText.confirmPassword[lang]}
          formik={formik}
          dir={lang === "en" ? "ltr" : "rtl"}
        />
        {/* ===== START ReCAPTCHA ===== */}
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
        {/* ===== / END ReCAPTCHA ===== */}
        <Button
          type="submit"
          isLoading={loading}
          className="
          py-2 h-14 w-full mb-10
          text-center text-white font-semibold
          hover:bg-green-300 bg-green-500 rounded-xl"
        >
          {" "}
          {registerText.btn[lang]}{" "}
        </Button>

        <div className="flex justify-between mb-4 drop-shadow-2xl">
          <p className="me-2 text-green-900 font-bold">
            {registerText.text1[lang]}
          </p>
          <Link
            href={`/${lang}/login`}
            className=" hover:text-green-300 text-green-500 font-bold underline"
          >
            {registerText.text2[lang]}
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
