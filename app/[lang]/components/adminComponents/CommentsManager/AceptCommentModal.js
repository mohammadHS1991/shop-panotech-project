'use client'

import { editProductComment } from '@/app/[lang]/reducers/productSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomToast from '../../CustomToast';
import { useFormik } from 'formik';
import { editProductCommentSchema } from '@/app/[lang]/validations/formsValidation';
import { Button, Modal, ModalBody, ModalContent, Radio, RadioGroup, useDisclosure } from '@nextui-org/react';

const AceptCommentModal = ({comment, productId}) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [submitLoading, setSubmitLoading] = useState(false);

//? ============================ START useDispatch ============================
    const dispatch=useDispatch()
//? ============================ / END useDispatch ============================
//? ============== START handleAccept (use in formik) ==============
    const handleAccept = async (values, productId, commentId, resetForm) => {
        setSubmitLoading(true);
        const data = {values, commentId, productId}
        try {
            const res = await dispatch(editProductComment(data)).unwrap();
            CustomToast("success", "نظر تایید شد");
            resetForm();
            onClose();
        } catch (err) {
            CustomToast("error", err);
        } finally {
            setSubmitLoading(false);
        }
    };
//? ============== / END handleAccept (use in formik) ==============
//? ========================= START FORMIK ==========================
    const formik = useFormik({
        initialValues:{
            status: comment.status,
        },
        validationSchema:editProductCommentSchema,
        onSubmit:(values, { resetForm }) => {
            handleAccept(values, productId, comment._id, resetForm);
        }
    })
//? ========================= / END FORMIK ==========================

    return (
        <>
            <Button onPress={onOpen}
                className={`
                    bg-green-500 text-white
                    ${comment.status && 'hidden'}
                `}
            >
                تایید نظر
            </Button>

            <Modal isOpen={isOpen} size='2xl' placement='top' onOpenChange={onOpenChange}
                scrollBehavior="inside"
                backdrop="blur"
            >
                <ModalContent>
                    <>
                        <ModalBody className='bg-danger-50'>
                            <form onSubmit={formik.handleSubmit} className='px-4 py-6'>
                                <RadioGroup
                                    id='status' name='status'
                                    color="success" orientation="horizontal"
                                    defaultValue={comment.status}
                                    label=" جهت تغییر نقش کاربر یک گزینه را انتخاب کنید "
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}                                    
                                    errorMessage={formik.touched.status && formik.errors.status}
                                    isInvalid={formik.touched.status && formik.errors.status ? true : false}
                                >
                                    <Radio value={false}> تایید نشده </Radio>
                                    <Radio value={true}> مورد تایید است </Radio>
                                </RadioGroup>
                                <Button
                                    isLoading={submitLoading} type='submit'
                                    className='bg-danger-500 text-white font-bold w-full mt-8'
                                >
                                    تایید نظر
                                </Button>
                            </form>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </>
      );
};

export default AceptCommentModal;