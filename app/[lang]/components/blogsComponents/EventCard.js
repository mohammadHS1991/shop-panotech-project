import { Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import Keywords from "./Keywords";
import TruncateText from "../TruncateText";

const EventCard = ({ event, lang }) => {
  return (
    <article
      className="
            leading-8 space-y-5 
            text-green-700 bg-green-50/50 border border-green-100 rounded-xl shadow-xl"
    >
      <Link href={`/${lang}/blogs/events/${event.slug[lang]}`}>
        <header className="my-5 mx-2">
          <h3 className="text-lg font-bold tracking-wider border-b-2 mx-2 ps-2 capitalize">
            {event?.title[lang]}
          </h3>
          <Keywords
            keywords={event?.keywords[lang]}
            lang={lang}
            url={"/blogs/events"}
          />
        </header>

        <main className="flex justify-between items-center">
          <div className="flex justify-center items-center w-1/2 m-2">
            <Image
              alt={event?.title[lang]}
              src={`/${event.images[0].name}`}
              shadow="sm"
              className="aspect-video"
            />
          </div>
          <div className="mx-2 xl:mx-5 w-1/2">
            <p className="text-justify drop-shadow-2xl">
              {/* {event?.firstBody[lang]} */}
              <TruncateText text={event?.firstBody[lang]} length={30} />
            </p>
          </div>
        </main>

        <footer className="text-red-500 flex justify-end mb-4 px-5">
          {(lang == "fa" && "مشاهده بیشتر") ||
            (lang == "en" && "View more") ||
            (lang == "ar" && "عرض المزيد")}
        </footer>
      </Link>
    </article>
  );
};

export default EventCard;
