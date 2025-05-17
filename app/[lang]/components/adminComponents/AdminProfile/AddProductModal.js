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
  ModalFooter,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { MdAddCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { createProductSchema } from "@/app/[lang]/validations/formsValidation";
import InputCustom from "../../InputCustom";
import SlugCustom from "../../SlugCustom";
import TextAreaCustom from "../../TextAreaCustom";
import {
  checkExistFolder,
  uploadFileFsLess,
  uploadImageFsLess,
  uploadVideoFsLess,
} from "@/app/[lang]/utils";
import CustomToast from "../../CustomToast";
import { createProduct } from "@/app/[lang]/reducers/productSlice";
import SelectBoxCustom from "../../SelectBoxCustom";
import KeywordInputCustom from "../../KeywordInputCustom";

const AddProductModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const session = useSession();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagesNames, setImagesNames] = useState([]);
  const [guideImagesNames, setGuideImagesNames] = useState([]);
  const [guideVideosNames, setGuideVideosNames] = useState([]);
  const [filesNames, setFilesNames] = useState([]);
  const [faKeywords, setFaKeywords] = useState([]);
  const [enKeywords, setEnKeywords] = useState([]);
  const [arKeywords, setArKeywords] = useState([]);
  const imageInput = useRef(null);
  const guideImageInput = useRef(null);
  const videoInput = useRef(null);
  const fileInput = useRef(null);

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

        if (itemType === "images" || itemType === "guideImages") {
          const res = await uploadImageFsLess(
            formData,
            site,
            category,
            itemName,
            itemType,
            index + 1,
            600,
            600
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
          }
        }
      });
      imageInput.current.value = "";
    } catch (err) {
      CustomToast("error", "آپلود با مشکل مواجه شد");
    } finally {
      setUploadLoading(false);
    }
  };
  //? ======== / END handleImageUpload (use in img upload btn) ========
  //? ======== START handleFileUpload (use in file upload btn) ========
  const handleFileUpload = async (
    e,
    inputRef,
    site,
    category,
    itemName,
    itemType
  ) => {
    e.preventDefault();
    setUploadLoading(true);
    setFilesNames([]);
    try {
      await checkExistFolder(site, category, itemName, itemType, true);
      const files = Object.values(inputRef?.current?.files);
      files.forEach(async (file, index) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadFileFsLess(
          formData,
          site,
          category,
          itemName,
          itemType,
          index + 1
        );
        if (res === "error") {
          CustomToast("error", "error");
        } else {
          CustomToast("success", "success");
          setFilesNames((prev) => {
            return [...prev, res];
          });
        }
      });
      fileInput.current.value = "";
    } catch (err) {
      CustomToast("error", "error");
    } finally {
      setUploadLoading(false);
    }
  };
  //? ======== / END handleFileUpload (use in file upload btn) ========
  //? =============== START handleSubmit (use in formik) ==============
  const handleSubmit = async (
    values,
    imagesNames,
    guideImagesNames,
    guideVideosNames,
    filesNames,
    faKeywords,
    enKeywords,
    arKeywords,
    userId,
    resetForm
  ) => {
    setSubmitLoading(true);
    const data = {
      values,
      imagesNames,
      guideImagesNames,
      guideVideosNames,
      filesNames,
      faKeywords,
      enKeywords,
      arKeywords,
      userId,
    };
    try {
      const res = await dispatch(createProduct(data)).unwrap();
      CustomToast("success", "محصول جدید با موفقیت اضافه شد");
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
      faName: "",
      faSlug: "",
      faFullDescription: "",
      faUseCases: "",
      faPrice: "",
      faDiscount: "",

      enName: "",
      enSlug: "",
      enFullDescription: "",
      enUseCases: "",
      enPrice: "",
      enDiscount: "",

      arName: "",
      arSlug: "",
      arFullDescription: "",
      arUseCases: "",

      qty: "",
      status: "",
      special: "",

      images: "",
      guideImages: "",
      guideVideos: "",
      files: "",
    },
    validationSchema: createProductSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(
        values,
        imagesNames,
        guideImagesNames,
        guideVideosNames,
        filesNames,
        faKeywords,
        enKeywords,
        arKeywords,
        session.data.user.id,
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
        اضافه کردن محصول
      </Button>
      <Button
        onPress={onOpen}
        variant="light"
        isIconOnly
        className="hidden lg:flex xl:hidden font-bold text-white bg-green-300 m-4 h-16 w-16"
      >
        <MdAddCircle className="text-2xl" />
      </Button>

      <Modal
        isOpen={isOpen}
        size="2xl"
        placement="top"
        isDismissable={true}
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
                  اضافه کردن محصول جدید{" "}
                </h1>
              </ModalHeader>

              <ModalBody>
                <form onSubmit={formik.handleSubmit} className="mx-3 mb-5">
                  <InputCustom
                    name={"faName"}
                    label={" عنوان فارسی محصول "}
                    formik={formik}
                  />
                  <SlugCustom
                    formik={formik}
                    inputName={"faSlug"}
                    label={" اسلاگ فارسی "}
                    valueName={"faName"}
                  />
                  <TextAreaCustom
                    name={"faFullDescription"}
                    label={" متن فارسی مشخصات "}
                    formik={formik}
                  />
                  <TextAreaCustom
                    name={"faUseCases"}
                    label={" متن فارسی موارد مصرف "}
                    formik={formik}
                  />
                  <InputCustom
                    name={"faPrice"}
                    label={" قیمت فارسی "}
                    formik={formik}
                  />
                  <InputCustom
                    name={"faDiscount"}
                    label={" تخفیف فارسی "}
                    formik={formik}
                  />
                  <KeywordInputCustom
                    state={faKeywords}
                    setState={setFaKeywords}
                    label={"کلمات کلیدی فارسی"}
                    placeholder={"کلمه کلیدی ..."}
                  />
                  <Divider className="my-4" />

                  <InputCustom
                    name={"enName"}
                    label={" عنوان انگلیسی محصول "}
                    formik={formik}
                    dir="ltr"
                  />
                  <SlugCustom
                    formik={formik}
                    inputName={"enSlug"}
                    label={" اسلاگ انگلیسی "}
                    valueName={"enName"}
                  />
                  <TextAreaCustom
                    name={"enFullDescription"}
                    label={" متن انگلیسی مشخصات "}
                    formik={formik}
                    dir="ltr"
                  />
                  <TextAreaCustom
                    name={"enUseCases"}
                    label={" متن انگلیسی موارد مصرف "}
                    formik={formik}
                    dir="ltr"
                  />
                  <InputCustom
                    name={"enPrice"}
                    label={" قیمت انگلیسی "}
                    formik={formik}
                    dir="ltr"
                  />
                  <InputCustom
                    name={"enDiscount"}
                    label={" تخفیف انگلیسی "}
                    formik={formik}
                    dir="ltr"
                  />
                  <KeywordInputCustom
                    state={enKeywords}
                    setState={setEnKeywords}
                    label={"کلمات کلیدی انگلیسی"}
                    placeholder={"کلمه کلیدی ..."}
                    dir="ltr"
                  />
                  <Divider className="my-4" />

                  <InputCustom
                    name={"arName"}
                    label={" عنوان عربی محصول "}
                    formik={formik}
                  />
                  <SlugCustom
                    formik={formik}
                    inputName={"arSlug"}
                    label={" اسلاگ عربی "}
                    valueName={"arName"}
                  />
                  <TextAreaCustom
                    name={"arFullDescription"}
                    label={" متن عربی مشخصات "}
                    formik={formik}
                  />
                  <TextAreaCustom
                    name={"arUseCases"}
                    label={" متن عربی موارد مصرف "}
                    formik={formik}
                  />
                  <KeywordInputCustom
                    state={arKeywords}
                    setState={setArKeywords}
                    label={"کلمات کلیدی عربی"}
                    placeholder={"کلمه کلیدی ..."}
                  />
                  <Divider className="my-4" />

                  <InputCustom
                    name={"qty"}
                    label={" تعداد محصول "}
                    formik={formik}
                  />

                  <SelectBoxCustom
                    formik={formik}
                    label={" وضعیت "}
                    name={"status"}
                    selectItems={[
                      { id: 1, key: "1", value: "فعال" },
                      { id: 2, key: "0", value: "غیرفعال" },
                    ]}
                  />
                  
                  <SelectBoxCustom
                    formik={formik}
                    label={" محصول سفارشی "}
                    name={"special"}
                    selectItems={[
                      { id: 1, key: "1", value: "سفارشی" },
                      { id: 2, key: "0", value: "عادی" },
                    ]}
                  />
                  
                  <Divider className="my-4" />
                  {/*===============  //? images  ===============*/}
                  <div className="flex justify-center items-center">
                    <Input
                      id="images"
                      name="images"
                      ref={imageInput}
                      multiple
                      accept=".png, .jpg, .jpeg"
                      type="file"
                      label=" لطفا عکس های محصول را انتخاب کنید "
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
                      isInvalid={formik.touched.images && formik.errors.images}
                    />
                    <Button
                      color="success"
                      variant="shadow"
                      type="button"
                      isLoading={uploadLoading}
                      onClick={async (e) => {
                        await handleUpload(
                          e,
                          imageInput, //! image input with useRef
                          "panotech", //! panotech (hardCode)
                          "products", //! for exp. :( gallery, events, news ... )
                          formik.values.enSlug, //! slug (create with title)
                          "images", //! for exp. :( images, videos ... )
                          setImagesNames //! name and size of images
                        );
                      }}
                    >
                      اضافه کردن عکس ها
                    </Button>
                  </div>
                  {/*===============  //? guideImages  ===============*/}
                  <div className="flex justify-center items-center">
                    <Input
                      id="guideImages"
                      name="guideImages"
                      ref={guideImageInput}
                      accept=".png, .jpg, .jpeg"
                      type="file"
                      label=" عکس راهنمای استفاده را انتخاب کنید "
                      // defaultValue={}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "guideImages",
                          Object.values(e.target.files)
                        );
                      }}
                      onBlur={formik.handleBlur}
                      className="my-5"
                      errorMessage={
                        formik.touched.guideImages && formik.errors.guideImages
                      }
                      isInvalid={
                        formik.touched.guideImages && formik.errors.guideImages
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
                          guideImageInput, //! image input with useRef
                          "panotech", //! panotech (hardCode)
                          "products", //! for exp. :( gallery, events, news ... )
                          formik.values.enSlug, //! slug (create with title)
                          "guideImages", //! for exp. :( images, videos ... )
                          setGuideImagesNames //! name and size of images
                        );
                      }}
                    >
                      اضافه کردن عکس
                    </Button>
                  </div>
                  {/*===============  //? guideVideos  ===============*/}
                  <div className="flex justify-center items-center">
                    <Input
                      id="guideVideos"
                      name="guideVideos"
                      ref={videoInput}
                      accept=".mp4"
                      type="file"
                      label=" ویدیو راهنمای استفاده را انتخاب کنید "
                      // defaultValue={}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "guideVideos",
                          Object.values(e.target.files)
                        );
                      }}
                      onBlur={formik.handleBlur}
                      className="my-5"
                      errorMessage={
                        formik.touched.guideVideos && formik.errors.guideVideos
                      }
                      isInvalid={
                        formik.touched.guideVideos && formik.errors.guideVideos
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
                          videoInput, //! image input with useRef
                          "panotech", //! panotech (hardCode)
                          "products", //! for exp. :( gallery, events, news ... )
                          formik.values.enSlug, //! slug (create with title)
                          "videos", //! for exp. :( images, videos ... )
                          setGuideVideosNames //! name and size of images
                        );
                      }}
                    >
                      اضافه کردن فیلم
                    </Button>
                  </div>
                  {/*===============  //? files  ===============*/}
                  <div className="flex justify-center items-center">
                    <Input
                      id="files"
                      name="files"
                      ref={fileInput}
                      accept=".pdf"
                      type="file"
                      label=" کاتالوگ را بارگذاری کنید "
                      // defaultValue={}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "files",
                          Object.values(e.target.files)
                        );
                      }}
                      onBlur={formik.handleBlur}
                      className="my-5"
                      errorMessage={formik.touched.files && formik.errors.files}
                      isInvalid={formik.touched.files && formik.errors.files}
                    />
                    <Button
                      color="success"
                      variant="shadow"
                      type="button"
                      isLoading={uploadLoading}
                      onClick={async (e) => {
                        await handleFileUpload(
                          e,
                          fileInput, //! image input with useRef
                          "panotech", //! panotech (hardCode)
                          "products", //! for exp. :( gallery, events, news ... )
                          formik.values.enSlug, //! slug (create with title)
                          "catalog" //! for exp. :( images, videos ... )
                        );
                      }}
                    >
                      اضافه کردن کاتالوگ
                    </Button>
                  </div>

                  <Button
                    color="success"
                    type="submit"
                    isLoading={submitLoading}
                    // onPress={onClose}
                    className="text-white text-lg font-bold w-full h-14"
                  >
                    ثبت محصول
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

export default AddProductModal;
