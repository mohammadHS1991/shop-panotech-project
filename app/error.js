"use client"; // Error components must be Client Components

import React from 'react';
import { Button, Image } from '@nextui-org/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Error({ error, reset }) {
  const lang = useParams().lang || "fa";
  return (
    <div className="w-screen h-screen bg-red-300/50 flex flex-col items-center justify-center gap-5">
      <Image
        alt="Panotech Error"
        src="/images/error/error.jpg"
        title="پانوتک ارور"
      />

      <h3 className="text-red-900 font-extrabold text-3xl">
        {
          (lang == "fa" && "مشکلی پیش آمده است !") ||
          (lang == "en" && "There is a problem!") ||
          (lang == "ar" && "هناك مشكلة!")
        }
      </h3>

      <div className="flex drop-shadow-2xl">
        <p className="text-red-900 font-bold">
          {
            (lang == "fa" && "میتوانید جستجوی خود را از") ||
            (lang == "en" && "You can follow your search from the") ||
            (lang == "ar" && "يمكنك متابعة بحثك من")
          }
        </p>
        <Link
          href={`/${lang}`}
          className="px-1 hover:text-red-300 text-red-500 font-bold underline"
        >
          {
            (lang == "fa" && "صفحه نخست") ||
            (lang == "en" && "home") ||
            (lang == "ar" && "الصفحة الرئيسية")
          }
        </Link>
        <p className="text-red-900 font-bold">
          {
            (lang == "fa" && "دنبال کنید.") ||
            (lang == "en" && "page.") ||
            (lang == "ar" && ".")
          }
        </p>
      </div>

      <Button
        className='font-bold bg-red-500 text-red-900 hover:bg-red-500/50 hover:text-white'
        onClick={() => reset()}
      >
        {
          (lang == "fa" && "مجدد تلاش کنید.") ||
          (lang == "en" && "Try again.") ||
          (lang == "ar" && "حاول ثانية..")
        }
      </Button>
    </div>
  );
};