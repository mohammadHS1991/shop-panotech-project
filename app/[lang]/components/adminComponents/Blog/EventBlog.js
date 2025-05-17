"use client";

import React from "react";
import { Button, Image } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectAllEvents } from "@/app/[lang]/reducers/eventSlice";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import DeleteEventModal from "./DeleteEventModal";

const EventBlog = ({ params }) => {
  const lang = params.lang;

  //? ========================  START useSelector  ========================
  const eventsData = useSelector(selectAllEvents);
  //? ========================  / END useSelector  ========================

  return (
    <section
      className="
            shadow-2xl rounded-2xl border-1 bg-white border-gray-50
            ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 mb-10 p-5
          "
    >
      <div className="flex justify-between font-bold text-lg text-white bg-green-500 rounded-xl">
        <p className="hidden lg:flex justify-center items-center w-1/12">
          {" "}
          ردیف{" "}
        </p>
        <p className="hidden lg:flex justify-center items-center w-1/6">
          {" "}
          عکس{" "}
        </p>
        <p className="hidden lg:flex justify-center items-center w-1/6">
          {" "}
          عنوان رویداد{" "}
        </p>
        <p className="hidden lg:flex justify-center items-center w-5/12">
          {" "}
          متن رویداد{" "}
        </p>
        <p className="flex justify-center items-center lg:w-1/6">
          <AddEventModal />
        </p>
      </div>

      {eventsData.length ? (
        eventsData &&
        eventsData.map((event, index) => (
          <>
            <div className="xs:hidden flex justify-center items-center mt-2">
              <Image
                alt={event.title[lang]}
                src={`/${event.images[0].name}`}
                shadow="sm"
                className="w-full"
              />
            </div>
            <article
              key={index}
              className="flex justify-between py-8 border-b-2 border-green-800"
            >
              <p className="hidden lg:flex justify-center items-center w-1/12">
                {index + 1}
              </p>

              <div className="hidden xs:flex justify-center items-center w-2/6 lg:w-1/6">
                <Image
                  alt={event.title[lang]}
                  src={`/${event.images[0].name}`}
                  shadow="sm"
                  className="w-20 h-20"
                />
              </div>

              <p className="hidden lg:flex justify-center items-center w-1/6 text-center">
                {event?.title[lang]}
              </p>
              <p className="hidden lg:flex justify-start items-center w-5/12 text-center truncate">
                {event?.firstBody[lang]}
              </p>

              <article
                className="
                        flex lg:hidden flex-col lg:flex-row justify-between items-stretch
                        ms-2 w-4/6 xs:w-3/6"
              >
                <section className="border-b-2 mb-2 sm:flex justify-between items-center">
                  <p className="flex justify-start sm:justify-center items-center">
                    {" "}
                    عنوان رویداد :{" "}
                  </p>
                  <p className="flex justify-end sm:justify-center items-center">
                    {event?.title[lang]}
                  </p>
                </section>
                <section className="border-b-2 mb-2">
                  <p className="flex justify-start items-center">
                    {" "}
                    متن رویداد :{" "}
                  </p>
                  <p className="flex justify-end items-center truncate">
                    {event?.firstBody[lang]}
                  </p>
                </section>
              </article>

              <div className="flex flex-col lg:flex-row justify-center items-center w-1/6">
                <EditEventModal event={event} />
                <DeleteEventModal eventId={event._id} />
                <Button
                  variant="light"
                  isIconOnly
                  className="text-xl text-gray-400 hover:text-blue-500"
                >
                  <FaEye />
                </Button>
              </div>
            </article>
          </>
        ))
      ) : (
        <div className="text-center">
          <p
            className="
                        bg-green-50/50 text-red-500
                        shadow-xl rounded-2xl border-1 border-green-100
                        my-10 mx-auto py-8 px-4 w-3/4 md:w-2/4 xl:w-1/4"
          >
            اطلاعاتی برای نمایش موجود نیست
          </p>
        </div>
      )}
    </section>
  );
};

export default EventBlog;