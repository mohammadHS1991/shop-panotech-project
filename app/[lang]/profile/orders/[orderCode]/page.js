
import Order from '@/app/[lang]/components/userComponents/Order';
import { metaDataText } from '@/app/[lang]/data/data';
import React from 'react';

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {

    const orderCode = decodeURIComponent(params.orderCode);
  
    return {
      title: {
        default: `${metaDataText.order.title[params.lang]} ${orderCode}`,
        // default: metaDataText.order.title[params.lang],
      },
  
      description: `${metaDataText.order.description[params.lang].substring(0, 156)} ...`,
      keywords: [...metaDataText.order.keywords[params.lang]],
      metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/profile/orders/${orderCode}`,
        languages: {
          fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/profile/orders/${orderCode}`,
          en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/profile/orders/${orderCode}`,
          ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/profile/orders/${orderCode}`,
        },
      },
      owner: `${metaDataText.order.owner[params.lang]}`,
      creator: `${metaDataText.order.creator[params.lang]}`,
      openGraph: {
        title:  metaDataText.order.title[params.lang],
        description: `${metaDataText.order.description[params.lang].substring(0, 156)} ...`,
      },
    };
  }
  //? =======================  / END generateMetadata =======================

const order = ({params}) => {
    return (
        <div>
            <Order params={params}/>
        </div>
    );
};

export default order;