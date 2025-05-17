"use client";

import { contactUsNavLink, footerText } from "@/app/[lang]/data/data";
import { Button, Image, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaBuilding,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdOutlineFax } from "react-icons/md";
import CollaborationForm from "./CollaborationForm";
import QuestionForm from "./QuestionForm";
import SuggestionForm from "./SuggestionForm";
import { useParams } from "next/navigation";

const ContactForms = () => {
  const params = useParams();
  const lang = params.lang;
  const [tabs, setTabs] = useState(2);
  const [title, setTitle] = useState(
    (lang == "fa" && "سوال") ||
      (lang == "en" && "Question") ||
      (lang == "ar" && " السؤال ")
  );

  return (
    <section className="md:flex justify-center">
      {/* //?============================** START formeSideBar **============================ */}
      <aside
        className="
                pt-1 px-1 m-2 xs:m-5 md:m-0 md:me-5
                bg-gray-100 rounded-xl shadow-xl
                flex md:flex-col
                text-green-800 font-semibold"
      >
        {contactUsNavLink.map((nav, index) => (
          <button
            key={index}
            className={`
                            ${
                              tabs == nav.id && "bg-white rounded-xl shadow-2xl"
                            }
                            ${nav.id == 5 && "hidden xs:block"}
                            p-2 m-2 md:m-0
                        `}
            onClick={() => {
              setTabs(nav.id);
              setTitle(nav.title[lang]);
            }}
          >
            {nav.title[lang]}
          </button>
        ))}
      </aside>
      {/* //?============================** / END formeSideBar **============================ */}
      {/* //?============================** START contactUsForm **=========================== */}
      {/* ===========================** Collaboration **============================ */}
      {tabs == 1 && <CollaborationForm lang={params.lang} title={title} />}
      {/* ==============================** Question **============================== */}
      {tabs == 2 && <QuestionForm lang={params.lang} title={title} />}
      {/* =============================** Suggestion **============================= */}
      {tabs == 3 && <SuggestionForm lang={params.lang} title={title} />}
      {/* //?===========================** / END contactUsForm **============================ */}
      {tabs == 5 && (
        <article
          className="
                    md:w-3/4 px-5 md:px-10 lg:px-16 py-10 m-2 xs:m-5 md:m-0
                    bg-gray-100 rounded-xl shadow-xl
                    flex flex-col justify-center items-center "
        >
          <div className="flex flex-col justify-center items-center mb-10">
            <Image
              src="/images/panotechFa.png"
              height={48}
              alt=" پانوتک "
              className=" rounded-lg mb-1 "
            />
          </div>
          <h2 className="text-green-700 text-2xl font-bold mb-10"> {title} </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.7674863062553!2d51.38876937640322!3d35.707338972578754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dff42c734f551%3A0x485185dfcb14a998!2sNano%20Zist%20Polymer%20Pars%20(Panotech)!5e0!3m2!1sen!2s!4v1746352950646!5m2!1sen!2s"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="w-full h-96 rounded-xl shadow-2xl border-1"
          ></iframe>
        </article>
      )}
      {tabs == 4 && (
        <article
          className="
                    md:w-3/4 px-5 md:px-10 lg:px-16 py-10 m-2 xs:m-5 md:m-0
                    bg-gray-100 rounded-xl shadow-xl
                    flex flex-col justify-center items-center "
        >
          <header className="flex flex-col justify-center items-center mb-10">
            <Image
              src="/images/panotechFa.png"
              height={48}
              alt=" پانوتک "
              className=" rounded-lg mb-1 "
            />
          </header>

          <h2 className="text-green-700 text-2xl font-bold mb-10"> {title} </h2>

          <main className="w-full h-96 p-10 rounded-xl shadow-2xl border-1 bg-green-50 text-green-900">
            {/* ================== START Contact information ================== */}
            <div className="flex flex-col w-full h-2/3 text-sm gap-5">
              <div className="flex items-center gap-5">
                <FaBuilding size={20} />
                <p
                  className="text-justify cursor-pointer"
                  onClick={() => setTabs(5)}
                >
                  {footerText.address[lang]}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <FaPhone size={20} />
                <p className="text-justify">02128428415</p>
              </div>
              <div className="flex items-center gap-5">
                <MdOutlineFax size={20} />
                <p className="text-justify">{footerText.fax[lang]}</p>
              </div>
              <div className="flex items-center gap-5">
                <MdEmail size={20} />
                <p className="text-justify">info@panotech.ir</p>
              </div>
            </div>
            {/* ================== / END Contact information ================== */}
            {/* ==================== START Social networks ==================== */}
            <div className="flex justify-center items-center h-1/3 gap-3">
              {/* location */}
              <Button
                isIconOnly
                color="text-green-900"
                onClick={() => setTabs(5)}
              >
                <FaLocationDot
                  size={30}
                  className="hover:text-red-500 transition-all duration-200 ease-linear"
                />
              </Button>
              {/* email */}
              <Tooltip
                placement="bottom"
                showArrow={true}
                content="info@Panotech.ir"
                className="bg-white text-primary"
              >
                <Link href="mailto:info@Panotech.ir" target="_blank">
                  <MdEmail
                    size={30}
                    className="hover:text-primary transition-all duration-200 ease-linear"
                  />
                </Link>
              </Tooltip>
              {/* linkedin */}
              <Tooltip
                placement="bottom"
                showArrow={true}
                content="nanozistpolymerpars"
                className="bg-[#0077B5] text-white"
                classNames={{
                  base: "before:bg-[#0077B5]",
                }}
              >
                <Link
                  href={"https://www.linkedin.com/company/nanozistpolymerpars"}
                  target="_blank"
                >
                  <FaLinkedin
                    size={30}
                    className="hover:text-[#0077B5] transition-all duration-200 ease-linear"
                  />
                </Link>
              </Tooltip>
              {/* whatsapp */}
              <Tooltip
                placement="bottom"
                showArrow={true}
                dir="ltr"
                content="+989929469332"
                className="bg-[#25D366] text-white"
                classNames={{
                  base: "before:bg-[#25D366]",
                }}
              >
                <Link href={"https://wa.me/989929469332"} target="_blank">
                  <FaWhatsapp
                    size={30}
                    className="hover:text-[#25D366] transition-all duration-200 ease-linear"
                  />
                </Link>
              </Tooltip>
              {/* Instagram */}
              <Tooltip
                dir="ltr"
                placement="bottom"
                showArrow={true}
                content="@Panotech1"
                className="bg-gradient-to-bl from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold"
                classNames={{
                  base: "before:bg-[#833ab4]",
                }}
              >
                <Link href={"https://telegram.me/panotech1"} target="_blank">
                  <FaInstagram
                    size={30}
                    className="hover:bg-gradient-to-bl from-[#833ab4] via-[#fd1d1d] to-[#fcb045] 
                    transition-all duration-200 ease-linear rounded-md hover:text-white"
                  />
                </Link>
              </Tooltip>
            </div>
            {/* ==================== / END Social networks ==================== */}
          </main>
        </article>
      )}
    </section>
  );
};

export default ContactForms;
