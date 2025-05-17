'use client'

import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { FaPlusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { MdCancel } from 'react-icons/md';
import { selectAllFaqs } from '@/app/[lang]/reducers/faqSlice';
import { faqText } from '@/app/[lang]/data/data';

const FrequentlyQuestionsManager = ({lang}) => {


//? ======================= START useSelector =======================
    const FAQdata = useSelector(selectAllFaqs)
//? ======================= / END useSelector =======================

    return (
        <section>

            <header
                className='
                shadow-2xl border-1 border-green-100 bg-green-100/50
                rounded-3xl
                ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 my-4 px-2 py-4 xs:p-4'
            >
                <h1
                    className='
                    text-green-800 font-bold drop-shadow-lg
                    border-b-2 border-green-900
                    mb-4 pb-4 ps-8'
                >{faqText.title[lang]}</h1>
            </header>
            
            {FAQdata.length>0 ?
                <Accordion variant="splitted">
                    {FAQdata?.map((question,index)=>(
                        <AccordionItem
                        key={index} aria-label="Accordion 1"
                        title={question?.title[lang]}
                        indicator={
                            ({isOpen}) =>(isOpen ?
                                <MdCancel className="text-green-800 hover:text-green-600"/>
                            :
                                <FaPlusCircle className="text-green-800 hover:text-green-600"/>)
                        }
                        className='
                            shadow-2xl border-1 border-green-100 bg-green-50/50 rounded-3xl
                            text-green-800 font-bold drop-shadow-lg
                            ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 my-2 xs:px-10'
                        >
                            <main className='border-t-2 border-green-900 mt-4 px-2 py-4 xs:p-4'>
                                <p
                                    className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'
                                >
                                    {question?.body[lang]}
                                </p>
                            </main>
                        </AccordionItem>
                    ))}
                </Accordion>
            :
                <article className='text-center'>
                    <p
                        className='
                        text-red-500
                        flex justify-center items-center
                        bg-green-50/50 shadow-2xl rounded-3xl border-1 border-green-100
                        ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 my-2 xs:px-10 h-20'
                    >
                        {faqText.noInformation[lang]}
                    </p>
                </article>
            }

        </section>
    );
};

export default FrequentlyQuestionsManager;