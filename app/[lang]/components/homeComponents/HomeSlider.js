"use client";

import React from "react";
import { Image } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { selectSelectedGalleryById } from "../../reducers/selectedGallerySlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomeSlider = () => {
  //? ========================  START useSelector  ========================
  const selectedGallery = useSelector((state) =>
    selectSelectedGalleryById(state, "67c5699cbbf3359948657074")
  );
  //? ========================  / END useSelector  ========================

  return (
    <div className="m-auto my-20 w-11/12">
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
          depth: 250,
          modifier: 1,
          // slideShadows: true,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
        }}
        // autoplay={{
        //   delay: 2500,
        //   pauseOnMouseEnter: true,
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
    </div>
  );
};

export default HomeSlider;
