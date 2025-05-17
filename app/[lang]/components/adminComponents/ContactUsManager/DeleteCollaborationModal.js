"use client";

import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CustomToast from "../../CustomToast";
import { deleteCooperation } from "@/app/[lang]/reducers/cooperationSlice";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteCollaborationModal = ({ commentId }) => {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [submitLoading, setSubmitLoading] = useState(false);
//? ========================  START useDispatch  ========================
  const dispatch = useDispatch()
//? ========================  / END useDispatch  ========================
//? ========================  START handleDelete  ========================
  const handleDelete = async commentId => {
    setSubmitLoading(true);
    try {
      await dispatch(deleteCooperation(commentId))
      CustomToast("success", "درخواست با موفقیت حذف شد");
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
        variant="light" isIconOnly
        className='text-xl text-gray-400 hover:text-red-500'
        onPress={onOpen}
      >
        <FaRegTrashAlt/>
      </Button>

      <Modal isOpen={isOpen} size='xl' placement='top' onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          <ModalBody className='bg-danger-50 rounded-2xl p-10'>
            <p> آیا از حذف درخواست مطمئن هستید؟ </p>
            <Button
              className='bg-danger-500 text-white font-bold w-full mt-8'
              onClick={() => handleDelete(commentId)}
              isLoading={submitLoading}
            >
              درخواست حذف شود
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteCollaborationModal;
