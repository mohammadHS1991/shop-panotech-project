import { Image } from "@nextui-org/react";
import React from "react";
import Keywords from "./Keywords";
import TruncateText from "../TruncateText";

const NewsCard = ({ news, lang, keywords }) => {
  return (
    <article className="bg-gray-50 border-2 border-green-300 rounded-2xl my-5 sm:flex xs:p-5 sm:p-3 xl:p-5">
      <section
        className="
                xs:border-1 sm:border-none border-green-300 rounded-2xl
                xs:shadow-md shadow-green-200
                bg-green-50 aspect-video
                p-2 sm:w-1/2 lg:w-1/3"
      >
        <Image
          alt={news?.title[lang]}
          src={`/${news.images[0].name}`}
          shadow="sm"
        />
      </section>
      <section
        className="
                text-green-700
                bg-gray-100 rounded-2xl
                m-2 xs:m-0 xs:mt-2 sm:mt-0 sm:ms-2 xl:ms-4 p-2 xs:p-5 sm:p-2 lg:p-5 sm:w-1/2 lg:w-2/3"
      >
        <header className="border-b-2 border-green-500 pb-2">
          <h3 className="text-lg font-bold tracking-wider ms-2 ps-2 capitalize">
            {news?.title[lang]}
          </h3>
          <Keywords keywords={keywords} lang={lang} url={"/blogs/news"} />
        </header>
        <main className="my-2">
          <p
            className="
                        leading-8 space-y-5 drop-shadow-2xl
                        px-5 xl:px-10 w-3/4"
          >
            {/* {news?.firstBody[lang]} */}
            <TruncateText text={news?.firstBody[lang]} length={100} />
          </p>
          <div className="text-red-500 flex justify-end px-5">
            {(lang == "fa" && "مشاهده بیشتر") ||
              (lang == "en" && "View more") ||
              (lang == "ar" && "عرض المزيد")}
          </div>
        </main>
      </section>
    </article>
  );
};

export default NewsCard;
