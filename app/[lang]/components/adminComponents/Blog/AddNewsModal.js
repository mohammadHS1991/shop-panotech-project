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
import { MdAddCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createNewsSchema } from "@/app/[lang]/validations/formsValidation";
import { useSession } from "next-auth/react";
import {
  checkExistFolder,
  uploadImageFsLess,
  uploadVideoFsLess,
} from "@/app/[lang]/utils";
import CustomToast from "../../CustomToast";
import { createNews } from "@/app/[lang]/reducers/newsSlice";
import InputCustom from "../../InputCustom";
import SlugCustom from "../../SlugCustom";
import TextAreaCustom from "../../TextAreaCustom";
import SelectBoxCustom from "../../SelectBoxCustom";
import KeywordInputCustom from "../../KeywordInputCustom";
import TextEditor from "../../TextEditor";

const AddNewsModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const session = useSession();
  const [date, setDate] = useState();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagesNames, setImagesNames] = useState([]);
  const [videosNames, setVideosNames] = useState([]);
  const imageInput = useRef(null);
  const videoInput = useRef(null);

  const [faKeywords, setFaKeywords] = useState([]);
  const [enKeywords, setEnKeywords] = useState([]);
  const [arKeywords, setArKeywords] = useState([]);

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
      inputRef.current.value = "";
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
    date,
    resetForm
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
      date,
    };
    try {
      const res = await dispatch(createNews(data)).unwrap();
      CustomToast("success", "خبر جدید با موفقیت اضافه شد");
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
      category: "",
      images: "",
      videos: "",
      faFirstBody: "",
      faSecondBody: "",
      enFirstBody: "",
      enSecondBody: "",
      arFirstBody: "",
      arSecondBody: "",
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
        ثبت خبر جدید
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
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop={"blur"}
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="border-b-2 border-green-700 m-4">
                <h1 className="font-bold text-lg text-green-800">
                  {" "}
                  اضافه کردن خبر جدید{" "}
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
                  /> */}
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
                    selectItems={[
                      { id: 1, key: "enable", value: "فعال" },
                      { id: 2, key: "disable", value: "غیرفعال" },
                    ]}
                  />

                  <SelectBoxCustom
                    formik={formik}
                    label={" دسته بندی "}
                    name={"category"}
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
                      showMonthAndYearPickers
                      granularity="day"
                      value={date}
                      onChange={setDate}
                      errorMessage="تاریخ خبر الزامی است"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <Input
                      id="images"
                      name="images"
                      type="file"
                      label=" لطفا یک عکس انتخاب کنید "
                      accept=".png, .jpg, .jpeg"
                      // defaultValue={}
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
                    // onPress={onClose}
                    className="text-white text-lg font-bold w-full h-14"
                  >
                    ثبت خبر
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

export default AddNewsModal;
