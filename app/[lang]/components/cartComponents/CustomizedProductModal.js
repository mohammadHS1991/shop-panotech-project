"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { customProductYupSchema } from "../../validations/formsValidation";
import InputCustom from "../InputCustom";
import TextAreaCustom from "../TextAreaCustom";
import { createCustomProduct } from "../../reducers/customProductSlice";
import { useParams } from "next/navigation";
import CustomMobileInput from "../CustomMobileInput";
import ReCAPTCHA from "react-google-recaptcha";
import CustomToast from "../CustomToast";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { customizedProductText } from "../../data/data";

const CustomizedProductModal = ({ cartItem }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [selected, setSelected] = useState("IR");
  const [code, setCode] = useState("+98");
  const [country, setCountry] = useState("ir");

  const session = useSession();
  const params = useParams();
  const lang = params.lang;
  const productId = cartItem.product._id;

  const text = customizedProductText.text; //text.text1[lang]
  const loginText = customizedProductText.loginText; //loginText.text1[lang]

  //? ======================= START useDispatch =======================
  const dispatch = useDispatch();
  //? ======================= / END useDispatch =======================
  //? =============== START handleSubmit (use in formik) ==============
  const handleSubmit = async (
    values,
    code,
    country,
    lang,
    productId,
    resetForm
  ) => {
    setSubmitLoading(true);
    const data = { values, code, country, lang, productId };
    try {
      const res = await dispatch(createCustomProduct(data)).unwrap();
      CustomToast("success", " درخواست شما با موفقیت ارسال شد ");
      resetForm();
      onClose();
    } catch (err) {
      CustomToast("error", err);
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
      job: "",
      mobile: "",
      email: "",
      message: "",
      address: "",
      postalCode: "",
      recaptcha: "",
    },
    validationSchema: customProductYupSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, code, country, lang, productId, resetForm);
    },
  });
  //? ========================= / END FORMIK ==========================
  //? ================ START getInnerWidthForRecaptcha ================
  const [innerWidth, setInnerWidth] = useState(window?.innerWidth);
  //   useEffect(() => {
  //     setInnerWidth(window.innerWidth);
  //   }, []);
  //? ================ / END getInnerWidthForRecaptcha ================
  return (
    <>
      {session.status == "authenticated" ? (
        <p className="me-2 text-green-700 font-bold text-xs text-center">
          {text.text1[lang]}
          <Button
            isIconOnly
            onPress={onOpen}
            radius="none"
            className="px-1 bg-white hover:text-green-300 text-green-500 font-bold underline"
          >
            {text.text2[lang]}
          </Button>
          {text.text3[lang]}
        </p>
      ) : (
        <p className="me-2 text-green-700 font-bold text-xs text-center">
          {loginText.text1[lang]}
          <Link
            href={`/${lang}/login`}
            className="px-1 bg-white hover:text-green-300 text-green-500 font-bold underline"
          >
            {loginText.text2[lang]}
          </Link>
          {loginText.text3[lang]}
        </p>
      )}

      <Modal
        isOpen={isOpen}
        size="xl"
        placement="top"
        backdrop="blur"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b-2 border-green-700 m-4">
                <h1 className="font-bold text-green-800 text-center">
                  {customizedProductText.customReqTitle[lang]}
                </h1>
              </ModalHeader>

              <ModalBody>
                <form onSubmit={formik.handleSubmit} className="mx-3 my-5">
                  <InputCustom
                    name={"firstName"}
                    label={customizedProductText.firstName[lang]}
                    formik={formik}
                  />
                  <InputCustom
                    name={"lastName"}
                    label={customizedProductText.lastName[lang]}
                    formik={formik}
                  />
                  <InputCustom
                    name={"job"}
                    label={customizedProductText.Job[lang]}
                    formik={formik}
                  />
                  <CustomMobileInput
                    name={"mobile"}
                    label={customizedProductText.ContactNumber[lang]}
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
                    label={customizedProductText.Email[lang]}
                    formik={formik}
                  />
                  <InputCustom
                    name={"address"}
                    label={customizedProductText.Address[lang]}
                    formik={formik}
                  />
                  <InputCustom
                    name={"postalCode"}
                    label={customizedProductText.ZipCode[lang]}
                    formik={formik}
                  />
                  <TextAreaCustom
                    name={"message"}
                    label={customizedProductText.Request[lang]}
                    formik={formik}
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
                        {" "}
                        {formik.errors.recaptcha}{" "}
                      </p>
                    )}
                  </div>
                  <Button
                    color="success"
                    type="submit"
                    // onPress={onClose}
                    isLoading={submitLoading}
                    className="text-white font-bold tracking-wide w-full h-14"
                  >
                    {customizedProductText.btn[lang]}
                  </Button>
                </form>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomizedProductModal;
