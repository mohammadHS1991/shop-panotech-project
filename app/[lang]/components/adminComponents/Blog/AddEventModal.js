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
  Textarea,
  DatePicker,
  Divider,
  ModalFooter,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { MdAddCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import InputCustom from "../../InputCustom";
import { useSession } from "next-auth/react";
import CustomToast from "../../CustomToast";
import { checkExistFolder, uploadImageFsLess } from "@/app/[lang]/utils";
import { createEvent } from "@/app/[lang]/reducers/eventSlice";
import SlugCustom from "../../SlugCustom";
import SelectBoxCustom from "../../SelectBoxCustom";
import { createEventSchema } from "@/app/[lang]/validations/formsValidation";
import TextAreaCustom from "../../TextAreaCustom";
import KeywordInputCustom from "../../KeywordInputCustom";
import TextEditor from "../../TextEditor";

const AddEventModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const session = useSession();
  const [date, setDate] = useState();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagesNames, setImagesNames] = useState([]);
  const imageInput = useRef(null);

  const [faKeywords, setFaKeywords] = useState([]);
  const [enKeywords, setEnKeywords] = useState([]);
  const [arKeywords, setArKeywords] = useState([]);

  //? ======================= START useDispatch =======================
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
    faKeywords,
    enKeywords,
    arKeywords,
    date,
    resetForm
  ) => {
    setSubmitLoading(true);
    const data = {
      values,
      imagesNames,
      userId,
      faKeywords,
      enKeywords,
      arKeywords,
      date,
    };
    try {
      const res = await dispatch(createEvent(data)).unwrap();
      CustomToast("success", "رویداد جدید با موفقیت اضافه شد");
      resetForm();
      onClose();
      // router.replace("/fa/admin/gallery");
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
      faTitle: "",
      faSlug: "",
      enTitle: "",
      enSlug: "",
      arTitle: "",
      arSlug: "",
      status: "",
      images: "",
      faFirstBody: "",
      faSecondBody: "",
      enFirstBody: "",
      enSecondBody: "",
      arFirstBody: "",
      arSecondBody: "",
    },
    validationSchema: createEventSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(
        values,
        imagesNames,
        session.data.user.id,
        faKeywords,
        enKeywords,
        arKeywords,
        date,
        resetForm
      );
    },
  });
  //? ========================= / END FORMIK ==========================
  return (
    <>
      <Button
        onPress={onOpen}
        startContent={<MdAddCircle className="text-2xl" />}
        className="lg:hidden xl:flex font-bold text-white bg-green-300 m-4 h-16"
      >
        ثبت رویداد جدید
      </Button>
      <Button onPress={onOpen} variant="light" isIconOnly
        className='hidden lg:flex xl:hidden font-bold text-white bg-green-300 m-4 h-16 w-16'
      >
        <MdAddCircle className='text-2xl'/>
      </Button>

      <Modal
        isOpen={isOpen}
        size="2xl"
        placement="top"
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="border-b-2 border-green-700 m-4">
                <h1 className="font-bold text-lg text-green-800">
                  {" "}
                  ثبت رویداد جدید{" "}
                </h1>
              </ModalHeader>

              <ModalBody>
                <form onSubmit={formik.handleSubmit} className="xs:mx-3 mb-5">
                  <InputCustom
                    name={"faTitle"}
                    label={" عنوان فارسی "}
                    formik={formik}
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
                  />
                  {/* <TextAreaCustom
                    name={"faSecondBody"}
                    label={" متن فارسی پایین عکس "}
                    formik={formik}
                  /> */}
                  <TextEditor
                    name="faSecondBody"
                    formik={formik}
                    label="متن فارسی پایین عکس "
                    lang="fa"
                  />
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
                  />
                  {/* <TextAreaCustom
                    name={"enSecondBody"}
                    label={" متن انگلیسی پایین عکس "}
                    formik={formik}
                  /> */}
                  <TextEditor
                    name="enSecondBody"
                    formik={formik}
                    label="متن انگلیسی پایین عکس "
                    lang="en"
                  />
                  <KeywordInputCustom
                    state={enKeywords}
                    setState={setEnKeywords}
                    label={"کلمات کلیدی انگلیسی"}
                    placeholder={"کلمه کلیدی ..."}
                  />
                  <Divider className="my-4" />

                  <InputCustom
                    name={"arTitle"}
                    label={" عنوان عربی "}
                    formik={formik}
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
                  />
                  {/* <TextAreaCustom
                    name={"arSecondBody"}
                    label={" متن عربی پایین عکس "}
                    formik={formik}
                  /> */}
                  <TextEditor
                    name="arSecondBody"
                    formik={formik}
                    label="متن عربی پایین عکس "
                    lang="ar"
                  />
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
                    selectItems={[
                      { id: 1, key: "enable", value: "فعال" },
                      { id: 2, key: "disable", value: "غیرفعال" },
                    ]}
                  />
                  <div dir="rtl" className="w-full my-5">
                    <DatePicker
                      name="date"
                      variant="bordered"
                      label="تاریخ رویداد"
                      color="success"
                      isRequired={true}
                      showMonthAndYearPickers
                      value={date}
                      onChange={setDate}
                      errorMessage="تاریخ رویداد الزامی است"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <Input
                      id="images"
                      name="images"
                      ref={imageInput}
                      accept=".png, .jpg, .jpeg"
                      type="file"
                      label=" لطفا یک عکس انتخاب کنید "
                      // defaultValue={}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "images",
                          Object.values(e.target.files)
                        );
                      }}
                      onBlur={formik.handleBlur}
                      className="my-5"
                      errorMessage={
                        formik.touched.images && formik.errors.images
                      }
                      isInvalid={
                        formik.touched.images && formik.errors.images
                          ? true
                          : false
                      }
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
                    color="success"
                    type="submit"
                    // onPress={onClose}
                    isLoading={submitLoading}
                    className="text-white text-lg font-bold w-full h-14"
                  >
                    ثبت رویداد
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

export default AddEventModal;
