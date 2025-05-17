"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Badge, Button } from "@nextui-org/react";
import { adminHeaderText, navLink } from "@/app/[lang]/data/data";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import SearchModal from "./SearchModal";
import SelectLang from "./SelectLang";
import { getReferencedLocalCart } from "../../reducers/localCartSlice";
import { selectUserById } from "../../reducers/userSlice";

const Header = ({ params }) => {
  const lang = params.lang;
  const url = usePathname();
  const session = useSession();
  const userId = session?.data?.user?.id;
  const role = session?.data?.user?.role;
  const [openMenu, setOpenMenu] = useState(true);

  //? ================================  START useSelector ================================
  const localCartQty = useSelector(getReferencedLocalCart).reduce(
    (value, cartItem) => value + cartItem.qty,
    0
  );
  const userCartQty = useSelector((state) =>
    selectUserById(state, userId)
  )?.openCart?.reduce((value, cartItem) => value + cartItem.qty, 0);
  //? ================================  / END useSelector ================================
  //? ================================  START handleExit =================================
  const handleExit = () =>
    signOut({ redirect: false, callbackUrl: `/${lang}` });
  //? ================================  / END handleExit =================================

  return (
    <>
      <div className="h-24 lg:h-48 xl:h-24"></div>{" "}
      {/* //! this div is under the menu bar */}
      <header
        className="
        flex flex-col xl:flex-row justify-evenly items-center
        bg-white shadow-xl
        h-24 lg:h-48 xl:h-24
        fixed top-0 left-0 right-0 z-50"
      >
        {/* ========================================** START main menu **======================================== */}
        <nav className="space-x-4 hidden lg:flex items-center">
          {/* ========== logo ========== */}
          <Link
            className="me-10 rounded-lg hover:shadow-md hover:shadow-green-100"
            href={`/${lang}`}
          >
            <Image
              src="/images/panotech.jpg"
              width={236}
              height={48}
              alt=" پانوتک "
              className=" rounded-lg "
            />
          </Link>
          {/* ========== maiin menu ========== */}
          {navLink &&
            navLink.map((link) => {
              return (
                <Link
                  key={link.id}
                  href={`/${lang}${link.href}`}
                  title={link.title[lang]}
                  // rel='nofollow noindex'
                  className={
                    url === `/${lang}` && link.href === "/"
                      ? link.className2
                      : url.includes(link.href) && link.href !== "/"
                      ? link.className2
                      : link.className1
                  }
                >
                  {link.title[lang]}
                </Link>
              );
            })}
          {/* ========== select lang ========== */}
          <SelectLang />
        </nav>
        {/* ========================================** / END main menu **======================================== */}
        <div className="hidden lg:flex justify-between">
          {/* ========================================** START search & shoping & user **======================================== */}
          <div className="flex justify-center items-center space-x-2">
            {/* ==========  search  ========== */}
            <SearchModal lang={lang} />
            {/* ==========  shopping  ========== */}
            <Badge
              content={
                session.status === "authenticated"
                  ? userCartQty > 0 && userCartQty
                  : localCartQty > 0 && localCartQty
              }
              color="danger"
              placement="top-right"
            >
              <Link href={`/${lang}/cart`}>
                <FaShoppingCart
                  className={
                    url == "/cart"
                      ? "text-green-500 text-2xl"
                      : "text-gray-500 hover:text-gray-900 text-2xl"
                  }
                />
              </Link>
            </Badge>
            {/* ==========  user  ========== */}
            {session.status === "authenticated" ? (
              <Link
                href={role == "user" ? `/${lang}/profile` : `/${lang}/admin`}
                className="flex justify-between items-center"
              >
                <FaUser className="text-gray-500 hover:text-gray-900 text-lg ms-2" />
                <p className="text-gray-500 font-semibold hover:text-gray-900 ms-1">
                  {adminHeaderText.welcome[lang] +
                    " " +
                    session.data.user.firstName +
                    " " +
                    session.data.user.lastName}
                </p>
              </Link>
            ) : (
              <div className="flex justify-between items-center">
                <FaUser className="text-gray-500 hover:text-gray-900 text-lg ms-2" />
                <p className="text-gray-500 font-semibold hover:text-gray-900 ms-1">
                  {adminHeaderText.logoutStatus[lang]}
                </p>
              </div>
            )}
          </div>
          {/* ========================================** /END search & shoping & user **======================================== */}
          {/* ========================================** START login & register **======================================== */}
          {session.status === "authenticated" ? (
            <div className="flex">
              <button
                onClick={handleExit}
                className="shadow-lg hover:shadow-red-500 rounded-lg ms-2 w-20 h-11 text-center py-1 text-white hover:text-red-900 font-semibold bg-green-500 hover:bg-red-500"
              >
                {(lang == "fa" && "خروج ") ||
                  (lang == "en" && "Exit") ||
                  (lang == "ar" && "مخرج")}
              </button>
            </div>
          ) : (
            <div className="flex">
              <Link href={`/${lang}/login`}>
                <button
                  className="
                  rounded-lg w-20 h-11 py-1 me-1
                  text-center text-gray-500 font-semibold
                  hover:text-white hover:bg-green-200"
                >
                  {(lang == "fa" && "ورود") ||
                    (lang == "en" && "Login") ||
                    (lang == "ar" && "الدخول")}
                </button>
              </Link>
              <Link href={`/${lang}/register`}>
                <button
                  className="
                  rounded-lg w-20 h-11 py-1
                  shadow-lg hover:shadow-green-200 bg-green-500 hover:bg-green-300
                  text-center text-white font-semibold"
                >
                  {(lang == "fa" && "عضویت") ||
                    (lang == "en" && "Register") ||
                    (lang == "ar" && "عضوية")}
                </button>
              </Link>
            </div>
          )}
          {/* ========================================** /END login & register **======================================== */}
        </div>
        {/* ========================================** START responsive burger menu **======================================== */}
        <div className="flex lg:hidden justify-around items-center w-screen">
          {/* ====== START panotechLOGO ====== */}
          <Link
            className="me-10 rounded-lg hover:shadow-md hover:shadow-green-100"
            href={`/${lang}`}
          >
            <Image
              src="/images/panotech.jpg"
              width={236}
              height={48}
              alt=" پانوتک "
              className=" rounded-lg "
            />
          </Link>
          {/* ===== / END panotechLOGO ======= */}
          <div className="flex items-center p-2 px-6">
            {/* ===== START flag & search ====== */}
            <div className="hidden xs:flex items-center">
              <SearchModal lang={lang} />
              <SelectLang />
            </div>
            {/* ===== / END flag & search ====== */}
            {/* ===== START burgerMenu BTN ===== */}
            <button onClick={() => setOpenMenu(!openMenu)}>
              {openMenu ? (
                <TiThMenu className="w-8 h-8 mr-10 text-green-700 hover:text-green-600 " />
              ) : (
                <ImCross className="w-6 h-6 mr-10 text-green-700 hover:text-green-600 " />
              )}
            </button>
            {/* ===== / END burgerMenu BTN ===== */}
          </div>
        </div>
        {/* ========================================** / END responsive burger menu **======================================== */}
      </header>
      {/* ========================================** START burger menu list **======================================== */}
      <nav
        className={`
          bg-white shadow-2xl rounded-xl
          text-start
          mx-px xs:mx-10 sm:mx-20 mt-px w-8/12 xs:w-6/12 sm:w-4/12 md:w-3/12
          fixed z-50 end-0
          ${!openMenu ? "flex" : "hidden"} flex-col lg:hidden
        `}
      >
        {/* ===== START login-register ===== */}
        {session.status === "authenticated" ? (
          <Link
            href={role == "user" ? `/${lang}/profile` : `/${lang}/admin`}
            className="flex rounded-xl font-bold text-lg text-gray-500 hover:text-white hover:bg-green-700 p-2 px-6"
          >
            <FaUser className="me-2" />
            <p>
              {session.data.user.firstName} {session.data.user.lastName}
            </p>
          </Link>
        ) : (
          <Link href={`/${lang}/login`}>
            <button className="flex justify-center items-center rounded-lg w-full h-11 py-1 me-1 text-white font-bold bg-green-500 hover:bg-green-200">
              <FaUser className="me-2" />
              {(lang == "fa" && "ورود") ||
                (lang == "en" && "Login") ||
                (lang == "ar" && "الدخول")}
            </button>
          </Link>
        )}
        {/* ===== / END login-register ===== */}
        {/* ========== START Cart ========== */}
        <Link
          href={`/${lang}/cart`}
          className="flex rounded-xl font-bold text-lg text-gray-500 hover:text-white hover:bg-green-700 p-2 px-6"
        >
          <FaShoppingCart className="me-2" />
          {(lang == "fa" && "سبدخرید") ||
            (lang == "en" && "Cart") ||
            (lang == "ar" && "التسوق")}
        </Link>
        {/* ========== / END Cart ========== */}
        {/* ===== START flag & search ====== */}
        <div className="flex xs:hidden items-center p-2 px-6">
          <SearchModal lang={lang} />
          <SelectLang />
        </div>
        {/* ===== / END flag & search ====== */}
        <hr />
        {/* ===== START main menu ====== */}
        {navLink &&
          navLink.map((link, index) => {
            return (
              <Link
                key={index}
                href={`/${lang}${link.href}`}
                className="
                rounded-xl font-bold text-xl text-gray-500 hover:text-white hover:bg-green-700
                p-2 px-6"
              >
                {link.title[lang]}
              </Link>
            );
          })}
        {/* ===== / END main menu ====== */}
        {/* ===== START exit btn ====== */}
        {session.status === "authenticated" && (
          <Button onClick={handleExit} color="danger">
            {(lang == "fa" && "خروج") ||
              (lang == "en" && "Exit") ||
              (lang == "ar" && "مخرج")}
          </Button>
        )}
        {/* ===== / END exit btn ====== */}
      </nav>
      {/* ========================================** / END burger menu list **======================================== */}
    </>
  );
};

export default Header;
