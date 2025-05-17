"use client";

import { deleteProduct } from "@/app/[lang]/reducers/productSlice";
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import CustomToast from "../../CustomToast";

const DeleteProductModal = ({ productId }) => {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [submitLoading, setSubmitLoading] = useState(false);
  //? ========================  START useDispatch  ========================
  const dispatch = useDispatch();
  //? ========================  / END useDispatch  ========================
  //? ========================  START handleDelete  ========================
  const handleDeleteProduct = async productId => {
    setSubmitLoading(true);
    try {
      await dispatch(deleteProduct(productId));
      CustomToast("success", "محصول با موفقیت حذف شد");
      onClose();
    } catch (error) {
        CustomToast("error", error);
    } finally {
      setSubmitLoading(false);
    }
  }
  //? ========================  / END handleDelete  ========================

  return (
    <>
      <Button
        variant="light"
        isIconOnly
        onPress={onOpen}
        // onClick={() => handleDeleteProduct(productId)}
        className="text-xl text-gray-400 hover:text-red-500"
      >
        <MdDelete />
      </Button>

      <Modal isOpen={isOpen} size='xl' placement='top' onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          <ModalBody className='bg-danger-50 rounded-2xl p-10'>
            <p> آیا از حذف محصول مطمئن هستید؟ </p>
            <Button
              className='bg-danger-500 text-white font-bold w-full mt-8'
              onClick={() => handleDeleteProduct(productId)}
              isLoading={submitLoading}
            >
              محصول حذف شود
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
