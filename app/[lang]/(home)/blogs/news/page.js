
import News from '@/app/[lang]/components/blogsComponents/News';
import { metaDataText } from '@/app/[lang]/data/data';
import React from 'react';

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {
    return {
      title: {
        default: `${metaDataText.Blog.title[params.lang]} | ${metaDataText.Blog.newsTitle[params.lang]}`,
      },
      description: `${ metaDataText.Blog.description[params.lang].substring(0, 156)} ...`,
      keywords: [ ...metaDataText.Blog.keywords[params.lang]],
      metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/blogs/news`,
        languages: {
          fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/blogs/news`,
          en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/blogs/news`,
          ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/blogs/news`,
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
            <News
                type={"news"}
                category={searchParams.category || "null"}
                page={searchParams.page || 1}
                lang={params.lang}
                keyword={searchParams.keyword || "null"}
            />
        </div>
    );
};

export default page;