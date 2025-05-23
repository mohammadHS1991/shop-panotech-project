import SingleEvent from "@/app/[lang]/components/blogsComponents/SingleEvent";
import { metaDataText } from "@/app/[lang]/data/data";
import { GetEventBySlugFunction } from "@/app/[lang]/functions";
import { notFound } from "next/navigation";
import React from "react";

// export const metadata = {
//     title:' پانوتک | وبلاگ | رویداد ',
//     description: "Generated by create next app",
//   };

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {
  const lang = params.lang;
  const event = await GetEventBySlugFunction(lang, params.eventSlug);
  if (!event) notFound();

  return {
    title: {
      default: `
      ${event.title[lang]} |
      ${metaDataText.Blog.eventTitle[params.lang]} |
      ${metaDataText.Blog.title[params.lang]} 
        `,
    },
    description: `${event.firstBody[params.lang].substring(0, 156)} ...`,
    keywords: [...event.keywords[params.lang]],
    metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/blogs/events/${event.slug.fa}`,
      languages: {
        fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/blogs/events/${event.slug.fa}`,
        en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/blogs/events/${event.slug.en}`,
        ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/blogs/events/${event.slug.ar}`,
      },
    },
    openGraph: {
      images: [`/${event.images[0].name}`],
      title: event.title[params.lang],
      description: `${event.firstBody[params.lang].substring(0, 156)} ...`,
    },
  };
}
//? =======================  / END generateMetadata =======================

const blog = ({ params, searchParams }) => {
  return (
    <div>
      <SingleEvent params={params} />
    </div>
  );
};

export default blog;
