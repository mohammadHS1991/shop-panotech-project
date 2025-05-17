"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const SelectLang = () => {
  const [display, setDisplay] = useState("hidden");
  const router = useRouter();
  const path = usePathname();
  const [langCookie, setLangCookie] = useState(
    ["fa", "ar", "en"].some((item) => item === path.split("/")[1])
      ? path.split("/")[1]
      : null || Cookies.get("NEXT_LOCALE") || "fa"
  );

  const [src, setSrc] = useState("");
  useEffect(() => {
    setSrc(
      (langCookie === "fa" && "/flags/ir.svg") ||
        (langCookie === "en" && "/flags/gb.svg") ||
        (langCookie === "ar" && "/flags/sa.svg")
    );
    document.cookie = `NEXT_LOCALE=${path.split("/")[1]}; path=/;max-age=${
      365 * 24 * 60 * 60
    }`; // Set cookie
  }, []);

  const changeLanguage = (locale) => {
    const arr = path.split("/");
    arr[1] = locale;
    document.cookie = `NEXT_LOCALE=${locale}; path=/;max-age=${
      365 * 24 * 60 * 60
    }`; // Set cookie
    router.push(arr.join("/")); // Change route with new locale
    router.refresh();
  };

  return (
    <div className="relative">
      <img
        src={src}
        alt={src}
        className="w-6 cursor-pointer"
        onClick={() => {
          setDisplay(display === "hidden" ? "flex" : "hidden");
        }}
      />
      <ul
        className={`${display} flex-col gap-1 p-1 border rounded-lg w-9 justify-center items-center list-none absolute
        -right-[6px] md:-left-[6px] top-[22px] transition-all duration-1000 ease-out bg-success/30 z-50`}
      >
        <li
          className="cursor-pointer"
          onClick={() => {
            setSrc("/flags/ir.svg");
            setDisplay("hidden");
            changeLanguage("fa");
          }}
        >
          <img src="/flags/ir.svg" alt="fa" className="w-8" />
        </li>
        <li
          className="cursor-pointer"
          onClick={() => {
            setSrc("/flags/gb.svg");
            setDisplay("hidden");
            changeLanguage("en");
          }}
        >
          <img src="/flags/gb.svg" alt="en" className="w-8" />
        </li>
        <li
          className="cursor-pointer"
          onClick={() => {
            setSrc("/flags/sa.svg");
            setDisplay("hidden");
            changeLanguage("ar");
          }}
        >
          <img src="/flags/sa.svg" alt="ar" className="w-8" />
        </li>
      </ul>
    </div>
  );
};

export default SelectLang;
