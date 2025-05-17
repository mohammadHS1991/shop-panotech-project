"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../validations/formsValidation";
import ChangePasswordFunction from "../../functions/ChangePasswordFunction";
import CustomToast from "../CustomToast";
import { changePassText, customTostText } from "../../data/data";
import { arResetPasswordSchema } from "../../validations/arFormValidation";
import { enResetPasswordSchema } from "../../validations/enFormValidation";
import { resetPassword } from "@/public/data/data";

const ResetPassword = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const params = useParams();
  const { lang, token } = params;

  //? check token validity from db
  useEffect(() => {
    const verifyToken = async () => {
      setSubmitLoading(true);
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_PANOTECH_BASE_URL + `/api/auth/verify-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              API_KEY: process.env.NEXT_PUBLIC_API_KEY,
            },
            body: JSON.stringify({ token }),
          }
        );

        if (res.status === 200) {
          setVerified(true);
          const userData = await res.json();
          setUser(userData);
        }

        if (res.status === 400) {
          CustomToast("warning", resetPassword[lang].status400);
          setVerified(false);
          router.replace(`/${lang}`);
        }

        if (res.status === 403) {
          CustomToast("error", resetPassword[lang].status403);
          router.replace(`/${lang}`);
        }

        if (res.status === 500) {
          CustomToast("error", resetPassword[lang].status500);
          router.replace(`/${lang}`);
        }
      } catch (error) {
        CustomToast("error", resetPassword[lang].status500);
        router.replace(`/${lang}`);
      } finally {
        setSubmitLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  //? ============================== START handelChangePassword =============================
  const handelChangePassword = async (values, resetForm) => {
    if (verified) {
      setSubmitLoading(true);
      try {
        const res = await ChangePasswordFunction({
          ...values,
          email: user?.email,
          lang,
        });
        CustomToast("success", customTostText.resetPassword.status200[lang]);
        resetForm();
        router.replace(`/${lang}/login`);
      } catch (err) {
        CustomToast("error", err);
      } finally {
        setSubmitLoading(false);
      }
    } else {
      CustomToast("warning", resetPassword[lang].status403);
    }
  };
  //? ============================== / END handelChangePassword =============================
  //? ================================ START useFormik ================================
  const formik = useFormik({
    initialValues: {
      // email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema:
      (lang == "fa" && resetPasswordSchema) ||
      (lang == "en" && enResetPasswordSchema) ||
      (lang == "ar" && arResetPasswordSchema),
    onSubmit: (values, { resetForm }) => {
      handelChangePassword(values, resetForm);
    },
  });
  //? ================================ / END useFormik ================================

  return (
    <>
      {verified && (
        <section className="flex flex-col justify-center items-center">
          <form
            onSubmit={formik.handleSubmit}
            className="w-11/12 sm:w-4/5 lg:w-3/5 xl:w-2/5 my-10 bg-gray-100 rounded-3xl shadow-xl py-10 flex flex-col justify-center items-center "
          >
            <div className="flex flex-col justify-center items-center mb-10">
              <Link href={`/${lang}`}>
                <Image
                  src="/images/panotech.jpg"
                  width={236}
                  height={48}
                  alt={changePassText.logoTitle[lang]}
                  className=" rounded-lg mb-1 hover:shadow-md hover:shadow-green-100"
                />
              </Link>
              <p className=" text-gray-400 ">
                {" "}
                {changePassText.logoTitle[lang]}{" "}
              </p>
            </div>
            <h2 className="text-green-700 text-2xl font-bold mb-10">
              {changePassText.title[lang]}
            </h2>
            {/* <input
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              placeholder={changePassText.email[lang]}
              className="p-2 mb-4 h-14 w-11/12 sm:w-3/4 rounded-lg"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500"> {formik.errors.email} </div>
            ) : null} */}
            <input
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              placeholder={changePassText.password[lang]}
              className="p-2 mb-4 h-14 w-11/12 sm:w-3/4 rounded-lg"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500"> {formik.errors.password} </div>
            ) : null}
            <input
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              placeholder={changePassText.confirmPassword[lang]}
              className="p-2 mb-4 h-14 w-11/12 sm:w-3/4 rounded-lg"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500">
                {" "}
                {formik.errors.confirmPassword}{" "}
              </div>
            ) : null}
            <Button
              type="submit"
              isLoading={submitLoading}
              className="pb-2 py-2 h-14 w-5/6 sm:w-3/4 mb-10 rounded-lg text-center text-white font-semibold hover:bg-green-300 bg-green-500"
              // onClick={ ()=>{ router.push(`/${lang}/login`) } }
            >
              {changePassText.btn[lang]}
            </Button>
          </form>
        </section>
      )}
    </>
  );
};

export default ResetPassword;
