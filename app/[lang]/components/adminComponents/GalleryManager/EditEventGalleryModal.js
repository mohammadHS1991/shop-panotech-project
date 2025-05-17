"use client";

import React, { useRef, useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  Input,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  checkExistFolder,
  deleteImageFunction,
  uploadImageFsLess,
  uploadVideoFsLess,
} from "@/app/[lang]/utils";
import CustomToast from "../../CustomToast";
import InputCustom from "../../InputCustom";
import SlugCustom from "../../SlugCustom";
import { createGallerySchema } from "@/app/[lang]/validations/formsValidation";
import SelectBoxCustom from "../../SelectBoxCustom";
import { useSession } from "next-auth/react";
import { editGallery } from "@/app/[lang]/reducers/gallerySlice";
import { FaEdit } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from "next/image";

const EditEventGalleryModal = ({ gallery }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const session = useSession();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imagesChanged, setImagesChanged] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagesNames, setImagesNames] = useState([...gallery.images]);
  const [videosNames, setVideosNames] = useState([...gallery.videos]);
  const imageInput = useRef(null);
  const videoInput = useRef(null);

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
    state,
    stateSetter //* name and size of images
  ) => {
    setUploadLoading(true);
    e.preventDefault();
    try {
      const files = Object.values(inputRef?.current?.files);
      files.forEach(async (file, index) => {
        const formData = new FormData();
        formData.append("file", file);

        if (itemType === "images") {
          await checkExistFolder(site, category, itemName, itemType, false);

          const imagesCount = state.length;

          const res = await uploadImageFsLess(
            formData,
            site,
            category,
            itemName,
            itemType,
            imagesCount + index + 1,
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
          await checkExistFolder(site, category, itemName, itemType, true);

          stateSetter([]);
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
  //? =============== START handleDeleteImage  ==============
  const handleDeleteImage = async (image, state, setState) => {
    const newImagesNames = await deleteImageFunction(image, state);

    setState([...newImagesNames]);
  };
  //? =============== / END handleDeleteImage  ==============
  //? =============== START handleSubmit (use in formik) ==============
  const handleSubmit = async (
    values,
    imagesNames,
    videosNames,
    userId,
    galleryId,
    resetForm,
    imagesChanged
  ) => {
    setSubmitLoading(true);
    const data = {
      values,
      imagesNames,
      videosNames,
      userId,
      galleryId,
      imagesChanged,
    };
    try {
      const res = await dispatch(editGallery(data)).unwrap();
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
      faTitle: gallery.title.fa,
      enTitle: gallery.title.en,
      arTitle: gallery.title.ar,
      faSlug: gallery.slug.fa,
      enSlug: gallery.slug.en,
      arSlug: gallery.slug.ar,
      status: gallery.status,
      images: gallery.images,
      videos: gallery.videos,
    },
    // validationSchema:eventGallerySchema,
    validationSchema: createGallerySchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(
        values,
        imagesNames,
        videosNames,
        session.data.user.id,
        gallery._id,
        resetForm,
        imagesChanged
      );
    },
  });
  //? ========================= / END FORMIK ==========================
  console.log("imagesNames", imagesNames);
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
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="border-b-2 border-green-700 m-4">
                <h1 className="font-bold text-lg text-green-800">
                  {" "}
                  اضافه کردن عکس جدید{" "}
                </h1>
              </ModalHeader>

              <ModalBody>
                <form onSubmit={formik.handleSubmit} className="xs:mx-3 mb-5">
                  <InputCustom
                    name={"faTitle"}
                    label={" عنوان فارسی "}
                    formik={formik}
                    defaultValue={gallery.title.fa}
                  />
                  <SlugCustom
                    formik={formik}
                    inputName={"faSlug"}
                    label={" اسلاگ فارسی "}
                    valueName={"faTitle"}
                  />
                  <InputCustom
                    name={"enTitle"}
                    label={" عنوان انگلیسی "}
                    formik={formik}
                    dir={"ltr"}
                    defaultValue={gallery.title.en}
                  />
                  <SlugCustom
                    formik={formik}
                    inputName={"enSlug"}
                    label={" اسلاگ انگلیسی "}
                    valueName={"enTitle"}
                  />
                  <InputCustom
                    name={"arTitle"}
                    label={" عنوان عربی "}
                    formik={formik}
                    defaultValue={gallery.title.ar}
                  />
                  <SlugCustom
                    formik={formik}
                    inputName={"arSlug"}
                    label={" اسلاگ عربی "}
                    valueName={"arTitle"}
                  />
                  <SelectBoxCustom
                    formik={formik}
                    label={" وضعیت "}
                    name={"status"}
                    selectItems={[
                      { id: 1, key: "enable", value: "فعال" },
                      { id: 2, key: "disable", value: "غیرفعال" },
                    ]}
                    defaultSelectedKeys={[gallery.status]}
                  />
                  <div className="flex justify-center items-center">
                    <Input
                      id="images"
                      name="images"
                      ref={imageInput}
                      multiple
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
                          imageInput,
                          "panotech",
                          "galleries",
                          formik.values.enSlug,
                          "images",
                          imagesNames,
                          setImagesNames
                        );
                      }}
                    >
                      اضافه کردن عکس
                    </Button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {imagesNames?.map((image) => (
                      <div key={image.name} className="relative shrink-0">
                        <Image
                          alt={image.name}
                          src={`/${image.name}`}
                          width={96}
                          height={54}
                          className="rounded-md shadow-lg"
                        />
                        <IoIosCloseCircleOutline
                          className="absolute -top-2 -right-2 text-red-500 cursor-pointer"
                          onClick={() => {
                            handleDeleteImage(
                              image,
                              imagesNames,
                              setImagesNames
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center items-center">
                    <Input
                      id="videos"
                      name="videos"
                      ref={videoInput}
                      multiple
                      accept=".mp4"
                      type="file"
                      label=" لطفا یک فیلم انتخاب کنید "
                      // defaultValue={}
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
                          "gallery",
                          "test-gallery",
                          "videos",
                          videosNames,
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
                    // onPress={onClose}
                    className="text-white text-lg font-bold w-full h-14"
                    isLoading={submitLoading}
                  >
                    اصلاح گالری
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

export default EditEventGalleryModal;
