'use client'

import React from 'react';
import ProductCard from './ProductCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { FreeMode } from 'swiper/modules';
import { productText } from '../data/data';


const SwiperCard = ({data,bgColor,txtColor,title,lang}) => {
    return (
        <section 
            className={`
            shadow-xl rounded-xl ${bgColor}
            mx-5 xs:mx-10 sm:mx-20 2xl:mx-40 my-10 p-5
            `}
        >
            <Swiper
                // slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
                1536: {
                    slidesPerView: 5,
                },
                }}
                freeMode={true}
                pagination={{
                clickable: true,
                }}
                modules={[FreeMode]}
                className="mySwiper"
            >
                <SwiperSlide>
                <h1
                    className={`
                    h-[320px] flex justify-center items-center
                    font-bold text-2xl ${txtColor}
                    `}
                > {title} </h1>
                </SwiperSlide>
                {title == productText.slider[lang] ?
                    data.map((product,index)=>( product.special == 1 &&
                        <SwiperSlide key={index}>
                            <ProductCard product={product} lang={lang}/>
                        </SwiperSlide>
                    ))
                :
                    data.map((product,index)=>(
                        <SwiperSlide key={index}>
                            <ProductCard product={product} lang={lang}/>
                        </SwiperSlide>
                ))
                }
            </Swiper>
      </section>
    );
};

export default SwiperCard;