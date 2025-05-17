'use client'

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdEditSquare } from 'react-icons/md';
import {
    Modal,ModalContent,ModalBody,Button,useDisclosure,RadioGroup,Radio,
} from "@nextui-org/react";
import { editUserRole } from '@/app/[lang]/reducers/userSlice';
import CustomToast from '../../CustomToast';
import { useFormik } from 'formik';
import { editUserRoleSchema } from '@/app/[lang]/validations/formsValidation';

const RolesModal = ({user}) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [adminStatus,setAdminStatus] = useState(user.role)
    const [submitLoading, setSubmitLoading] = useState(false);

//? ==================== START useDispatch ====================
    const dispatch = useDispatch()
//? ==================== / END useDispatch ====================
//? ================= START handleChangeRole =================
    const handleChangeRole = async (values,userId) => {
        setSubmitLoading(true);
        const data = { values, userId };
        try {
            const res = await dispatch(editUserRole(data)).unwrap();
            CustomToast("success", "نقش کاربر با موفقیت تغییر یافت");
            onClose();
        } catch (err) {
            CustomToast("error", err);
        } finally {
            setSubmitLoading(false);
        }
    }
//? ================= / END handleChangeRole =================
const formik = useFormik({
    initialValues: {
      role: user.role,
    },
    validationSchema: editUserRoleSchema,
    onSubmit: (values, { resetForm }) => {
        handleChangeRole(values,user._id);
    },
  });
//? ========================= / END FORMIK ==========================

    return (
        <>
            <Button
                isIconOnly variant="light" onPress={onOpen}
                className=' text-danger-500 text-2xl font-bold'>
                <MdEditSquare />
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
                                    id='role' name='role'
                                    color="success" orientation="horizontal"
                                    value={adminStatus} onValueChange={setAdminStatus} 
                                    label=" جهت تغییر نقش کاربر یک گزینه را انتخاب کنید "
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}                                    
                                    errorMessage={formik.touched.role && formik.errors.role}
                                    isInvalid={formik.touched.role && formik.errors.role ? true : false}
                                >
                                    <Radio value="user"> کاربرعادی </Radio>
                                    <Radio value="operator"> اپراتور </Radio>
                                    <Radio value="admin"> مدیر </Radio>
                                </RadioGroup>
                                <Button
                                    isLoading={submitLoading} type='submit'
                                    className='bg-danger-500 text-white font-bold w-full mt-8'
                                >
                                    تغییر نقش کاربر
                                </Button>
                            </form>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </>
      );
};

export default RolesModal;