'use client'

import React, { useState } from 'react';
import {Modal, ModalContent, ModalBody, Button, useDisclosure, ModalHeader, RadioGroup, Radio, Divider, ModalFooter} from "@nextui-org/react";
import { useFormik } from 'formik';
import { FaRegEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { editFaq } from '@/app/[lang]/reducers/faqSlice';
import CustomToast from '../../CustomToast';
import { createFAQuestionSchema } from '@/app/[lang]/validations/formsValidation';
import InputCustom from '../../InputCustom';
import TextAreaCustom from '../../TextAreaCustom';

const EditFaqModal = ({FAQ, lang}) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [submitLoading, setSubmitLoading] = useState(false);
    
//? ========================  START useDispatch  ========================
    const dispatch = useDispatch()
//? ========================  / END useDispatch  ========================
//? =============== START handleSubmit (use in formik) ==============
    const handleSubmit = async (values,faqId,resetForm) => {
        setSubmitLoading(true);
        const data = { values, faqId };
        try {
        const res = await dispatch(editFaq(data)).unwrap();
        CustomToast("success", " تغییرات با موفقیت اعمال شد");
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
        initialValues:{
            faTitle: FAQ.title.fa,
            faBody: FAQ.body.fa,
            enTitle: FAQ.title.en,
            enBody: FAQ.body.en,
            arTitle: FAQ.title.ar,
            arBody: FAQ.body.ar,
            status: FAQ.status,
        },
        validationSchema:createFAQuestionSchema,
        onSubmit:(values, { resetForm }) => {
        handleSubmit(values, FAQ._id, resetForm);
        }
})
//? ========================= / END FORMIK ==========================

    return (
        <>
            <Button onPress={onOpen} variant="light" isIconOnly
                className='text-lg text-gray-400 hover:text-green-500'
            >
                <FaRegEdit />
            </Button>
            
            
            <Modal isOpen={isOpen} size='2xl' placement='top'
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                backdrop="blur"
            >
                
                <ModalContent>
                    {(onClose) => (
                    <>
                        <ModalHeader className='border-b-2 border-green-700 m-4'>
                            <h1 className='font-bold text-lg text-green-800'> اصلاح سوال </h1>
                        </ModalHeader>
                        
                        <ModalBody>
                            <form  onSubmit={formik.handleSubmit} className='mx-3 my-5'>
                                <InputCustom name={'faTitle'} label={' عنوان فارسی سوال '} formik={formik} defaultValue={FAQ.title.fa}/>
                                <TextAreaCustom name={'faBody'} label={' متن فارسی سوال '} formik={formik} defaultValue={FAQ.body.fa}/>
                                <Divider className="my-4" />

                                <InputCustom name={'enTitle'} label={' عنوان انگلیسی سوال '} formik={formik} defaultValue={FAQ.title.en}/>
                                <TextAreaCustom name={'enBody'} label={' متن انگلیسی سوال '} formik={formik} defaultValue={FAQ.body.en}/>
                                <Divider className="my-4" />

                                <InputCustom name={'arTitle'} label={' عنوان عربی سوال '} formik={formik} defaultValue={FAQ.title.ar}/>
                                <TextAreaCustom name={'arBody'} label={' متن عربی سوال '} formik={formik} defaultValue={FAQ.body.ar}/>
                                <Divider className="my-4" />
                                
                                <RadioGroup
                                    id='status' name='status' label=" وضعیت سوال را انتخاب کنید "
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    color="success" orientation="horizontal"
                                    className='m-4 pr-4'
                                    defaultValue={FAQ.status}
                                >
                                    <Radio value="enable" className='text-green-800'> فعال </Radio>
                                    <Radio value="disable" className='text-green-800'> غیرفعال </Radio>
                                </RadioGroup>
                                {formik.touched.status && formik.errors.status ? (<div className='text-red-500'>{formik.errors.status}</div>) : null}
                                <Button color="success" type='submit'
                                    isLoading={submitLoading}
                                    // onPress={onClose}
                                    className='text-white text-lg font-bold w-full h-14'
                                >
                                    اعمال تغییرات
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

export default EditFaqModal;