"use client";

import React, { useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  Input,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createGallerySchema,
  orderEditStatusSchema,
} from "@/app/[lang]/validations/formsValidation";
import SelectBoxCustom from "../../SelectBoxCustom";
import { useSession } from "next-auth/react";
import { FaEdit } from "react-icons/fa";
import {
  editOrderStatus,
  selectOrderById,
} from "@/app/[lang]/reducers/orderSlice";
import CustomToast from "../../CustomToast";

const EditStatusModal = ({ orderId }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const session = useSession();
  const [submitLoading, setSubmitLoading] = useState(false);

  //? =============================  START useSelector  =============================
  const endCartItem = useSelector((state) => selectOrderById(state, orderId));
  //? =============================  / END useSelector  =============================
  //? ======================= START useDispatch =======================
  const dispatch = useDispatch();
  //? ======================= / END useDispatch =======================
  //? =============== START handleSubmit (use in formik) ==============
  const handleSubmit = async (values, orderId, resetForm) => {
    setSubmitLoading(true);
    const data = { values, orderId };
    try {
      const res = await dispatch(editOrderStatus(data)).unwrap();
      CustomToast("success", "تغییر وضعیت با موفقیت ثبت شد");
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
      status: endCartItem.status,
    },
    validationSchema: orderEditStatusSchema,
    onSubmit: (values, { resetForm }) =>
      handleSubmit(values, orderId, resetForm),
  });
  //? ========================= / END FORMIK ==========================
  return (
    <>
      <Button
        onPress={onOpen}
        variant="light"
        isIconOnly
        className="text-xl text-red-500 hover:text-red-300"
      >
        <FaEdit />
      </Button>

      <Modal
        isOpen={isOpen}
        size="2xl"
        placement="top"
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="border-b-2 border-green-700 m-4">
                <h1 className="font-bold text-lg text-green-800">
                  {" "}
                  تعیین وضعیت سفارش{" "}
                </h1>
              </ModalHeader>

              <ModalBody>
                <form onSubmit={formik.handleSubmit} className="xs:mx-3 mb-5">
                  <SelectBoxCustom
                    formik={formik}
                    label={" وضعیت سفارش "}
                    name={"status"}
                    selectItems={[
                      { id: 1, key: "waiting", value: " در انتظار تأیید " },
                      {
                        id: 2,
                        key: "inProgress",
                        value: " در حال آماده سازی ",
                      },
                      { id: 3, key: "completed", value: " ارسال شده " },
                      { id: 4, key: "canceled", value: " کنسل شده " },
                    ]}
                    defaultSelectedKeys={endCartItem.status}
                  />
                  <Button
                    color="success"
                    type="submit"
                    // onPress={onClose}
                    className="text-white text-lg font-bold w-full h-14 mt-5"
                    isLoading={submitLoading}
                  >
                    اعمال تغییرات
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

export default EditStatusModal;
