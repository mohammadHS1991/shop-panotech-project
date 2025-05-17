'use client'

import { deleteFaq } from '@/app/[lang]/reducers/faqSlice';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import CustomToast from '../../CustomToast';

const DeleteFaqModal = ({ faqId }) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [submitLoading, setSubmitLoading] = useState(false);
//? ========================  START useDispatch  ========================
    const dispatch = useDispatch()
//? ======================= / END useDispatch =======================
//? ======================  START handleDelete  =====================
    const handleDelete = async faqId => {
        setSubmitLoading(true);
        try {
            await dispatch(deleteFaq(faqId))
            CustomToast("success", "سوال با موفقیت حذف شد");
            onClose();
        } catch (error) {
            CustomToast("error", error);
        } finally {
            setSubmitLoading(false);
        }
    }
//? ======================  / END handleDelete  =====================
    return (
        <>
            <Button
                variant="light" isIconOnly
                className='text-lg text-gray-400 hover:text-red-500'
                onPress={onOpen}
            >
                <FaTrashAlt />
            </Button>

            <Modal isOpen={isOpen} size='xl' placement='top' onOpenChange={onOpenChange}
                scrollBehavior="inside"
                backdrop="blur"
            >
                <ModalContent>
                    <ModalBody className='bg-danger-50 rounded-2xl p-10'>
                        <p> آیا از حذف سوال مطمئن هستید؟ </p>
                        <Button
                        className='bg-danger-500 text-white font-bold w-full mt-8'
                        onClick={() => handleDelete(faqId)}
                        isLoading={submitLoading}
                        >
                        سوال حذف شود
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteFaqModal;