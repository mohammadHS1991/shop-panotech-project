"use client";

import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  ModalHeader,
  Divider,
  DatePicker,
  ModalFooter,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import {
  checkExistFolder,
  uploadImageFsLess,
  uploadVideoFsLess,
} from "@/app/[lang]/utils";
import CustomToast from "../../CustomToast";
import { editNews } from "@/app/[lang]/reducers/newsSlice";
import InputCustom from "../../InputCustom";
import SlugCustom from "../../SlugCustom";
import TextAreaCustom from "../../TextAreaCustom";
import SelectBoxCustom from "../../SelectBoxCustom";
import { createNewsSchema } from "@/app/[lang]/validations/formsValidation";
import KeywordInputCustom from "../../KeywordInputCustom";
import { parseAbsoluteToLocal } from "@internationalized/date";
import TextEditor from "../../TextEditor";

const EditNewsModal = ({ news }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const session = useSession();
  const [date, setDate] = useState(parseAbsoluteToLocal(news?.date));
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagesChanged, setImagesChanged] = useState(false);
  const [imagesNames, setImagesNames] = useState([...news?.images]);
  const [videosNames, setVideosNames] = useState([...news?.videos]);
  const imageInput = useRef(null);
  const videoInput = useRef(null);

  const [faKeywords, setFaKeywords] = useState([...news?.keywords.fa]);
  const [enKeywords, setEnKeywords] = useState([...news?.keywords.en]);
  const [arKeywords, setArKeywords] = useState([...news?.keywords.ar]);

  //? ======================  START useDispatch  ======================
  const dispatch = useDispatch();
  //? ======================= / END useDispatch =======================
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
            setImagesChanged(true);
          }
        }

        if (itemType === "videos") {
          const res = await uploadVideoFsLess(
            formData,
            site,
            category,
            itemName,
            itemType,
            index + 1
          );
          if (res === "error") {
            CustomToast("error", "آپلود فیلم با مشکل مواجه شد");
          } else {
            CustomToast("success", "آپلود فیلم با موفقیت انجام شد");
            stateSetter((prev) => {
              return [...prev, res];
            });
            setImagesChanged(true);
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
    videosNames,
    faKeywords,
    enKeywords,
    arKeywords,
    userId,
    newsId,
    date,
    resetForm,
    imagesChanged
  ) => {
    setSubmitLoading(true);
    const data = {
      values,
      imagesNames,
      videosNames,
      faKeywords,
      enKeywords,
      arKeywords,
      userId,
      newsId,
      date,
      imagesChanged,
    };
    try {
      const res = await dispatch(editNews(data)).unwrap();
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
    initialValues: {
      faTitle: news.title.fa,
      faSlug: news.slug.fa,
      enTitle: news.title.en,
      enSlug: news.slug.en,
      arTitle: news.title.ar,
      arSlug: news.slug.ar,
      status: news.status,
      category: news.category,
      images: news.images,
      videos: news.videos,
      faFirstBody: news.firstBody.fa,
      faSecondBody: news.secondBody.fa,
      enFirstBody: news.firstBody.en,
      enSecondBody: news.secondBody.en,
      arFirstBody: news.firstBody.ar,
      arSecondBody: news.secondBody.ar,
    },
    validationSchema: createNewsSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(
        values,
        imagesNames,
        videosNames,
        faKeywords,
        enKeywords,
        arKeywords,
        session.data.user.id,
        news._id,
        date,
        resetForm,
        imagesChanged
      );
    },
  });
  //? ========================= / END FORMIK ==========================
  return (
    <>
      <Button
        onPress={onOpen}
        variant="light"
        isIconOnly
        className="text-xl text-gray-400 hover:text-green-500"
      >
        <FaEdit />
      </Button>

      <Modal
        isOpen={isOpen}
        size="2xl"
        placement="top"
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b-2 border-green-700 m-4">
                <h1 className="font-bold text-lg text-green-800">
                  {" "}
                  اصلاح کردن خبر{" "}
                </h1>
              </ModalHeader>

              <ModalBody>
                <form onSubmit={formik.handleSubmit} className="xs:mx-3 mb-5">
                  <InputCustom
                    name={"faTitle"}
                    label={" عنوان فارسی "}
                    formik={formik}
                    defaultValue={news?.title.fa}
                  />
                  <SlugCustom
                    formik={formik}
                    inputName={"faSlug"}
                    label={" اسلاگ فارسی "}
                    valueName={"faTitle"}
                  />
                  <TextAreaCustom
                    name={"faFirstBody"}
                    label={" متن فارسی بالای عکس "}
                    formik={formik}
                    defaultValue={news?.firstBody.fa}
                  />
                  <TextEditor
                    name="faSecondBody"
                    formik={formik}
                    label="متن فارسی پایین عکس "
                    lang="fa"
                  />
                  {/* <TextAreaCustom
                    name={"faSecondBody"}
                    label={" متن فارسی پایین عکس "}
                    formik={formik}
                    defaultValue={news?.secondBody.fa}
                  /> */}
                  <KeywordInputCustom
                    state={faKeywords}
                    setState={setFaKeywords}
                    label={"کلمات کلیدی فارسی"}
                    placeholder={"کلمه کلیدی ..."}
                  />
                  <Divider className="my-4" />

                  <InputCustom
                    name={"enTitle"}
                    label={" عنوان انگلیسی "}
                    formik={formik}
                    dir={"ltr"}
                    defaultValue={news?.title.en}
                  />
                  <SlugCustom
                    formik={formik}
                    inputName={"enSlug"}
                    label={" اسلاگ انگلیسی "}
                    valueName={"enTitle"}
                  />
                  <TextAreaCustom
                    name={"enFirstBody"}
                    label={" متن انگلیسی بالای عکس "}
                    formik={formik}
                    defaultValue={news?.firstBody.en}
                  />
                  <TextEditor
                    name="enSecondBody"
                    formik={formik}
                    label="متن انگلیسی پایین عکس "
                    lang="en"
                  />
                  {/* <TextAreaCustom
                    name={"enSecondBody"}
                    label={" متن انگلیسی پایین عکس "}
                    formik={formik}
                    defaultValue={news?.secondBody.en}
                  /> */}
                  <KeywordInputCustom
                    state={enKeywords}
                    setState={setEnKeywords}
                    label={"کلمات کلیدی انگلیسی"}
                    placeholder={"کلمه کلیدی ..."}
                    dir="ltr"
                  />
                  <Divider className="my-4" />

                  <InputCustom
                    name={"arTitle"}
                    label={" عنوان عربی "}
                    formik={formik}
                    defaultValue={news?.title.ar}
                  />
                  <SlugCustom
                    formik={formik}
                    inputName={"arSlug"}
                    label={" اسلاگ عربی "}
                    valueName={"arTitle"}
                  />
                  <TextAreaCustom
                    name={"arFirstBody"}
                    label={" متن عربی بالای عکس "}
                    formik={formik}
                    defaultValue={news?.firstBody.ar}
                  />
                  <TextEditor
                    name="arSecondBody"
                    formik={formik}
                    label="متن عربی پایین عکس "
                    lang="ar"
                  />
                  {/* <TextAreaCustom
                    name={"arSecondBody"}
                    label={" متن عربی پایین عکس "}
                    formik={formik}
                    defaultValue={news?.secondBody.ar}
                  /> */}
                  <KeywordInputCustom
                    state={arKeywords}
                    setState={setArKeywords}
                    label={"کلمات کلیدی عربی"}
                    placeholder={"کلمه کلیدی ..."}
                  />
                  <Divider className="my-4" />

                  <SelectBoxCustom
                    formik={formik}
                    label={" وضعیت "}
                    name={"status"}
                    defaultSelectedKeys={[news.status]}
                    selectItems={[
                      { id: 1, key: "enable", value: "فعال" },
                      { id: 2, key: "disable", value: "غیرفعال" },
                    ]}
                  />

                  <SelectBoxCustom
                    formik={formik}
                    label={" دسته بندی "}
                    name={"category"}
                    defaultSelectedKeys={[news.category]}
                    selectItems={[
                      { id: 1, key: "educational", value: "آموزشی" },
                      { id: 2, key: "news", value: "خبری" },
                    ]}
                  />

                  <div dir="rtl" className="w-full my-5">
                    <DatePicker
                      name="date"
                      variant="bordered"
                      label="تاریخ خبر"
                      color="success"
                      isRequired={true}
                      granularity="day"
                      showMonthAndYearPickers
                      value={date}
                      onChange={setDate}
                      errorMessage="تاریخ خیر الزامی است"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <Input
                      id="images"
                      name="images"
                      type="file"
                      label=" لطفا یک عکس انتخاب کنید "
                      accept=".png, .jpg, .jpeg"
                      ref={imageInput}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "images",
                          Object.values(e.target.files)
                        );
                      }}
                      errorMessage={
                        formik.touched.images && formik.errors.images
                      }
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.images && formik.errors.images
                          ? true
                          : false
                      }
                      className="my-5"
                    />
                    <Button
                      color="success"
                      variant="shadow"
                      type="button"
                      isLoading={uploadLoading}
                      onClick={async (e) => {
                        await handleUpload(
                          e,
                          imageInput,
                          "panotech",
                          "news",
                          formik.values.enSlug,
                          "images",
                          setImagesNames
                        );
                      }}
                    >
                      اضافه کردن عکس
                    </Button>
                  </div>
                  <div className="flex justify-center items-center">
                    <Input
                      id="videos"
                      name="videos"
                      type="file"
                      label=" لطفا یک فیلم انتخاب کنید "
                      ref={videoInput}
                      accept=".mp4"
                      onChange={(e) => {
                        formik.setFieldValue(
                          "videos",
                          Object.values(e.target.files)
                        );
                      }}
                      onBlur={formik.handleBlur}
                      className="my-5"
                      errorMessage={
                        formik.touched.videos && formik.errors.videos
                      }
                      isInvalid={formik.touched.videos && formik.errors.videos}
                    />
                    <Button
                      color="success"
                      variant="shadow"
                      type="button"
                      isLoading={uploadLoading}
                      onClick={async (e) => {
                        await handleUpload(
                          e,
                          videoInput,
                          "panotech",
                          "news",
                          formik.values.enSlug,
                          "videos",
                          setVideosNames
                        );
                      }}
                    >
                      اضافه کردن فیلم
                    </Button>
                  </div>

                  <Button
                    color="success"
                    type="submit"
                    isLoading={submitLoading}
                    className="text-white text-lg font-bold w-full h-14"
                  >
                    اصلاح خبر
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

export default EditNewsModal;
