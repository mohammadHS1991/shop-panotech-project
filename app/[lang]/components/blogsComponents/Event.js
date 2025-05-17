
import React from "react";
import Link from "next/link";
import { FetchPaginatedEventsFunction, GetEventsCountFunction } from "../../functions";
import CustomAsyncPagination from "../CustomAsyncPagination";
import EventEmpty from "./EventEmpty";
import { blogText } from "../../data/data";
import SubBaner from "../headerFooterComponents/SubBaner";
import EventCard from "./EventCard";
import { notFound } from "next/navigation";

const Event = async ({type, category, page, lang, keyword, isInBlogs=false}) => {
  let eventCount = await GetEventsCountFunction(lang, keyword);
  let eventData = await FetchPaginatedEventsFunction(lang, keyword, page || 1);
  if (!eventData) notFound();

  return (
    <>
      <Link href={`blogs/events`}>
        <SubBaner title={blogText.eventTitle[lang]} text={'text-6xl'} font={'font-extrabold'}/>
      </Link>

      <main
        className="
        mt-5 mb-20 mx-2 xs:mx-5 lg:mx-10 xl:mx-40
        gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3"
      >
        {eventData && eventData.map((event, index) => (
            <EventCard key={index}
              lang={lang}
              event={event}
            />
          ))}
      </main>
      {eventData.length == false && <EventEmpty lang={lang}/> }

      <footer>
        <CustomAsyncPagination
          counts={eventCount}
          type={isInBlogs === true ? `blogs` : `blogs/${type}`}
          keyword={keyword}
          category={category}
          lang={lang}
        />
      </footer>
    </>
  );
};

export default Event;
