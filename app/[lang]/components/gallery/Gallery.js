"use client";

import React from "react";
import { Image } from "@nextui-org/react";
import SubBaner from "../headerFooterComponents/SubBaner";
import Baner from "../headerFooterComponents/Baner";
import { useSelector } from "react-redux";
import { selectAllGalleries } from "../../reducers/gallerySlice";
import { selectSelectedGalleryById } from "../../reducers/selectedGallerySlice";
import { galleryText } from "../../data/data";
import GalleryEmpty from "./GalleryEmpty";
import GalleryModal from "./GalleryModal";

//? Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
//? Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cube";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
//? import required modules
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
  EffectCube,
} from "swiper/modules";

const Gallery = ({ lang }) => {
  //? ========================  START useSelector  ========================
  const selectedGallery = useSelector((state) =>
    selectSelectedGalleryById(state, "67c5699cbbf3359948657074")
  );
  const eventsGallery = useSelector(selectAllGalleries);
  //? ========================  / END useSelector  ========================

  return (
    <>
      <Baner title={galleryText.title[lang]} />
      {/* ==================== ** START Selected Gallery Slider ** ==================== */}
      <section className="m-auto my-20 w-11/12">
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          // slidesPerView={slidesPerView}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
            1536: {
              slidesPerView: 3,
            },
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
            // slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          // autoplay={{
            // delay: 2500,
            // pauseOnMouseEnter: true,
          // }}
          // modules={[Autoplay, EffectCoverflow, Pagination]}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {selectedGallery &&
            selectedGallery.images.map((image, index) => (
              <SwiperSlide key={index}>
                {" "}
                <Image width={900} src={`/${image.name}`} />{" "}
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
      {/* ==================== ** /END Selected Gallery Slider ** ==================== */}
      {/* ==================== ** START Event Galleries Slider ** ==================== */}
      <SubBaner
        title={galleryText.eventTitle[lang]}
        text={"text-6xl"}
        font={"font-extrabold"}
      />

      {eventsGallery.length > 0 ? (
        <section
          className="
          shadow-xl rounded-xl border-1 border-gray-100 bg-gray-100/50
          mx-5 xs:mx-10 sm:mx-20 2xl:mx-40 my-10 p-3 xs:p-5 xl:p-10
          gap-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3
          "
        >
          {eventsGallery?.map((gallery, index) => (
            <article key={index}>
              <Swiper
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                effect={"cube"}
                grabCursor={true}
                cubeEffect={{
                  shadow: true,
                  slideShadows: true,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                }}
                pagination={{
                  dynamicMainBullets: true,
                  clickable: true,
                }}
                modules={[EffectCube, Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {gallery?.images.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image alt={image.title} src={`/${image.name}`} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <footer>
                <GalleryModal gallery={gallery} lang={lang} />
              </footer>
            </article>
          ))}
        </section>
      ) : (
        <GalleryEmpty lang={lang} />
      )}
      {/* ==================== ** /END Event Galleries Slider ** ==================== */}
    </>
  );
};

export default Gallery;
