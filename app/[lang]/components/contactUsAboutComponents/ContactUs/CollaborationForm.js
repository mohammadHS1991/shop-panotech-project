"use client";

import { Button, Image, Input } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import CustomToast from "../../CustomToast";
import { checkExistFolder, uploadFileFsLess } from "@/app/[lang]/utils";
import { cooperationSchema } from "@/app/[lang]/validations/formsValidation";
import { useDispatch } from "react-redux";
import { createCooperation } from "@/app/[lang]/reducers/cooperationSlice";
import { useFormik } from "formik";
import InputCustom from "../../InputCustom";
import TextAreaCustom from "../../TextAreaCustom";
import ReCAPTCHA from "react-google-recaptcha";
import CustomMobileInput from "../../CustomMobileInput";
import {
  contactUsText,
  customTostText,
  homeText,
} from "@/app/[lang]/data/data";
import { arCooperationSchema } from "@/app/[lang]/validations/arFormValidation";
import { enCooperationSchema } from "@/app/[lang]/validations/enFormValidation";

const CollaborationForm = ({ lang, title }) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [filesNames, setFilesNames] = useState([]);
  const [selected, setSelected] = useState("IR");
  const [code, setCode] = useState("+98");
  const [country, setCountry] = useState("ir");
  const fileInput = useRef(null);

  //? ======================  START useDispatch  ======================
  const dispatch = useDispatch();
  //? ======================= / END useDispatch =======================
  //? ======== START handleFileUpload (use in file upload btn) ========
  const handleFileUpload = async (
    e,
    inputRef,
    site,
    category,
    itemName,
    itemType
  ) => {
    e.preventDefault();
    setUploadLoading(true);
    setFilesNames([]);
    const date = new Date();
    const folderNumber = `${date.getFullYear()}${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}${
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    }${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}${
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    }`;

    try {
      await checkExistFolder(
        site,
        category,
        itemName,
        itemType,
        false,
        folderNumber
      );
      const files = Object.values(inputRef?.current?.files);
      files.forEach(async (file, index) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadFileFsLess(
          formData,
          site,
          category,
          itemName,
          itemType,
          index + 1,
          folderNumber
        );
        if (res === "error") {
          CustomToast("error", customTostText.contactUs.upload.Err[lang]);
        } else {
          CustomToast("success", customTostText.contactUs.upload.Success[lang]);
          setFilesNames((prev) => {
            return [...prev, res];
          });
        }
      });
      fileInput.current.value = "";
    } catch (err) {
      CustomToast("error", customTostText.contactUs.upload.Err[lang]);
    } finally {
      setUploadLoading(false);
    }
  };
  //? ======== / END handleFileUpload (use in file upload btn) ========
  //? =============== START handleSubmit (use in formik) ==============
  const handleSubmit = async (values, filesNames, code, country, resetForm) => {
    setSubmitLoading(true);
    const data = { values, filesNames, code, country };
    try {
      const res = await dispatch(createCooperation(data)).unwrap();
      CustomToast("success", customTostText.contactUs.submit.Success[lang]);
      resetForm();
    } catch (err) {
      CustomToast("error", customTostText.contactUs.submit.Err[lang]);
    } finally {
      setSubmitLoading(false);
    }
  };
  //? =============== / END handleSubmit (use in formik) ==============
  //? ========================= START FORMIK ==========================
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      job: "",
      message: "",
      resume: "",
      recaptcha: "",
    },
    validationSchema:
      (lang == "fa" && cooperationSchema) ||
      (lang == "en" && enCooperationSchema) ||
      (lang == "ar" && arCooperationSchema),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, filesNames, code, country, resetForm);
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
    <form
      onSubmit={formik.handleSubmit}
      className="
      md:w-3/4 px-2 xs:px-5 md:px-10 lg:px-16 py-10 m-2 xs:m-5 md:m-0
      bg-gray-100 rounded-xl shadow-xl
      flex flex-col justify-center items-center"
    >
      <header className="flex flex-col justify-center items-center mb-10">
        <Image
          // src="/images/panotechFa.jpg"
          src="/images/panotechFa.png"
          height={48}
          alt=" پانوتک "
          className=" rounded-lg mb-1 "
        />
        {/* <p className=" text-gray-400 "> {homeText.panotech[lang]} </p> */}
      </header>
      <h2 className="text-green-700 text-2xl font-bold"> {title} </h2>
      <div className="xs:flex gap-2 w-full">
        <InputCustom
          name={"firstName"}
          label={contactUsText.firstName[lang]}
          formik={formik}
          variant={"bordered"}
          dir={lang === "en" ? "ltr" : "rtl"}
        />
        <InputCustom
          name={"lastName"}
          label={contactUsText.lastName[lang]}
          formik={formik}
          variant={"bordered"}
          dir={lang === "en" ? "ltr" : "rtl"}
        />
      </div>
      <div className="xs:flex gap-2 w-full">
        <CustomMobileInput
          name={"mobile"}
          label={contactUsText.mobileNumber[lang]}
          formik={formik}
          variant={"bordered"}
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
          label={contactUsText.email[lang]}
          formik={formik}
          variant={"bordered"}
          dir={lang === "en" ? "ltr" : "rtl"}
        />
      </div>
      <div className="flex w-full">
        <InputCustom
          name={"job"}
          label={contactUsText.job[lang]}
          formik={formik}
          variant={"bordered"}
          isRequired={false}
          dir={lang === "en" ? "ltr" : "rtl"}
        />
      </div>
      <div className="flex w-full">
        <TextAreaCustom
          name={"message"}
          label={contactUsText.request[lang]}
          formik={formik}
          variant={"bordered"}
          dir={lang === "en" ? "ltr" : "rtl"}
        />
      </div>
      {/* ========== START input file ========== */}
      <div className="flex justify-center items-center">
        <Input
          id="resume"
          name="resume"
          ref={fileInput}
          accept=".pdf"
          type="file"
          label={
            (lang == "fa" && "لطفا یک فایل انتخاب کنید ") ||
            (lang == "en" && "Please select a file.") ||
            (lang == "ar" && "الرجاء اختيار الملف.")
          }
          onChange={(e) => {
            formik.setFieldValue("resume", Object.values(e.target.files));
          }}
          onBlur={formik.handleBlur}
          className="my-5"
          errorMessage={formik.touched.resume && formik.errors.resume}
          isInvalid={formik.touched.resume && formik.errors.resume}
          isDisabled={
            formik.values.email == "" || formik.values.recaptcha == ""
          }
        />
        <Button
          color="success"
          variant="shadow"
          type="button"
          isLoading={uploadLoading}
          isDisabled={
            formik.values.email == "" || formik.values.recaptcha == ""
          }
          onClick={async (e) => {
            await handleFileUpload(
              e,
              fileInput,
              "panotech",
              "collaboration",
              formik.values.email
                ? formik.values.email.split("@")[0].replaceAll(/[._-]/g, "")
                : String(Math.ceil(Math.random() * 1000000)),
              "files"
            );
          }}
        >
          {(lang == "fa" && "اضافه کردن رزومه") ||
            (lang == "en" && "Add resume") ||
            (lang == "ar" && "أضف السيرة الذاتية")}
        </Button>
      </div>
      <p
        className={`font-thin text-sm text-red-500 mb-5
          ${
            formik.values.email == "" || formik.values.recaptcha == ""
              ? "flex"
              : "hidden"
          }
        `}
      >
        {contactUsText.fileText[lang]}
      </p>
      {/* ========== /END input file ========== */}
      {/* ========== START ReCAPTCHA ========== */}
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
          <p className="mt-2 text-warning text-xs">{formik.errors.recaptcha}</p>
        )}
      </div>
      {/* ========== /END ReCAPTCHA ========== */}
      {/* ========== START submit BTN ========== */}
      <div className="flex w-full">
        <Button
          type="submit"
          isLoading={submitLoading}
          className="m-2 h-14 w-full rounded-lg text-center text-white font-semibold hover:bg-green-300 bg-green-500"
        >
          {contactUsText.sendBTN[lang]}
        </Button>
      </div>
      {/* ========== /END submit BTN ========== */}
    </form>
  );
};

export default CollaborationForm;
