'use client'

import { deleteNews } from '@/app/[lang]/reducers/newsSlice';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import CustomToast from '../../CustomToast';

const DeleteNewsModal = ({newsId}) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [submitLoading, setSubmitLoading] = useState(false);
//? ========================  START useDispatch  ========================
    const dispatch = useDispatch()
//? ========================  / END useDispatch  ========================
//? ========================= START handleDelete ========================
    const handleDelete = async newsId => {
        setSubmitLoading(true);
        try {
            await dispatch(deleteNews(newsId))
            CustomToast("success", "خبر با موفقیت حذف شد");
            onClose();
        } catch (error) {
            CustomToast("error", error);
        } finally {
            setSubmitLoading(false);
        }
    }
//? ======================== / END handleDelete =========================
    return (
       <>
            <Button
                variant="light" isIconOnly
                className='text-xl text-gray-400 hover:text-red-500'
                onPress={onOpen}
            >
                <MdDelete />
            </Button>

            <Modal isOpen={isOpen} size='xl' placement='top' onOpenChange={onOpenChange}
                scrollBehavior="inside"
                backdrop="blur"
            >
                <ModalContent>
                    <ModalBody className='bg-danger-50 rounded-2xl p-10'>
                        <p> آیا از حذف خبر مطمئن هستید؟ </p>
                        <Button
                        className='bg-danger-500 text-white font-bold w-full mt-8'
                        onClick={() => handleDelete(newsId)}
                        isLoading={submitLoading}
                        >
                        خبر حذف شود
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </> 
    );
};

export default DeleteNewsModal;