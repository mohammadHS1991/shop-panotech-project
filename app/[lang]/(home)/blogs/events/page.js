
import Event from '@/app/[lang]/components/blogsComponents/Event';
import { metaDataText } from '@/app/[lang]/data/data';
import React from 'react';

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {
    return {
      title: {
        default: `${metaDataText.Blog.title[params.lang]} | ${metaDataText.Blog.eventTitle[params.lang]}`,
      },
      description: `${ metaDataText.Blog.description[params.lang].substring(0, 156)} ...`,
      keywords: [ ...metaDataText.Blog.keywords[params.lang]],
      metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/blogs/events`,
        languages: {
          fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/blogs/events`,
          en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/blogs/events`,
          ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/blogs/events`,
        },
      },
      owner: metaDataText.Blog.owner[params.lang],
      creator: metaDataText.Blog.creator[params.lang],
      openGraph: {
        title: metaDataText.Blog.title[params.lang],
        description: metaDataText.Blog.description[params.lang],
      },
    };
  }
//? =======================  / END generateMetadata =======================

const page = ({ params, searchParams }) => {
    return (
        <div>
            <Event
                type={"events"}
                category={searchParams.category || "null"}
                page={searchParams.page || 1}
                lang={params.lang}
                keyword={searchParams.keyword || "null"}
            />
        </div>
    );
};

export default page;