'use client'

import React, { useRef, useState } from 'react';
import {Modal, ModalContent, ModalBody, Button, useDisclosure, Input, ModalHeader, Divider, DatePicker, ModalFooter} from "@nextui-org/react";
import { useFormik } from 'formik';
import { FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import InputCustom from '../../InputCustom';
import SlugCustom from '../../SlugCustom';
import TextAreaCustom from '../../TextAreaCustom';
import SelectBoxCustom from '../../SelectBoxCustom';
import { useSession } from 'next-auth/react';
import { createEventSchema } from '@/app/[lang]/validations/formsValidation';
import { checkExistFolder, uploadImageFsLess } from '@/app/[lang]/utils';
import { editEvent } from '@/app/[lang]/reducers/eventSlice';
import TextEditor from '../../TextEditor';
import KeywordInputCustom from '../../KeywordInputCustom';
import CustomToast from '../../CustomToast';
import { parseAbsoluteToLocal } from '@internationalized/date';

const EditEventModal = ({event}) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const session = useSession()
    const [date,setDate]=useState(parseAbsoluteToLocal(event?.date))
    const [uploadLoading, setUploadLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [imagesChanged, setImagesChanged] = useState(false);
    const [imagesNames, setImagesNames] = useState([...event?.images]);
    const imageInput = useRef(null);

    const [faKeywords,setFaKeywords] = useState([...event?.keywords.fa])
    const [enKeywords,setEnKeywords] = useState([...event?.keywords.en])
    const [arKeywords,setArKeywords] = useState([...event?.keywords.ar])

//? ======================= START useDispatch =======================
    const dispatch = useDispatch()
//? ====================== / END useDispatch ========================
//? ======== START handleImageUpload (use in img upload btn) ========
    const handleUpload = async (
        e,
        inputRef, //* image input with useRef
        site, //* panotech (hardCode)
        category, //* for exp. :( gallery, events, news ... )
        itemName, //* slug (create with title)
        itemType, //* for exp. :( images, videos ... )
        stateSetter //* name and size of images
    ) => {
        setUploadLoading(true);
        e.preventDefault();
        stateSetter([]);
        try {
        await checkExistFolder(site, category, itemName, itemType, true);
        const files = Object.values(inputRef?.current?.files);
        files.forEach(async (file, index) => {
            const formData = new FormData();
            formData.append("file", file);

            if (itemType === "images") {
            const res = await uploadImageFsLess(
                formData,
                site,
                category,
                itemName,
                itemType,
                index + 1,
                960,
                540
            );
            if (res === "error") {
                CustomToast("error", "آپلود عکس با مشکل مواجه شد");
            } else {
                CustomToast("success", "آپلود عکس با موفقیت انجام شد");
                stateSetter((prev) => {
                return [...prev, res];
                });
                setImagesChanged(true)
            }
            }
        });
        } catch (err) {
        CustomToast("error", "آپلود با مشکل مواجه شد");
        } finally {
        setUploadLoading(false);
        }
    };
//? ======== / END handleImageUpload (use in img upload btn) ========
//? =============== START handleSubmit (use in formik) ==============
    const handleSubmit = async (
        values,
        imagesNames,
        userId,
        eventId,
        faKeywords,
        enKeywords,
        arKeywords,
        date,
        resetForm,
        imagesChanged
    ) => {
        setSubmitLoading(true);
        const data = { values, imagesNames, userId, eventId, faKeywords, enKeywords, arKeywords, date, imagesChanged };
        try {
        const res = await dispatch(editEvent(data)).unwrap();
        CustomToast("success", "تغییرات با موفقیت ثبت شد");
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
            faTitle: event.title.fa,
            faSlug: event.title.fa,
            enTitle: event.title.en,
            enSlug: event.title.en,
            arTitle: event.title.ar,
            arSlug: event.title.ar,
            status: event.status,
            images: event.images,
            faFirstBody: event.firstBody.fa,
            faSecondBody: event.firstBody.fa,
            enFirstBody: event.firstBody.en,
            enSecondBody: event.firstBody.en,
            arFirstBody: event.firstBody.ar,
            arSecondBody: event.firstBody.ar,
        },
        validationSchema:createEventSchema,
        onSubmit:(values, { resetForm }) => {
            handleSubmit(
                values,
                imagesNames,
                session.data.user.id,
                event._id,
                faKeywords,
                enKeywords,
                arKeywords,
                date,
                resetForm,
                imagesChanged
            );
        }
    })
//? ========================= / END FORMIK ==========================

    return (
        <>
            <Button onPress={onOpen} variant="light" isIconOnly
                className='text-xl text-gray-400 hover:text-green-500'
            >
                <FaEdit />
            </Button>
            
            
            <Modal
                isOpen={isOpen} size='2xl' placement='top' onOpenChange={onOpenChange}
                scrollBehavior="inside"
                backdrop="blur"
            >
                
                <ModalContent>
                    {(onClose) => (
                    <>
                        <ModalHeader className='border-b-2 border-green-700 m-4'>
                            <h1 className='font-bold text-lg text-green-800'> اصلاح کردن رویداد </h1>
                        </ModalHeader>
                        
                        <ModalBody>
                        <form  onSubmit={formik.handleSubmit} className='xs:mx-3 mb-5'>
                                <InputCustom name={'faTitle'} label={" عنوان فارسی "} formik={formik} defaultValue={event?.title.fa}/>
                                <SlugCustom formik={formik} inputName={'faSlug'} label={' اسلاگ فارسی '} valueName={'faTitle'} />
                                <TextAreaCustom name={'faFirstBody'} label={" متن فارسی بالای عکس "} formik={formik} defaultValue={event?.firstBody.fa}/>
                                {/* <TextAreaCustom name={'faSecondBody'} label={" متن فارسی پایین عکس "} formik={formik} defaultValue={event?.secondBody.fa}/> */}
                                <TextEditor
                                    name="faSecondBody" formik={formik} label="متن فارسی پایین عکس " lang="fa"
                                />
                                <KeywordInputCustom
                                    state={faKeywords} setState={setFaKeywords} label={"کلمات کلیدی فارسی"} placeholder={"کلمه کلیدی ..."}
                                />
                                <Divider className="my-4" />

                                <InputCustom name={'enTitle'} label={" عنوان انگلیسی "} formik={formik} dir={'ltr'} defaultValue={event?.title.en}/>
                                <SlugCustom formik={formik} inputName={'enSlug'} label={' اسلاگ انگلیسی '} valueName={'enTitle'} />
                                <TextAreaCustom name={'enFirstBody'} label={" متن انگلیسی بالای عکس "} formik={formik} defaultValue={event?.firstBody.en}/>
                                {/* <TextAreaCustom name={'enSecondBody'} label={" متن انگلیسی پایین عکس "} formik={formik} defaultValue={event?.secondBody.en}/> */}
                                <TextEditor
                                    name="enSecondBody" formik={formik} label="متن انگلیسی پایین عکس " lang="en"
                                />
                                <KeywordInputCustom
                                    state={enKeywords} setState={setEnKeywords} label={"کلمات کلیدی انگلیسی"} placeholder={"کلمه کلیدی ..."} dir="ltr"
                                />
                                <Divider className="my-4" />
                                
                                <InputCustom name={'arTitle'} label={" عنوان عربی "} formik={formik} defaultValue={event?.title.ar}/>
                                <SlugCustom formik={formik} inputName={'arSlug'} label={' اسلاگ عربی '} valueName={'arTitle'} />
                                <TextAreaCustom name={'arFirstBody'} label={" متن عربی بالای عکس "} formik={formik} defaultValue={event?.firstBody.ar}/>
                                {/* <TextAreaCustom name={'arSecondBody'} label={" متن عربی پایین عکس "} formik={formik} defaultValue={event?.secondBody.ar}/> */}
                                <TextEditor
                                    name="arSecondBody" formik={formik} label="متن عربی پایین عکس " lang="ar"
                                />
                                <KeywordInputCustom
                                    state={arKeywords} setState={setArKeywords} label={"کلمات کلیدی عربی"} placeholder={"کلمه کلیدی ..."}
                                />
                                <Divider className="my-4" />
                                
                                <SelectBoxCustom formik={formik} label={' وضعیت '} name={'status'}
                                    defaultSelectedKeys={[event.status]}
                                    selectItems={[
                                        { id: 1, key: "enable", value: "فعال" },
                                        { id: 2, key: "disable", value: "غیرفعال" },
                                    ]}
                                />
                                <div dir="rtl" className="w-full my-5">
                                   <DatePicker name="date" variant="bordered" label="تاریخ رویداد" color="success"
                                     isRequired={true} granularity="day" showMonthAndYearPickers
                                     value={date} onChange={setDate} errorMessage="تاریخ رویداد الزامی است"
                                   />
                                </div>
                                <div className='flex justify-center items-center'>
                                    <Input
                                        id='images' name='images'
                                        ref={imageInput}
                                        accept=".png, .jpg, .jpeg"
                                        type="file" label=" لطفا یک عکس انتخاب کنید "
                                        onChange={(e) => {
                                            formik.setFieldValue('images', Object.values(e.target.files));
                                          }} 
                                        onBlur={formik.handleBlur}
                                        className='my-5'
                                        errorMessage={formik.touched.images && formik.errors.images}
                                        isInvalid={formik.touched.images && formik.errors.images?true:false}
                                    />
                                    <Button
                                        color="success"
                                        variant="shadow"
                                        type="button"
                                        isLoading={uploadLoading}
                                        onClick={async (e) => {await handleUpload(
                                            e,
                                            imageInput,
                                            "panotech",
                                            "events",
                                            formik.values.enSlug,
                                            "images",
                                            setImagesNames
                                        );
                                        }}
                                    >
                                        اضافه کردن عکس
                                    </Button>
                                </div>

                                <Button
                                    color="success" type='submit' isLoading={submitLoading}
                                    // onPress={onClose}
                                    className='text-white text-lg font-bold w-full h-14'
                                >
                                    اصلاح رویداد
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

export default EditEventModal;