import React from "react";

const SubBaner = ({ title, text, font }) => {
  return (
    <header className="relative h-36 mt-8 bg-[url('/images/baner.jpeg')] bg-contain bg-fixed">
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-green-800 opacity-50">
        <h2
          className={`${text} ${font} absolute text-green-50 top-10 start-10 capitalize`}
        >
          {title}
        </h2>
      </div>
    </header>
  );
};

export default SubBaner;
