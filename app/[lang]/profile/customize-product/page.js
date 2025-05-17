
import React from 'react';
import CustomizeProduct from '../../components/userComponents/CustomizeProduct/CustomizeProduct';
import { metaDataText } from '../../data/data';

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {

  const lang = params.lang;

  return {
    title: {
      default: metaDataText.customizeProduct.title[lang],
    },

    description: `${metaDataText.customizeProduct.description[lang].substring(0, 156)} ...`,
    keywords: [...metaDataText.customizeProduct.keywords[lang]],
    metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/profile/customize-product`,
      languages: {
        fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/profile/customize-product`,
        en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/profile/customize-product`,
        ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/profile/customize-product`,
      },
    },
    owner: `${metaDataText.customizeProduct.owner[lang]}`,
    creator: `${metaDataText.customizeProduct.creator[lang]}`,
    openGraph: {
      title:  metaDataText.customizeProduct.title[lang],
      description: `${metaDataText.customizeProduct.description[lang].substring(0, 156)} ...`,
    },
  };
}
//? =======================  / END generateMetadata =======================

const customizeProduct = ({params}) => {
    return (
        <div>
            <CustomizeProduct params={params}/>
        </div>
    );
};

export default customizeProduct;