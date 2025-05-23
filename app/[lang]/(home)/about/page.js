
import About from '@/app/[lang]/components/contactUsAboutComponents/About';
import React from 'react';
import { metaDataText } from '../../data/data';

// export const metadata = {
//     title:' پانوتک | درباره ما ',
//     description: "Generated by create next app",
//   };

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {
    return {
      title: {
        default: metaDataText.About.title[params.lang],
      },
      description: `${ metaDataText.About.description[params.lang].substring(0, 156)} ...`,
      keywords: [ ...metaDataText.About.keywords[params.lang]],
      metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/about`,
        languages: {
          fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/about`,
          en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/about`,
          ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/about`,
        },
      },
      owner: metaDataText.About.owner[params.lang],
      creator: metaDataText.About.creator[params.lang],
      openGraph: {
        title: metaDataText.About.title[params.lang],
        description: metaDataText.About.description[params.lang],
      },
    };
  }
//? =======================  / END generateMetadata =======================

const about = ({params}) => {

    return (
        <div>
            <About params={params}/>
        </div>
    );

};

export default about;