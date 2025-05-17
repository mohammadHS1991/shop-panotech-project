"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem, Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaPlusCircle } from "react-icons/fa";
import { TbMessage2Question } from "react-icons/tb";
import { useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import { selectAllFaqs } from "../../reducers/faqSlice";
import { faqText } from "../../data/data";

const FAQ = ({ searchParams, lang }) => {
  const [search, setSearch] = useState();

  const url = usePathname();
  const router = useRouter();

  //? ========================  START useSelector  ========================
  const FAQdata = useSelector(selectAllFaqs);
  //? ========================  / END useSelector  ========================

  return (
    <article className="bg-[url('/images/FAQ/darkFAQ.png')] bg-center bg-contain lg:bg-cover bg-fixed min-h-screen">

      <header className="bg-[url('/images/FAQ/FAQcover.jpg')] bg-center bg-fixed bg-cover">
        {/* ========== logo & icons ========== */}
        <div className="flex justify-between">

          <div className="flex">
            <Link href={`/${lang}`} className="m-2">
              <FaHome className="text-2xl text-gray-200/50" />
            </Link>
            <Link href={`/${lang}/contact-us`} className="m-2">
              <TbMessage2Question className="text-2xl text-gray-200/50" />
            </Link>
          </div>

          <Link
            className=""
            href={`/${lang}`}
          >
            <Image
              src="/images/FAQ/panotech.png"
              width={236}
              height={48}
              alt=" پانوتک "
              className=""
            />
          </Link>

        </div>
        {/* ========== search form ========== */}
        <form className="text-center pt-14 pb-28">
          <input
            type="search"
            placeholder= {faqText.searchTitle[lang]}
            onChange={(e) => {
              // setSearch(e.target.value);
              if (e.target.value.length === 0) {
                router.replace(`${url}`);
              } else {
                router.push(`${url}?search=${e.target.value}&page=1`);
              }
            }}
            className="bg-gray-200/50 text-green-800 placeholder:text-green-800/50 font-bold rounded-xl w-3/4 xl:w-2/4 h-14 p-4 mb-1 md:me-1"
          />
        </form>
      </header>

      <main >
        <Accordion variant="splitted">
          {FAQdata && FAQdata.map((question, index) =>
            // question.title[lang].search(search) == 0 &&
            // question.title[lang].match(search) &&
            question?.title[lang].match(searchParams.search) &&
            (
              <AccordionItem key={index}
                aria-label="Accordion 1"
                title={question?.title[lang]}
                indicator={({ isOpen }) =>
                  isOpen ? <MdCancel /> : <FaPlusCircle />
                }
                className="
                bg-green-200/30 rounded-3xl
                text-green-600
                mx-2 xs:mx-5 sm:mx-10 md:mx-20 xl:mx-40 my-2 sm:my-4 px-10"
              >
                {question?.body[lang]}
              </AccordionItem>
            )
          )}
        </Accordion>
      </main>

    </article>
  );
};

export default FAQ;
