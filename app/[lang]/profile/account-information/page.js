
import React from 'react';
import AccountInformation from '../../components/userComponents/AccountInformation/AccountInformation';
import { metaDataText } from '../../data/data';

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: {
      default: metaDataText.accountInformation.title[params.lang],
    },

    description: `${metaDataText.accountInformation.description[params.lang].substring(0, 156)} ...`,
    keywords: [...metaDataText.accountInformation.keywords[params.lang]],
    metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/profile/account-information`,
      languages: {
        fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/profile/account-information`,
        en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/profile/account-information`,
        ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/profile/account-information`,
      },
    },
    owner: `${metaDataText.accountInformation.owner[params.lang]}`,
    creator: `${metaDataText.accountInformation.creator[params.lang]}`,
    openGraph: {
      title:  metaDataText.accountInformation.title[params.lang],
      description: `${metaDataText.accountInformation.description[params.lang].substring(0, 156)} ...`,
    },
  };
}
//? =======================  / END generateMetadata =======================

const accountInformation = ({params}) => {
    return (
        <>
            <AccountInformation params={params}/>
        </>
    );
};

export default accountInformation;