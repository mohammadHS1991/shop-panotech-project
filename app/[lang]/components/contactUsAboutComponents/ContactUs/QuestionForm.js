"use client";

import { createQuestion } from "@/app/[lang]/reducers/questionSlice";
import { Button, Image, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import InputCustom from "../../InputCustom";
import TextAreaCustom from "../../TextAreaCustom";
import { questionSchema } from "@/app/[lang]/validations/formsValidation";
import { checkExistFolder, uploadImageFsLess } from "@/app/[lang]/utils";
import CustomToast from "../../CustomToast";
import ReCAPTCHA from "react-google-recaptcha";
import CustomMobileInput from "../../CustomMobileInput";
import {
  contactUsText,
  customTostText,
  homeText,
} from "@/app/[lang]/data/data";
import { arQuestionSchema } from "@/app/[lang]/validations/arFormValidation";
import { enQuestionSchema } from "@/app/[lang]/validations/enFormValidation";

const QuestionForm = ({ lang, title }) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagesNames, setImagesNames] = useState([]);
  const [selected, setSelected] = useState("IR");
  const [code, setCode] = useState("+98");
  const [country, setCountry] = useState("ir");
  const imageInput = useRef(null);

  //? ======================  START useDispatch  ======================
  const dispatch = useDispatch();
  //? ======================= / END useDispatch =======================
  //? ======== START handleImageUpload (use in img upload btn) ========
  const handleUpload = async (
    e,
    inputRef, //* image input with useRef
    site, //* panotech (hardCode)
    category, //* for exp. :( gallery, events, news ... )
    itemName, //* slug (create with title)
    itemType, //* for exp. :( images, videos ... )
    stateSetter //* name and size of images
  ) => {
    setUploadLoading(true);
    e.preventDefault();
    stateSetter([]);
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

        if (itemType === "images") {
          const res = await uploadImageFsLess(
            formData,
            site,
            category,
            itemName,
            itemType,
            index + 1,
            null,
            null,
            folderNumber
          );
          if (res === "error") {
            CustomToast("error", customTostText.contactUs.upload.Err[lang]);
          } else {
            CustomToast(
              "success",
              customTostText.contactUs.upload.Success[lang]
            );
            stateSetter((prev) => {
              return [...prev, res];
            });
          }
        }
      });
      imageInput.current.value = "";
    } catch (err) {
      CustomToast("error", customTostText.contactUs.upload.Err[lang]);
    } finally {
      setUploadLoading(false);
    }
  };
  //? ======== / END handleImageUpload (use in img upload btn) ========
  //? =============== START handleSubmit (use in formik) ==============
  const handleSubmit = async (
    values,
    imagesNames,
    code,
    country,
    resetForm
  ) => {
    setSubmitLoading(true);
    const data = { values, imagesNames, code, country };
    try {
      const res = await dispatch(createQuestion(data)).unwrap();
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
      images: "",
      recaptcha: "",
    },
    validationSchema:
      (lang == "fa" && questionSchema) ||
      (lang == "en" && enQuestionSchema) ||
      (lang == "ar" && arQuestionSchema),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, imagesNames, code, country, resetForm);
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
      flex flex-col justify-center items-center "
    >
      <div className="flex flex-col justify-center items-center mb-10">
        <Image
          src="/images/panotechFa.png"
          height={48}
          alt=" پانوتک "
          className=" rounded-lg mb-1 "
        />
      </div>
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
          id="images"
          name="images"
          ref={imageInput}
          accept=".png, .jpg, .jpeg"
          type="file"
          label={contactUsText.file[lang]}
          // defaultValue={}
          onChange={(e) => {
            formik.setFieldValue("images", Object.values(e.target.files));
          }}
          onBlur={formik.handleBlur}
          className="my-5"
          errorMessage={formik.touched.images && formik.errors.images}
          isInvalid={formik.touched.images && formik.errors.images}
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
            await handleUpload(
              e,
              imageInput, //! image input with useRef
              "panotech", //! panotech (hardCode)
              "questions", //! for exp. :( gallery, events, news ... )
              //! slug (create with title)
              formik.values.email
                ? formik.values.email.split("@")[0].replaceAll(/[._-]/g, "")
                : String(Math.ceil(Math.random() * 1000000)),
              "images", //! for exp. :( images, videos ... )
              setImagesNames //! name and size of images
            );
          }}
        >
          {contactUsText.uploadBTN[lang]}
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
      {/* ========== / END input file ========== */}
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
      {/* ========== / END ReCAPTCHA ========== */}
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
      {/* ========== / END submit BTN ========== */}
      {/* ========== START Maybe someone asked txt ========== */}
      <div className="flex justify-between mt-4 drop-shadow-2xl">
        <p className="text-green-900 font-bold">
          {(lang == "fa" && "شاید قبلا کسی") ||
            (lang == "en" && "Maybe someone has asked") ||
            (lang == "ar" && "ربما سأل أحدهم")}
        </p>
        <Link
          href={`/${lang}/faq`}
          className="px-1 hover:text-green-300 text-green-500 font-bold underline"
        >
          {(lang == "fa" && "این سوال") ||
            (lang == "en" && "this question") ||
            (lang == "ar" && "هذا السؤال")}
        </Link>
        <p className="text-green-900 font-bold">
          {(lang == "fa" && "را پرسیده باشد.") ||
            (lang == "en" && "before.") ||
            (lang == "ar" && "من قبل.")}
        </p>
      </div>
      {/* ========== / END Maybe someone asked txt ========== */}
    </form>
  );
};

export default QuestionForm;
