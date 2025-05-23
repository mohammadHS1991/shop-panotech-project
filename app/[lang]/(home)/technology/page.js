
import Technology from '@/app/[lang]/components/technologyComponents/Technology';
import React from 'react';
import { metaDataText } from '../../data/data';

// export const metadata = {
//     title:' پانوتک | فناوری ',
//     description: "Generated by create next app",
// };

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: {
      default: metaDataText.Technology.title[params.lang],
    },
    description: `${ metaDataText.Technology.description[params.lang].substring(0, 156)} ...`,
    keywords: [ ...metaDataText.Technology.keywords[params.lang]],
    metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/technology`,
      languages: {
        fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/technology`,
        en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/technology`,
        ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/technology`,
      },
    },
    owner: metaDataText.Technology.owner[params.lang],
    creator: metaDataText.Technology.creator[params.lang],
    openGraph: {
      title: metaDataText.Technology.title[params.lang],
      description: metaDataText.Technology.description[params.lang],
    },
  };
}
//? =======================  / END generateMetadata =======================

const technology = ({params}) => {
    return (
        <div>
            <Technology params={params}/>
        </div>
    );
};

export default technology;