"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Image,
  Button,
} from "@nextui-org/react";
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
  FreeMode,
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
  EffectCube,
} from "swiper/modules";

const GalleryModal = ({ gallery, lang }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        variant="light"
        onPress={onOpen}
        className="
                shadow-lg rounded-lg bg-gray-100 border border-gray-100
                text-green-700 text-justify drop-shadow-2xl
                w-full h-auto p-3 mt-6 capitalize"
      >
        {gallery?.title[lang]}
      </Button>

      <Modal
        isOpen={isOpen}
        size="2xl"
        placement="top"
        onOpenChange={onOpenChange}
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent className="bg-transparent shadow-none">
          <ModalBody>
            <section className="shadow-xl rounded-2xl border-1 border-green-100 bg-green-50">
              <Swiper
                style={{ "--swiper-navigation-color": "#bbf7d0" }}
                loop={true}
                spaceBetween={5}
                slidesPerView={1}
                navigation={true}
                modules={[FreeMode, Navigation]}
                className="rounded-xl mb-px"
              >
                {gallery?.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image width={650} src={`/${image.name}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GalleryModal;
