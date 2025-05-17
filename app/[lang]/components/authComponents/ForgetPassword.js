"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { forgetPasswordSchema } from "../../validations/formsValidation";
import CustomToast from "../CustomToast";
import RegidterFunction from "../../functions/RegisterFunction";
import ForgetPasswordFunction from "../../functions/ForgoetPasswordFunction";
import Link from "next/link";
import { customTostText, forgetPassText } from "../../data/data";
import { arForgetPasswordSchema } from "../../validations/arFormValidation";
import { enForgetPasswordSchema } from "../../validations/enFormValidation";

const ForgetPassword = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { lang } = params;

  //? ============================== START handelSubmit =============================
  const handelSubmit = async (values, resetForm) => {
    setSubmitLoading(true);
    const data = { values, lang };
    try {
      const res = await ForgetPasswordFunction(data);
      CustomToast("success", customTostText.forgetPassword.status200[lang]);
      resetForm();
      router.replace(`/${lang}`);
    } catch (err) {
      CustomToast("error", err);
    } finally {
      setSubmitLoading(false);
    }
  };
  //? ============================== / END handelSubmit =============================
  //? ================================ START useFormik ================================
  const formik = useFormik({
    initialValues: {
      email: "",
      recaptcha: "",
    },
    validationSchema:
      (lang == "fa" && forgetPasswordSchema) ||
      (lang == "en" && enForgetPasswordSchema) ||
      (lang == "ar" && arForgetPasswordSchema),
    onSubmit: (values, { resetForm }) => {
      handelSubmit(values, resetForm);
    },
  });
  //? ================================ / END useFormik ================================

  return (
    <section className="flex flex-col justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="w-11/12 sm:w-4/5 lg:w-3/5 xl:w-2/5 my-10 py-10
                bg-gray-100 rounded-3xl shadow-xl 
                flex flex-col justify-center items-center "
      >
        <div className="flex flex-col justify-center items-center mb-10">
          <Link href={`/${lang}`}>
            <Image
              src="/images/panotech.jpg"
              width={236}
              height={48}
              alt={forgetPassText.logoTitle[lang]}
              className=" rounded-lg mb-1 hover:shadow-md hover:shadow-green-100"
            />
          </Link>
          <p className=" text-gray-400 "> {forgetPassText.logoTitle[lang]} </p>
        </div>
        <h2 className="text-green-700 text-2xl font-bold mb-10">
          {" "}
          {forgetPassText.title[lang]}{" "}
        </h2>
        <input
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="email"
          placeholder={forgetPassText.email[lang]}
          className="p-2 mb-4 h-14 w-11/12 sm:w-3/4 rounded-lg"
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500"> {formik.errors.email} </div>
        ) : null}
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
          isLoading={submitLoading}
          className="pb-2 py-2 h-14 w-5/6 sm:w-3/4 mb-10 rounded-lg text-center text-white font-semibold hover:bg-green-300 bg-green-500"
        >
          {forgetPassText.btn[lang]}
        </Button>
        <div className="w-5/6 sm:w-3/4 flex justify-center mb-4">
          <p className="me-2 text-green-900 font-bold text-center drop-shadow-2xl leading-8">
            {forgetPassText.text1[lang]}
          </p>
        </div>
      </form>
    </section>
  );
};

export default ForgetPassword;
