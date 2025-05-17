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
import { MdAddCircle } from "react-icons/md";
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
import { createGallery } from "@/app/[lang]/reducers/gallerySlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from "next/image";

const AddEventGalleryModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const session = useSession();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagesNames, setImagesNames] = useState([]);
  const [videosNames, setVideosNames] = useState([]);
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
  const handleDeleteImage = async (image, state, stateSetter) => {
    const newImagesNames = await deleteImageFunction(image, state);
    stateSetter([...newImagesNames]);
  };
  //? =============== / END handleDeleteImage  ==============

  //? =============== START handleSubmit (use in formik) ==============
  const handleSubmit = async (
    values,
    imagesNames,
    videosNames,
    userId,
    resetForm
  ) => {
    setSubmitLoading(true);
    const data = { values, imagesNames, videosNames, userId };
    try {
      const res = await dispatch(createGallery(data)).unwrap();
      CustomToast("success", "گالری جدید با موفقیت اضافه شد");
      resetForm();
      onClose();
      setImagesNames([]);
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
      videos: "",
    },
    validationSchema: createGallerySchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(
        values,
        imagesNames,
        videosNames,
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
        className="hidden sm:flex font-bold text-white bg-green-300 m-4 h-16"
      >
        اضافه کردن عکس
      </Button>
      <Button
        onPress={onOpen}
        variant="light"
        isIconOnly
        className="sm:hidden font-bold text-white bg-green-300 m-4 h-16 w-16"
      >
        <MdAddCircle className="text-2xl" />
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
                  />
                  <div className="flex justify-center items-center">
                    <Input
                      id="images"
                      name="images"
                      ref={imageInput}
                      multiple
                      accept=".png, .jpg, .jpeg"
                      type="file"
                      label=" عکس های گالری را انتخاب کنید "
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
                          "galleries", //! for exp. :( gallery, events, news ... )
                          formik.values.enSlug, //! slug (create with title)
                          "images", //! for exp. :( images, videos ... )
                          imagesNames,
                          setImagesNames //! name and size of images
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
                          className="absolute -top-2 -right-2 text-red-500"
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
                      label=" فیلم های گالری را انتخاب کنید "
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
                          formik.values.enSlug,
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
                    ایجاد گالری جدید
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

export default AddEventGalleryModal;
