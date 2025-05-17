'use client'

import React from 'react';
import {Modal, ModalContent, ModalBody, Button, useDisclosure, Input, ModalHeader} from "@nextui-org/react";
import { FaEdit } from 'react-icons/fa';
import { useFormik } from 'formik';
import { addressSchema } from '@/app/[lang]/validations/accountInformationValidation/addressValidation';

const SendAddressModal = ({sendAddress, handleSendAddress}) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    const formik = useFormik({
        initialValues:{
            name:' مهدی هاشمی ',
            city:' شهرری ',
            address:' آوینی-کریمی شیرازی-پلاک 5 ',
            postalCode:579761211,
        },
        validationSchema:addressSchema,
        onSubmit:values=>{
            handleSendAddress(values)
        }
    })

    return (
        <>
            <Button onPress={onOpen} radius="none" startContent={<FaEdit/>}
                className=" bg-white text-gray-400 hover:text-gray-900 text-lg"
            >
                ویرایش
            </Button>
            
            
            <Modal isOpen={isOpen} size='2xl' placement='top' onOpenChange={onOpenChange}>
                
                <ModalContent>
                    {(onClose) => (
                    <>
                        <ModalHeader className='border-b-2 border-green-700 m-4'>
                            <h1 className='font-bold text-lg text-green-800'> ثبت آدرس ارسال محصول </h1>
                        </ModalHeader>

                        <ModalBody>
                            <form  onSubmit={formik.handleSubmit} className='mx-3 my-5'>
                                <Input
                                    id='name' name='name'
                                    isClearable type="text" label=" نام گیرنده "
                                    defaultValue={sendAddress.name}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    className='my-5'
                                />
                                {formik.touched.name && formik.errors.name ? (<div className='text-red-500'>{formik.errors.name}</div>) : null}
                                <Input
                                    id='city' name='city'
                                    isClearable type="text" label=" شهر مقصد "
                                    defaultValue={sendAddress.city}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    className='my-5'
                                />
                                {formik.touched.city && formik.errors.city ? (<div className='text-red-500'>{formik.errors.city}</div>) : null}
                                <Input
                                    id='address' name='address'
                                    isClearable type="text" label=" آدرس مرسوله "
                                    defaultValue={sendAddress.address}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    className='my-5'
                                />
                                {formik.touched.address && formik.errors.address ? (<div className='text-red-500'>{formik.errors.address}</div>) : null}
                                <Input
                                    id='postalCode' name='postalCode'
                                    isClearable type="number" label=" کد پستی "
                                    defaultValue={sendAddress.postalCode}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    className='my-5'
                                />
                                {formik.touched.postalCode && formik.errors.postalCode ? (<div className='text-red-500'>{formik.errors.postalCode}</div>) : null}
                                <Button
                                    color="success" type='submit'
                                    onPress={onClose}
                                    className='text-white text-lg font-bold w-full h-14'
                                >
                                    ثبت آدرس
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

export default SendAddressModal;