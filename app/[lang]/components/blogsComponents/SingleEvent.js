import React from "react";
import { GetEventBySlugFunction } from "../../functions";
import DateShow from "../DateShow";
import Keywords from "./Keywords";
import ImageModal from "./ImageModal";
import { notFound } from "next/navigation";

const SingleEvent = async ({ params }) => {
  const lang = params.lang;

  const event = await GetEventBySlugFunction(lang, params.eventSlug);
  if (!event) notFound();

  return (
    <>
      <header
        className="
                flex justify-between items-center
                mt-10 mb-2 mx-2 xs:mx-5 lg:mx-10 xl:mx-40
                bg-green-50/80 border border-green-200 rounded-xl shadow-xl"
      >
        <h1
          className="p-5
                    text-green-600 text-lg font-bold tracking-wider capitalize"
        >
          {event?.title[lang]}
        </h1>
        {/* <Keywords keywords={event?.keywords[lang]} lang={lang} url={'/blogs/events'}/> */}
        <div className="flex gap-4 pe-8 text-gray-300 text-sm">
          <DateShow date={event?.date} lang={lang} />
        </div>
      </header>

      <main
        className="
                indent-10 leading-8 space-y-5 
                px-5 lg:px-10 xl:px-20 py-10 mb-20 mx-2 xs:mx-5 lg:mx-10 xl:mx-40
                text-green-700 bg-green-50/50 border border-green-100 rounded-xl shadow-xl"
      >
        <p className="text-justify drop-shadow-2xl">{event?.firstBody[lang]}</p>
        <div className="flex justify-center items-center md:w-1/2 mx-auto">
          <ImageModal
            src={`/${event.images[0].name}`}
            alt={event?.title[lang]}
          />
        </div>
        <div
          className={`text-justify leading-8 prose prose-headings:!text-green-800 prose-strong:!text-inherit prose-p:!text-green-800
                        !max-w-full !text-primary w-full prose-a:!text-green-800 drop-shadow-2xl`}
          dangerouslySetInnerHTML={{ __html: event.secondBody[lang] }}
        ></div>
        {/* <p className="text-justify drop-shadow-2xl">
                    {event?.secondBody[lang]}
                </p> */}
      </main>
    </>
  );
};

export default SingleEvent;
