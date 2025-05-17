
import React from 'react';
import UserProfile from '../components/userComponents/UserProfile';
import { metaDataText } from '../data/data';

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: {
      default: metaDataText.profile.title[params.lang],
    },

    description: `${metaDataText.profile.description[params.lang].substring(0, 156)} ...`,
    keywords: [...metaDataText.profile.keywords[params.lang]],
    metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/profile`,
      languages: {
        fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/profile`,
        en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/profile`,
        ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/profile`,
      },
    },
    owner: `${metaDataText.profile.owner[params.lang]}`,
    creator: `${metaDataText.profile.creator[params.lang]}`,
    openGraph: {
      title:  metaDataText.profile.title[params.lang],
      description: `${metaDataText.profile.description[params.lang].substring(0, 156)} ...`,
    },
  };
}
//? =======================  / END generateMetadata =======================

const admin = ({ params, searchParams }) => {
    return (
        <div>
            <UserProfile params={params}/>
        </div>
    );
};

export default admin;