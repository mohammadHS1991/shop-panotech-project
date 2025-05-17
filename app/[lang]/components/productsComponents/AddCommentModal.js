"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { addProductComment } from "../../reducers/productSlice";
import CustomToast from "../CustomToast";
import { useFormik } from "formik";
import TextAreaCustom from "../TextAreaCustom";
import { addProductCommentSchema } from "../../validations/formsValidation";
import { productText } from "../../data/data";
import { enAddProductCommentSchema } from "../../validations/enFormValidation";
import { arAddProductCommentSchema } from "../../validations/arFormValidation";

const AddCommentModal = ({ productId, lang }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitLoading, setSubmitLoading] = useState(false);
  const session = useSession();
  const author = session?.data?.user?.id;
  //? ======================  START useDispatch  ======================
  const dispatch = useDispatch();
  //? ======================= / END useDispatch =======================
  //? ============== START handleComment (use in formik) ==============
  const handleComment = async (values, productId, author, resetForm) => {
    if (session.status === "authenticated") {
      setSubmitLoading(true);
      const data = { productId, values, author };
      try {
        const res = await dispatch(addProductComment(data)).unwrap();
        CustomToast("success", "نظر شما با موفقیت ثبت شد");
        resetForm();
        onClose();
      } catch (err) {
        CustomToast("error", err);
      } finally {
        setSubmitLoading(false);
      }
    } else {
      CustomToast("error", " برای ثبت نظر باید وارد اکانت خود شوید ");
    }
  };
  //? ============== / END handleComment (use in formik) ==============
  //? ========================= START FORMIK ==========================
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema:
      (lang == "fa" && addProductCommentSchema) ||
      (lang == "en" && enAddProductCommentSchema) ||
      (lang == "ar" && arAddProductCommentSchema),
    onSubmit: (values, { resetForm }) => {
      handleComment(values, productId, author, resetForm);
    },
  });
  //? ========================= / END FORMIK ==========================

  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<MdAddCircle className="text-2xl" />}
        className="hidden xs:flex font-bold text-white bg-green-300 m-4 h-10"
      >
        {productText.commentBTN[lang]}
      </Button>
      <Button
        onPress={onOpen}
        isIconOnly
        className="xs:hidden font-bold text-white bg-green-300 m-4 h-10"
      >
        <MdAddCircle className="text-2xl" />
      </Button>

      <Modal
        isOpen={isOpen}
        size="2xl"
        placement="top"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b-2 border-green-700 m-4">
                <h1 className="font-bold text-lg text-green-800 capitalize">
                  {productText.text3[lang]}
                </h1>
              </ModalHeader>

              <ModalBody>
                <form onSubmit={formik.handleSubmit} className="mx-3 my-5">
                  <TextAreaCustom
                    name={"comment"}
                    label={productText.text4[lang]}
                    formik={formik}
                    dir={lang === "en" ? "ltr" : "rtl"}
                  />
                  <Button
                    color="success"
                    type="submit"
                    isLoading={submitLoading}
                    className="text-white text-lg font-bold w-full h-14"
                  >
                    {productText.commentBTN[lang]}
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCommentModal;
