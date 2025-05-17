
import React from 'react';
import FrequentlyQuestionsManager from '../../components/userComponents/FAQ/FrequentlyQuestionsManager';
import { metaDataText } from '../../data/data';

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {

    const lang = params.lang;
  
    return {
      title: {
        default: metaDataText.FAQ.title[lang],
      },
  
      description: `${metaDataText.FAQ.description[lang].substring(0, 156)} ...`,
      keywords: [...metaDataText.FAQ.keywords[lang]],
      metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/profile/frequently-questions`,
        languages: {
          fa: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/fa/profile/frequently-questions`,
          en: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/en/profile/frequently-questions`,
          ar: `${process.env.NEXT_PUBLIC_PANOTECH_BASE_URL}/ar/profile/frequently-questions`,
        },
      },
      owner: `${metaDataText.FAQ.owner[lang]}`,
      creator: `${metaDataText.FAQ.creator[lang]}`,
      openGraph: {
        title:  metaDataText.FAQ.title[lang],
        description: `${metaDataText.FAQ.description[lang].substring(0, 156)} ...`,
      },
    };
  }
//? =======================  / END generateMetadata =======================

const frequentlyQuestions = ({ params, searchParams }) => {
    return (
        <div>
            <FrequentlyQuestionsManager lang={params.lang}/>
        </div>
    );
};

export default frequentlyQuestions;