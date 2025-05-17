'use client'

import React, { useState } from 'react';
import {Modal, ModalContent, ModalBody, Button, useDisclosure, ModalHeader, ModalFooter} from "@nextui-org/react";
import { FaEdit } from 'react-icons/fa';
import { useFormik } from 'formik';
import { personalInfoSchema } from '@/app/[lang]/validations/formsValidation';
import InputCustom from '../../InputCustom';
import TextAreaCustom from '../../TextAreaCustom';
import { useDispatch } from 'react-redux';
import { editUserInfos } from '@/app/[lang]/reducers/userSlice';
import CustomMobileInput from '../../CustomMobileInput';
import { useParams } from 'next/navigation';
import CustomToast from '../../CustomToast';
import { accountInfoText, customTostText } from '@/app/[lang]/data/data';
import { enPersonalInfoSchema } from '@/app/[lang]/validations/enFormValidation';
import { arPersonalInfoSchema } from '@/app/[lang]/validations/arFormValidation';

const EditUserInfoModal = ({user}) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [selected, setSelected] = useState("IR");
    const [code, setCode] = useState(user?.countryCode);
    const [country, setCountry] = useState(user?.country);
    const [submitLoading, setSubmitLoading] = useState(false);
    const params = useParams();
    const lang = params.lang;

//? ======================= START useDispatch =======================
    const dispatch = useDispatch()
//? ======================= / END useDispatch =======================
//? ============= START handleUpdateUser (use in formik) ============
  const handleUpdateUser = async ( values, code, country, userId, resetForm ) => {
    setSubmitLoading(true);
    const data = { values, code, country, userId };
    try {
      const res = await dispatch(editUserInfos(data)).unwrap();
      CustomToast("success", customTostText.userInfo.Success[lang]);
      resetForm();
      onClose();
    } catch (err) {
      CustomToast("error", customTostText.userInfo.Err[lang]);
    } finally {
      setSubmitLoading(false);
    }
  };
//? ============= / END handleUpdateUser (use in formik) ============
//? ========================= START FORMIK ==========================    
    const formik = useFormik({
        initialValues:{
            firstName: user?.firstName,
            lastName: user?.lastName,
            field: user?.field,
            job: user?.job,
            mobile: user?.mobile,
            postalCode: user?.postalCode,
            address: user?.address,
        },
        validationSchema:
            lang == 'fa' && personalInfoSchema ||
            lang == 'en' && enPersonalInfoSchema ||
            lang == 'ar' && arPersonalInfoSchema,
        onSubmit:(values,{resetForm})=>{
            handleUpdateUser(values, code, country, user._id, resetForm)
        }
    })
//? ========================= / END FORMIK ==========================
    return (
        <>
            <Button onPress={onOpen} radius="none" isIconOnly
                className=" bg-white text-gray-400 hover:text-gray-900 text-xl"
            >
                <FaEdit />
            </Button>
            
            
            <Modal isOpen={isOpen} size='2xl' placement='top'
                onOpenChange={onOpenChange}
                backdrop="blur"
                scrollBehavior="inside"
            >
                
                <ModalContent>
                    {(onClose) => (
                    <>
                        <ModalHeader className='border-b-2 border-green-700 m-4'>
                            <h1 className='font-bold text-lg text-green-800'>{accountInfoText.AccountInfo[lang]}</h1>
                        </ModalHeader>

                        <ModalBody>
                            <form  onSubmit={formik.handleSubmit} className='xs:mx-3 my-5'>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <div className='w-full md:w-1/2'>
                                    <InputCustom name={'firstName'} label={accountInfoText.firstName[lang]} formik={formik} defaultValue={user.firstName}/>
                                    </div>
                                    <div className='w-full md:w-1/2'>
                                    <InputCustom name={'lastName'} label={accountInfoText.lastName[lang]} formik={formik} defaultValue={user.lastName}/>
                                    </div>
                                </div>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <div className='w-full md:w-1/2'>
                                    <InputCustom name={'field'} label={accountInfoText.Field[lang]} formik={formik} defaultValue={user.field}/>
                                    </div>
                                    <div className='w-full md:w-1/2'>
                                    <InputCustom name={'job'} label={accountInfoText.Job[lang]} formik={formik} defaultValue={user.job}/>
                                    </div>
                                </div>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <div className='w-full md:w-1/2'>
                                    <CustomMobileInput name={"mobile"} label={accountInfoText.Number[lang]} formik={formik}
                                        selected={selected} setSelected={setSelected} setCode={setCode} setCountry={setCountry} defaultValue={user.mobile}
                                        lang={lang} dir={lang === "en" ? "ltr" : "rtl"} isRequired={lang === "fa" ? true : false}
                                    />
                                    </div>
                                    <div className='w-full md:w-1/2'>
                                    <InputCustom name={'postalCode'} label={accountInfoText.ZipCode[lang]} formik={formik} defaultValue={user.postalCode}/>
                                    </div>
                                </div>
                                <TextAreaCustom name={'address'} label={accountInfoText.Address[lang]} formik={formik} defaultValue={user.address}/>
                                <Button
                                    color="success" type='submit'
                                    // onPress={onClose}
                                    isLoading={submitLoading}
                                    className='text-white text-lg font-bold w-full h-14'
                                >
                                    {accountInfoText.BTN[lang]}
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

export default EditUserInfoModal;