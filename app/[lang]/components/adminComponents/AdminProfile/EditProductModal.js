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
import { editProduct } from "@/app/[lang]/reducers/productSlice";
import { FaEdit } from "react-icons/fa";
import SelectBoxCustom from "../../SelectBoxCustom";
import KeywordInputCustom from "../../KeywordInputCustom";

const EditProductModal = ({ product }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const session = useSession();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [filesChanged, setFilesChanged] = useState(false);
  const [imagesNames, setImagesNames] = useState([...product?.images]);
  const [guideImagesNames, setGuideImagesNames] = useState([
    ...product?.guideImages,
  ]);
  const [guideVideosNames, setGuideVideosNames] = useState([
    ...product?.guideVideos,
  ]);
  const [filesNames, setFilesNames] = useState([...product?.files]);
  const [faKeywords, setFaKeywords] = useState([...product?.keywords.fa]);
  const [enKeywords, setEnKeywords] = useState([...product?.keywords.en]);
  const [arKeywords, setArKeywords] = useState([...product?.keywords.ar]);
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
            setFilesChanged(true);
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
            setFilesChanged(true);
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
          setFilesChanged(true);
        }
      });
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
    productId,
    resetForm,
    filesChanged
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
      productId,
      filesChanged,
    };
    try {
      const res = await dispatch(editProduct(data)).unwrap();
      CustomToast("success", "تغییرات با موفقیت اعمال شد");
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
      faName: product?.name.fa,
      faSlug: product?.slug.fa,
      faFullDescription: product?.fullDescription.fa,
      faUseCases: product?.useCases.fa,
      faPrice: product?.price.fa.amount,
      faDiscount: product?.price.fa.discount,

      enName: product?.name.en,
      enSlug: product?.slug.en,
      enFullDescription: product?.fullDescription.en,
      enUseCases: product?.useCases.en,
      enPrice: product?.price.en.amount,
      enDiscount: product?.price.fa.discount,

      arName: product?.name.ar,
      arSlug: product?.slug.ar,
      arFullDescription: product?.fullDescription.ar,
      arUseCases: product?.useCases.ar,

      qty: product?.qty,
      status: product?.status,
      special: product?.special,

      images: product?.images,
      guideImages: product?.guideImages,
      guideVideos: product?.guideVideos,
      files: product?.files,
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
        product._id,
        resetForm,
        filesChanged
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
        isDismissable={true}
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b-2 border-green-700 m-4">
                <h1 className="font-bold text-lg text-green-800">
                  {" "}
                  اصلاح کردن محصول{" "}
                </h1>
              </ModalHeader>

              <ModalBody>
                <form onSubmit={formik.handleSubmit} className="mx-3 mb-5">
                  <InputCustom
                    name={"faName"}
                    label={" عنوان فارسی محصول "}
                    formik={formik}
                    defaultValue={product.name.fa}
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
                    defaultValue={product.fullDescription.fa}
                  />
                  <TextAreaCustom
                    name={"faUseCases"}
                    label={" متن فارسی موارد مصرف "}
                    formik={formik}
                    defaultValue={product.useCases.fa}
                  />
                  <InputCustom
                    name={"faPrice"}
                    label={" قیمت فارسی "}
                    formik={formik}
                    defaultValue={product.price.fa.amount}
                  />
                  <InputCustom
                    name={"faDiscount"}
                    label={" تخفیف فارسی "}
                    formik={formik}
                    defaultValue={product.price.fa.discount}
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
                    defaultValue={product.name.en}
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
                    defaultValue={product.fullDescription.en}
                  />
                  <TextAreaCustom
                    name={"enUseCases"}
                    label={" متن انگلیسی موارد مصرف "}
                    formik={formik}
                    defaultValue={product.useCases.en}
                  />
                  <InputCustom
                    name={"enPrice"}
                    label={" قیمت انگلیسی "}
                    formik={formik}
                    defaultValue={product.price.en.amount}
                  />
                  <InputCustom
                    name={"enDiscount"}
                    label={" تخفیف انگلیسی "}
                    formik={formik}
                    defaultValue={product.price.en.discount}
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
                    defaultValue={product.name.ar}
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
                    defaultValue={product.fullDescription.ar}
                  />
                  <TextAreaCustom
                    name={"arUseCases"}
                    label={" متن عربی موارد مصرف "}
                    formik={formik}
                    defaultValue={product.useCases.ar}
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
                    defaultValue={product.qty}
                  />

                  <SelectBoxCustom
                    formik={formik}
                    label={" وضعیت "}
                    name={"status"}
                    defaultSelectedKeys={[product.status]}
                    selectItems={[
                      { id: 1, key: "1", value: "فعال" },
                      { id: 2, key: "0", value: "غیرفعال" },
                    ]}
                  />
                  
                  <SelectBoxCustom
                    formik={formik}
                    label={" محصول سفارشی "}
                    name={"special"}
                    defaultSelectedKeys={[product.special]}
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
                          "product", //! for exp. :( gallery, events, news ... )
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
                          "product", //! for exp. :( gallery, events, news ... )
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
                    className="text-white text-lg font-bold w-full h-14"
                  >
                    اصلاح محصول
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

export default EditProductModal;
