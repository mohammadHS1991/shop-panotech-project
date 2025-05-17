"use client"

import React, { useState } from 'react';
import {Modal,ModalContent,ModalBody,useDisclosure,Image,Button} from '@nextui-org/react';
//? Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
//? Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
//? import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const ProductSlider = ({images}) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
      <>
        <section className='shadow-xl rounded-2xl border-1 border-gray-100 bg-gray-50 p-2'>
          <Swiper
            style={{
              '--swiper-navigation-color': '#bbf7d0',
              '--swiper-pagination-color': '#fff',
            }}
            loop={true}
            spaceBetween={5}
            slidesPerView={1}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="rounded-xl mb-px"
          >
            {images && images.map((image,index)=>(
                <SwiperSlide key={index}>
                    <Button variant="light" onPress={onOpen} className='h-auto'>
                      <Image width={750} src={`/${image.name}`}/>
                    </Button>
                </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={1}
            slidesPerView={8}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className=""
          >
            {images && images.map((image,index)=>(
                <SwiperSlide key={index}>
                    <Image width={600} src={`/${image.name}`}/>
                </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <Modal isOpen={isOpen} size='2xl' placement='top'
                onOpenChange={onOpenChange}
                backdrop="blur"
                scrollBehavior="inside"
            >
                <ModalContent className="bg-transparent shadow-none">
                  <ModalBody>
                    <section className='shadow-xl rounded-2xl border-1 border-green-100 bg-green-50'>
                      <Swiper
                        style={{'--swiper-navigation-color': '#bbf7d0'}}
                        loop={true}
                        spaceBetween={5}
                        slidesPerView={1}
                        navigation={true}
                        modules={[FreeMode, Navigation]}
                        className="rounded-xl mb-px"
                      >
                          {images && images.map((image,index)=>(
                            <SwiperSlide key={index}>
                              <Image width={650} src={`/${image.name}`}/>
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

export default ProductSlider;
