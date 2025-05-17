"use client";

import React from "react";
import { useSelector } from "react-redux";
import EditEventGalleryModal from "./EditEventGalleryModal";
import DeleteEventGalleryModal from "./DeleteEventGalleryModal";
import { Button, Image } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import AddEventGalleryModal from "./AddEventGalleryModal";
import { selectAllGalleries } from "@/app/[lang]/reducers/gallerySlice";

const EventGallery = ({ lang }) => {
  //? ========================  START useSelector  ========================
  const eventsGallery = useSelector(selectAllGalleries);
  //? ========================  / END useSelector  ========================

  return (
    <section
      className="
        shadow-2xl rounded-2xl border-1 bg-white border-gray-50
        ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 my-10 p-5
        "
    >
      <header className="flex justify-between font-bold text-lg text-white bg-green-500 rounded-xl">
        <p className="flex justify-center items-center m-4"> گالری رویدادها </p>
        <p className="flex justify-center items-center">
          <AddEventGalleryModal />
        </p>
      </header>

      {eventsGallery.length ? (
        eventsGallery.map((gallery, index) => (
          <article key={index}>
            <header
              className="
                    shadow-lg rounded-lg bg-gray-100 border border-gray-100
                    text-green-700 text-justify drop-shadow-2xl
                    p-3 mt-10
                    flex justify-between items-center
                    "
            >
              <p> {gallery?.title[lang]} </p>
              <div className="flex justify-center items-center">
                <EditEventGalleryModal gallery={gallery} />
                <DeleteEventGalleryModal galleryId={gallery._id} />
                <Button
                  variant="light"
                  isIconOnly
                  className="text-xl text-gray-400 hover:text-blue-500"
                >
                  <FaEye />
                </Button>
              </div>
            </header>
            <div
              key={index}
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 py-8 border-b-2 border-green-800"
            >
              {gallery?.images.map((image, index) => (
                <div key={index} className="flex justify-center">
                  <Image
                    src={`/${image.name}`}
                    alt={gallery?.title[lang]}
                    shadow="sm"
                    className="w-28 h-28"
                  />
                </div>
              ))}
            </div>
          </article>
        ))
      ) : (
        <p className="text-red-500 font-bold text-center m-4">
          {" "}
          اطلاعاتی برای نمایش وجود ندارد!{" "}
        </p>
      )}
    </section>
  );
};

export default EventGallery;