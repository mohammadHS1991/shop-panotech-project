import React from "react";

const Baner = ({ title }) => {
  return (
    // <></>
    <div className="relative h-96 mt-8 bg-[url('/images/baner.jpeg')] bg-contain bg-fixed">
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-green-800 opacity-50">
        <h1 className=" text-6xl font-extrabold absolute text-green-50 top-10 start-10">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Baner;
