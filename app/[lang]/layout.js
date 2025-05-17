import { GoogleAnalytics } from "@next/third-parties/google";
import { metaDataText } from "./data/data";

//? ======================= START generateMetadata =======================
export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: {
      default: `${metaDataText.MainLayout.defaultTitle[params.lang]}`,
      template: `%s | ${metaDataText.MainLayout.templateTitle[params.lang]}`,
    },

    // verification: {
    //   google: process.env.NANOZIST_GSC,
    // },

    metadataBase: new URL(process.env.NEXT_PUBLIC_PANOTECH_BASE_URL),
    alternates: {
      canonical: "/fa",
      languages: {
        fa: "/fa",
        en: "/en",
        ar: "/ar",
      },
    },
  };
}
//? =======================  / END generateMetadata =======================

export default function LangLayout({ children }) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId={process.env.GA_ID} />
    </>
  );
}
