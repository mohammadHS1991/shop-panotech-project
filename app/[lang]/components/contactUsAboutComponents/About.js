import React from "react";
import { aboutText } from "../../data/data";

const About = ({ params }) => {
  const lang = params.lang;

  const text1 = aboutText.text1;
  const text2 = aboutText.text2;

  return (
    <div className="lg:flex lg:px-20 min-h-[67vh]">
      <section
        className="
                indent-10 leading-8 space-y-5 
                px-5 lg:px-10 xl:px-20 py-10 lg:me-5 my-10 mx-5 lg:mx-0 lg:w-2/3 
                text-green-700 bg-gray-100 rounded-xl shadow-xl"
      >
        <p className="text-justify drop-shadow-2xl"> {text1[lang]} </p>
        <p className="text-justify drop-shadow-2xl"> {text2[lang]} </p>
      </section>

      <section
        className="
                relative
                shadow-2xl w-full h-96 lg:w-1/3 lg:h-auto 
                bg-[url('/images/bgAbout.png')] bg-scroll bg-no-repeat bg-center bg-auto"
      >
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-green-700 opacity-70"></div>
      </section>
    </div>
  );
};

export default About;
