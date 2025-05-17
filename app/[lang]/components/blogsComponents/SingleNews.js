import React from "react";
import { GetNewsBySlugFunction } from "../../functions";
import DateShow from "../DateShow";
import ImageModal from "./ImageModal";
import { notFound } from "next/navigation";

const SingleNews = async ({ params }) => {
  const lang = params.lang;
  const news = await GetNewsBySlugFunction(lang, params.newsSlug);
  if (!news) notFound();

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
          {news?.title[lang]}
        </h1>
        <div className="flex gap-4 pe-8 text-gray-300 text-sm">
          <DateShow date={news?.date} lang={lang} />
        </div>
      </header>

      <main
        className="
                indent-10 leading-8 space-y-5 
                px-5 lg:px-10 xl:px-20 py-10 mb-20 mx-2 xs:mx-5 lg:mx-10 xl:mx-40
                text-green-700 bg-green-50/50 border border-green-100 rounded-xl shadow-xl"
      >
        <p className="text-justify drop-shadow-2xl">{news?.firstBody[lang]}</p>
        <div className="flex justify-center items-center md:w-1/2 mx-auto">
          <ImageModal src={`/${news.images[0].name}`} alt={news?.title[lang]} />
        </div>
        <div
          className={`text-justify leading-8 prose prose-headings:!text-green-700 prose-strong:!text-inherit prose-p:!text-green-700
            !max-w-full !text-primary w-full prose-a:!text-green-700 drop-shadow-2xl`}
          dangerouslySetInnerHTML={{ __html: news.secondBody[lang] }}
        ></div>
        {/* <p className="text-justify drop-shadow-2xl">
                    {news?.secondBody[lang]}
                </p> */}
      </main>
    </>
  );
};

export default SingleNews;
