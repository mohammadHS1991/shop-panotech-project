"use client";

import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import {
  FaBuilding,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail, MdOutlineFax } from "react-icons/md";
import { footerText } from "../../data/data";

const Footer = ({ lang }) => {
  return (
    <footer className="flex justify-evenly items-center bg-green-800 text-white h-60">
      <div className="flex justify-evenly container items-center">
        {/* ==================== START Contact information ==================== */}
        <div className="basis-1/5 hidden lg:block">
          <div className="flex flex-col h-full w-full text-sm gap-5">
            <div className="flex items-center gap-5">
              <FaBuilding size={30} />
              <p className="text-justify">{footerText.address[lang]}</p>
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
        </div>
        {/* ==================== / END Contact information ==================== */}
        {/* ==================== START Social networks ==================== */}
        <div className="basis-11/12 lg:basis-2/5 flex flex-col justify-evenly items-center gap-3">
          <p className="text-center leading-8">
            {" "}
            {footerText.text1[lang]} <br /> {footerText.text2[lang]}{" "}
          </p>
          <div className="flex justify-normal items-center gap-3">
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
                  className="hover:text-white transition-all duration-200 ease-linear"
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
              id="instagram"
              dir="ltr"
              placement="bottom"
              showArrow={true}
              content="@Panotech"
              className="bg-gradient-to-bl from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold"
              classNames={{
                base: "before:bg-[#833ab4]",
              }}
            >
              <Link
                href="https://instagram.com/panotech"
                target="_blank"
                className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              >
                <FaInstagram
                  size={30}
                  className="hover:bg-gradient-to-bl from-[#833ab4] via-[#fd1d1d] to-[#fcb045] 
            transition-all duration-200 ease-linear rounded-md"
                />
              </Link>
            </Tooltip>
          </div>
        </div>
        {/* ==================== / END Social networks ==================== */}
        {/* ==================== START Brands ==================== */}
        <div className="basis-1/5 hidden lg:flex flex-col items-center justify-center leading-8">
          <Link href={`/${lang}`}> {footerText.nanozist[lang]} </Link>
          {/* <Link href={`/${lang}`}> {footerText.hime[lang]} </Link> */}
          <Link href={`/${lang}/faq`}> {footerText.faq[lang]} </Link>
        </div>
        {/* ==================== / END Brands ==================== */}
      </div>
    </footer>
  );
};

export default Footer;
