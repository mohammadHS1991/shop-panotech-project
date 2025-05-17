
import React from 'react';
import Orders from '../../components/userComponents/Orders';
import { metaDataText } from '../../data/data';

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {
    return {
      title: {
        default: metaDataText.orders.title[params.lang],
      },
  
      description: `${metaDataText.orders.description[params.lang].substring(0, 156)} ...`,
      keywords: [...metaDataText.orders.keywords[params.lang]],
      metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/profile/orders`,
        languages: {
          fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/profile/orders`,
          en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/profile/orders`,
          ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/profile/orders`,
        },
      },
      owner: `${metaDataText.orders.owner[params.lang]}`,
      creator: `${metaDataText.orders.creator[params.lang]}`,
      openGraph: {
        title:  metaDataText.orders.title[params.lang],
        description: `${metaDataText.orders.description[params.lang].substring(0, 156)} ...`,
      },
    };
  }
  //? =======================  / END generateMetadata =======================

const orders = ({params}) => {
    return (
        <div>
            <Orders params={params}/>
        </div>
    );
};

export default orders;