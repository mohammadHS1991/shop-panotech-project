"use client";

import React from "react";
import { profileNavLink } from "@/app/[lang]/data/data";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ImExit } from "react-icons/im";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/react";

const AdminSidbarMenu = ({ lang }) => {
  const url = usePathname();
  //? ================= START Push to home when user is logout =================
  const router = useRouter();
  const session = useSession();
  const role = session?.data?.user?.role;
  if (session.status == "unauthenticated") {
    router.push(`/${lang}`);
  }
  if (role == "user") {
    router.push(`/${lang}`);
  }
  //? ================= / END Push to home when user is logout =================
  //? ============================  START handleExit ===========================
  const handleExit = () => signOut({ redirect: false });
  //? ============================  / END handleExit ===========================

  return (
    <nav className="flex h-full pb-28">
      {/* =========================== ** START sidbar menuIcon ** =========================== */}
      <session
        className="
                lg:w-1/4 me-3 mt-20 lg:mt-0 lg:me-0 p-3 py-16
                flex flex-col justify-around items-center
                font-bold text-2xl text-white
                bg-green-500 rounded-e-full"
      >
        {profileNavLink?.map((link, index) => (
          <Tooltip
            key={index}
            color="success"
            placement="left-start"
            content={link.title[lang]}
            className="lg:hidden"
          >
            <Link href={`/${lang}${link.href}`}>{link.icon}</Link>
          </Tooltip>
        ))}
        <Tooltip
          color="danger"
          placement="left-start"
          className="lg:hidden"
          content={
            (lang == "fa" && "خروج") ||
            (lang == "en" && "Exit") ||
            (lang == "ar" && "مخرج")
          }
        >
          <button onClick={handleExit}>
            {" "}
            <ImExit />{" "}
          </button>
        </Tooltip>
      </session>
      {/* =========================== ** / END sidbar menuIcon ** =========================== */}
      {/* ============================= ** START sidbar menu ** ============================= */}
      <section
        className="
                w-3/4 py-16
                flex flex-col justify-around
                font-bold text-xl text-green-900"
      >
        {profileNavLink?.map((link, index) => (
          <Link
            key={index}
            href={`/${lang}${link.href}`}
            className={`${
              url == `/${lang}${link.href}`
                ? "border-e-4 border-green-500 text-green-500"
                : ""
            }
                            hidden lg:flex justify-center `}
          >
            {link.title[lang]}
          </Link>
        ))}
        <button
          onClick={handleExit}
          className="text-red-500 py-2 hidden lg:flex justify-center"
        >
          {(lang == "fa" && "خروج") ||
            (lang == "en" && "Exit") ||
            (lang == "ar" && "مخرج")}
        </button>
      </section>
      {/* ============================= ** / END sidbar menu ** ============================= */}
    </nav>
  );
};

export default AdminSidbarMenu;
