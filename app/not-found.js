
import { Image } from '@nextui-org/react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {

  const lang = cookies().get("NEXT_LOCALE")?.value || "fa";

  return (
    <div className="w-screen h-screen bg-green-300/50 flex flex-col items-center justify-center gap-5">
      <Image
        alt="Panotech not found"
        src="/images/notFound/Panotech404.jpg"
        title="پانوتک 404"
      />

      <h3 className="text-green-900 font-extrabold text-8xl"> 404 ! </h3>
      <h3 className="text-green-900 font-extrabold text-3xl">
        {
          (lang == "fa" && "صفحه مورد نظر یافت نشد.") ||
          (lang == "en" && "The requested page was not found.") ||
          (lang == "ar" && "لم يتم العثور على الصفحة المطلوبة.")
        }
      </h3>

      <div className="flex drop-shadow-2xl">
        <p className="text-green-900 font-bold">
          {
            (lang == "fa" && "میتوانید جستجوی خود را از") ||
            (lang == "en" && "You can follow your search from the") ||
            (lang == "ar" && "يمكنك متابعة بحثك من")
          }
        </p>
        <Link
          href={`/${lang}`}
          className="px-1 hover:text-green-300 text-green-500 font-bold underline"
        >
          {
            (lang == "fa" && "صفحه نخست") ||
            (lang == "en" && "home") ||
            (lang == "ar" && "الصفحة الرئيسية")
          }
        </Link>
        <p className="text-green-900 font-bold">
          {
            (lang == "fa" && "دنبال کنید.") ||
            (lang == "en" && "page.") ||
            (lang == "ar" && ".")
          }
        </p>
      </div>

    </div>
  );
};