'use client'

import { createFaq } from '@/app/[lang]/reducers/faqSlice';
import { createFAQuestionSchema } from '@/app/[lang]/validations/formsValidation';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import CustomToast from '../../CustomToast';
import { useDispatch } from 'react-redux';
import { Button, Radio, RadioGroup } from '@nextui-org/react';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';

const AddFAQ = () => {

    const [showForm, setShowForm] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false);

//? ======================= START useDispatch =======================
    const dispatch = useDispatch()
//? ======================= / END useDispatch =======================
//? =============== START handleSubmit (use in formik) ==============
    const handleSubmit = async (values,resetForm) => {
        setSubmitLoading(true);
        try {
        const res = await dispatch(createFaq(values)).unwrap();
        CustomToast("success", "سوال جدید با موفقیت اضافه شد");
        resetForm();
        setShowForm(!showForm)
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
            faTitle:'',
            faBody:'',
            enTitle:'',
            enBody:'',
            arTitle:'',
            arBody:'',
            status:'',
        },
        validationSchema:createFAQuestionSchema,
        onSubmit:(values, { resetForm }) => {
            handleSubmit(values,resetForm);
        }
})
//? ========================= / END FORMIK ==========================

    return (
        <form onSubmit={formik.handleSubmit}
            className='
            flex flex-col
            shadow-2xl border-1 border-green-100 bg-green-100/50
            text-white rounded-3xl
            ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 my-4 px-2 py-4 xs:p-4'
        >
            <header className='flex justify-between items-center border-b-2 border-green-900 mb-4 pb-4'>
                <h1 className='text-green-800 font-bold drop-shadow-lg'> ثبت سوالات پرتکرار </h1>
                <Button variant='light'
                    onClick={ ()=>setShowForm(!showForm) }
                    startContent={showForm ? <FaMinusSquare className="text-lg"/> : <FaPlusSquare className="text-lg"/>}
                    className='hidden md:flex font-bold text-green-800 hover:text-green-600'
                > اضافه کردن سوال جدید </Button>
                <Button variant='light' isIconOnly
                    onClick={ ()=>setShowForm(!showForm) }
                    startContent={showForm ? <FaMinusSquare className="text-lg"/> : <FaPlusSquare className="text-lg"/>}
                    className='md:hidden font-bold text-green-800 hover:text-green-600'
                ></Button>
                
            </header>
            {showForm &&
            <>
                <input id='faTitle' name='faTitle' type="text" placeholder=' عنوان فارسی سوال ' 
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className='
                    m-2 pr-4 h-14
                    text-green-800 placeholder-green-800 bg-green-200/55
                    border-1 border-green-100 rounded-2xl shadow-lg outline-none'
                />
                {formik.touched.faTitle && formik.errors.faTitle ? (<div className='text-red-500'>{formik.errors.faTitle}</div>) : null}
                <textarea id='faBody' name='faBody' placeholder=' متن فارسی سوال '
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className='
                    m-2 pr-4 h-36
                    text-green-800 placeholder-green-800 bg-green-200/55
                    border-1 border-green-100 rounded-2xl shadow-lg outline-none'
                />
                {formik.touched.faBody && formik.errors.faBody ? (<div className='text-red-500'>{formik.errors.faBody}</div>) : null}

                <input id='enTitle' name='enTitle' type="text" placeholder=' عنوان انگلیسی سوال ' 
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className='
                    m-2 pr-4 h-14
                    text-green-800 placeholder-green-800 bg-green-200/55
                    border-1 border-green-100 rounded-2xl shadow-lg outline-none'
                />
                {formik.touched.enTitle && formik.errors.enTitle ? (<div className='text-red-500'>{formik.errors.enTitle}</div>) : null}
                <textarea id='enBody' name='enBody' placeholder=' متن انگلیسی سوال '
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className='
                    m-2 pr-4 h-36
                    text-green-800 placeholder-green-800 bg-green-200/55
                    border-1 border-green-100 rounded-2xl shadow-lg outline-none'
                />
                {formik.touched.enBody && formik.errors.enBody ? (<div className='text-red-500'>{formik.errors.enBody}</div>) : null}

                <input id='arTitle' name='arTitle' type="text" placeholder=' عنوان عربی سوال ' 
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className='
                    m-2 pr-4 h-14
                    text-green-800 placeholder-green-800 bg-green-200/55
                    border-1 border-green-100 rounded-2xl shadow-lg outline-none'
                />
                {formik.touched.arTitle && formik.errors.arTitle ? (<div className='text-red-500'>{formik.errors.arTitle}</div>) : null}
                <textarea id='arBody' name='arBody' placeholder=' متن عربی سوال '
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className='
                    m-2 pr-4 h-36
                    text-green-800 placeholder-green-800 bg-green-200/55
                    border-1 border-green-100 rounded-2xl shadow-lg outline-none'
                />
                {formik.touched.arBody && formik.errors.arBody ? (<div className='text-red-500'>{formik.errors.arBody}</div>) : null}
                
                <RadioGroup
                    id='status' name='status' label=" وضعیت سوال را انتخاب کنید "
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    color="success" orientation="horizontal"
                    className='m-4 pr-4'
                >
                    <Radio value="enable" className='text-green-800'> فعال </Radio>
                    <Radio value="disable" className='text-green-800'> غیرفعال </Radio>
                </RadioGroup>
                {formik.touched.status && formik.errors.status ? (<div className='text-red-500'>{formik.errors.status}</div>) : null}

                <Button type='submit' isLoading={submitLoading}
                    className='m-2 h-14 text-white bg-green-500 shadow-lg'
                > ثبت </Button>
            </>
            }
        </form>
    );
};

export default AddFAQ;