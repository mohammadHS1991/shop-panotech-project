
import React from "react";
import { profileText } from "@/app/[lang]/data/data";

const UserProfile = ({ params }) => {
  const lang = params.lang;

  return (
    <section
      className="
      shadow-2xl rounded-2xl border-1 bg-white border-gray-50
      mx-10 sm:mx-20 2xl:mx-40 my-10 p-5 "
    >
      <div className="text-center">
        <p
          className="
          leading-8 space-y-5
          bg-gray-100 text-green-700
          shadow-xl rounded-2xl border-1 border-gray-100
          my-10 mx-auto py-8 px-4 w-full md:w-3/4 xl:w-2/4"
        >
          {profileText.text[lang]}
        </p>
      </div>
    </section>
  );
};

export default UserProfile;