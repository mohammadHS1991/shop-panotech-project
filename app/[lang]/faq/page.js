import FAQ from "@/app/[lang]/components/FAQ/FAQ";
import React from "react";
import { metaDataText } from "../data/data";

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {

  const lang = params.lang;

  return {
    title: {
      default: metaDataText.FAQ.title[lang],
    },

    description: `${metaDataText.FAQ.description[lang].substring(0, 156)} ...`,
    keywords: [...metaDataText.FAQ.keywords[lang]],
    metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/FAQ`,
      languages: {
        fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/FAQ`,
        en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/FAQ`,
        ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/FAQ`,
      },
    },
    owner: `${metaDataText.FAQ.owner[lang]}`,
    creator: `${metaDataText.FAQ.creator[lang]}`,
    openGraph: {
      title:  metaDataText.FAQ.title[lang],
      description: `${metaDataText.FAQ.description[lang].substring(0, 156)} ...`,
    },
  };
}
//? =======================  / END generateMetadata =======================

const frequentlyQuestions = ({ params, searchParams }) => {
  return (
    <div>
      <FAQ searchParams={searchParams} lang={params.lang}/>
    </div>
  );
};

export default frequentlyQuestions;
