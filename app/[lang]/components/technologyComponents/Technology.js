
import React from "react";
import Baner from "../headerFooterComponents/Baner";
import { technologyText } from "../../data/data";
import SubBaner from "../headerFooterComponents/SubBaner";
import ImageModal from "../blogsComponents/ImageModal";

const Technology = ({ params }) => {
  const lang = params.lang;

  const text1 = technologyText.text1;
  const text2 = technologyText.text2;
  const title = technologyText.title;
  const subTitle = technologyText.subTitle;

  return (
    <>

      <Baner title={title[lang]} />

      <SubBaner title={subTitle[lang]} text={'text-5xl'} font={'font-bold'}/>

      <main
        className="
                indent-10 leading-8 space-y-5 mt-5
                px-5 lg:px-10 xl:px-20 py-10 mb-20 mx-2 xs:mx-5 lg:mx-10 xl:mx-40
                text-green-700 bg-green-50/50 border border-green-100 rounded-xl shadow-xl"
      >
        <p className="text-justify drop-shadow-2xl"> {text1[lang]} </p>
        <div className="flex justify-center items-center md:w-1/2 mx-auto">
          <ImageModal alt={"technology"} src={"/images/Technology/technology.jpg"}/>
        </div>
        <p className="text-justify drop-shadow-2xl"> {text2[lang]} </p>
      </main>

    </>
  );
};

export default Technology;
