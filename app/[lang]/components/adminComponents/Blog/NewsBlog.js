'use client'

import React from 'react';
import { Button, Image } from '@nextui-org/react';
import { FaEye } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import AddNewsModal from './AddNewsModal';
import DeleteNewsModal from './DeleteNewsModal';
import EditNewsModal from './EditNewsModal';
import { selectAllNews } from '@/app/[lang]/reducers/newsSlice';

const NewsBlog = ({params}) => {
    
    const lang = params.lang;

//? ========================  START useSelector  ========================
    const newsData = useSelector(selectAllNews)
//? ========================  / END useSelector  ========================

    return (
        <section 
          className="
            shadow-2xl rounded-2xl border-1 bg-white border-gray-50
            ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 mb-10 p-5
          "
        >
        
            <div className='flex justify-between font-bold text-lg text-white bg-green-500 rounded-xl'>
                <p className='hidden lg:flex justify-center items-center w-1/12'> ردیف </p>
                <p className='hidden lg:flex justify-center items-center w-1/6'> عکس </p>
                <p className='hidden lg:flex justify-center items-center w-1/6'> عنوان خبر </p>
                <p className='hidden lg:flex justify-center items-center w-5/12'> متن خبر </p>
                <p className='flex justify-center items-center lg:w-1/6'>
                    <AddNewsModal/>
                </p>
            </div>

            {newsData.length ?
                newsData && newsData.map((news,index) => (
                <>
                <div className="xs:hidden flex justify-center items-center mt-2">
                    <Image
                        alt={news.title[lang]}
                        src={`/${news.images[0].name}`}
                        shadow="sm"
                        className="w-full"
                    />
                </div>
                <article
                    key={index}
                    className='flex justify-between py-8 border-b-2 border-green-800'
                >
                    <p className='hidden lg:flex justify-center items-center w-1/12'>
                        {index+1}
                    </p>

                    <div className='hidden xs:flex justify-center items-center w-2/6 lg:w-1/6'>
                        <Image
                            alt={news.title[lang]}
                            src={`/${news.images[0].name}`}
                            shadow="sm"
                            className='w-20 h-20'
                        />
                    </div>

                    <p className='hidden lg:flex justify-center items-center w-1/6 text-center'>
                        {news?.title[lang]}
                    </p>
                    <p className='hidden lg:flex justify-start items-center w-5/12 text-center truncate'>
                        {news?.firstBody[lang]}
                    </p>
                    
                    <article
                        className="
                        flex lg:hidden flex-col lg:flex-row justify-between items-stretch
                        ms-2 w-4/6 xs:w-3/6"
                    >
                        <section className="border-b-2 mb-2 sm:flex justify-between items-center">
                            <p className="flex justify-start sm:justify-center items-center"> عنوان خبر : </p>
                            <p className="flex justify-end sm:justify-center items-center">
                                {news?.title[lang]}
                            </p>
                        </section>
                        <section className="border-b-2 mb-2">
                            <p className="flex justify-start items-center"> متن خبر : </p>
                            <p className="flex justify-end items-center truncate">
                                {news?.firstBody[lang]}
                            </p>
                        </section>
                    </article>

                    <div
                        className="flex flex-col lg:flex-row justify-center items-center w-1/6"
                    >
                        <EditNewsModal news={news}/>
                        <DeleteNewsModal newsId={news._id}/>
                        <Button variant="light" isIconOnly
                            className='text-xl text-gray-400 hover:text-blue-500'
                        >
                            <FaEye/>
                        </Button>
                    </div>

                </article>
                </>
                ))
            :
                <div className='text-center'>
                    <p
                        className='
                        bg-green-50/50 text-red-500
                        shadow-xl rounded-2xl border-1 border-green-100
                        my-10 mx-auto py-8 px-4 w-3/4 md:w-2/4 xl:w-1/4'
                    >
                         اطلاعاتی برای نمایش موجود نیست
                    </p>
                </div>
            }
        </section>
      );
};

export default NewsBlog;

// news.title[lang]
// news.slug[lang]
// news.firstBody[lang]
// news.secondBody[lang]
// news.keywords[lang]
// news.images
// news.date
