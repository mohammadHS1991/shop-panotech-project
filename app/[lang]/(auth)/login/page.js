
import Login from '@/app/[lang]/components/authComponents/Login';
import React from 'react';
import { metaDataText } from '../../data/data';

// export const metadata = {
//     title: " ورود ",
//     description: "Generated by create next app",
//   };

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {
    return {
      title: {
        default: metaDataText.Login.title[params.lang],
      },
      description: `${ metaDataText.Login.description[params.lang].substring(0, 156)} ...`,
      keywords: [ ...metaDataText.Login.keywords[params.lang]],
      metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/login`,
        languages: {
          fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/login`,
          en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/login`,
          ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/login`,
        },
      },
      owner: metaDataText.Login.owner[params.lang],
      creator: metaDataText.Login.creator[params.lang],
      openGraph: {
        title: metaDataText.Login.title[params.lang],
        description: `${ metaDataText.Login.description[params.lang].substring(0, 156)} ...`,
      },
    };
  }
//? =======================  / END generateMetadata =======================

const login = ({params}) => {
    return (
        <div>
            <Login params={params}/>
        </div>
    );
};

export default login;