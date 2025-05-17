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
  ModalFooter,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import {
  checkExistFolder,
  deleteImageFunction,
  uploadImageFsLess,
} from "@/app/[lang]/utils";
import CustomToast from "../../CustomToast";
import { editSelectedGallery } from "@/app/[lang]/reducers/selectedGallerySlice";
import { createSelectedGallerySchema } from "@/app/[lang]/validations/formsValidation";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";

const EditSelectedGalleryModal = ({ gallery }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const session = useSession();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagesNames, setImagesNames] = useState(gallery?.images);
  const imageInput = useRef(null);
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
      await checkExistFolder(site, category, itemName, itemType, false);
      const files = Object.values(inputRef?.current?.files);
      files.forEach(async (file, index) => {
        const formData = new FormData();
        formData.append("file", file);

        if (itemType === "images") {
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
  const handleSubmit = async (imagesNames, userId, resetForm, _id) => {
    setSubmitLoading(true);
    const data = { imagesNames, userId, _id };
    try {
      const res = await dispatch(editSelectedGallery(data)).unwrap();
      CustomToast("success", "گالری جدید با موفقیت اضافه شد");
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
    initialValues: { images: gallery?.images },
    validationSchema: createSelectedGallerySchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(imagesNames, session.data.user.id, resetForm, gallery._id);
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
                          imageInput, //! image input with useRef
                          "panotech", //! panotech (hardCode)
                          "selectedGalleries", //! for exp. :( gallery, events, news ... )
                          "selectedGalleries1", //! slug (create with title)
                          "images", //! for exp. :( images, videos ... )
                          imagesNames,
                          setImagesNames //! name and size of images
                        );
                      }}
                    >
                      اضافه کردن عکس
                    </Button>
                  </div>
                  <div className="flex gap-2 my-5 flex-wrap">
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

                  <Button
                    color="success"
                    type="submit"
                    // onPress={onClose}
                    className="text-white text-lg font-bold w-full h-14"
                    isLoading={submitLoading}
                  >
                    اصلاح گالری منتخب
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

export default EditSelectedGalleryModal;
