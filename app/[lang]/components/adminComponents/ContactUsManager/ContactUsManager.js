
import React from 'react';
import CollaborationManager from './CollaborationManager';
import QuestionManager from './QuestionManager';
import SuggestionManager from './SuggestionManager';

const ContactUsManager = () => {

    return (
        <>
            <header className='
                flex justify-between items-center
                ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40
                bg-green-50/50 border border-green-100 rounded-xl shadow-xl'
            >
                <h1
                    className='
                    w-4/12 xs:w-4/12 sm:w-3/12 xl:w-2/12 2xl:w-1/12 p-5
                    text-white text-lg font-bold tracking-wider text-center
                    bg-green-500 rounded-r-xl'
                > همکاری </h1>
            </header>
            <CollaborationManager/>

            <header className='
                flex justify-between items-center
                ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 mt-10
                bg-green-50/50 border border-green-100 rounded-xl shadow-xl'
            >
                <h1
                    className='
                    w-4/12 xs:w-4/12 sm:w-3/12 xl:w-2/12 2xl:w-1/12 p-5
                    text-white text-lg font-bold tracking-wider text-center
                    bg-green-500 rounded-r-xl'
                > سوال </h1>
            </header>
            <QuestionManager/>

            <header className='
                flex justify-between items-center
                ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40  mt-10
                bg-green-50/50 border border-green-100 rounded-xl shadow-xl'
            >
                <h1
                    className='
                    w-4/12 xs:w-4/12 sm:w-3/12 xl:w-2/12 2xl:w-1/12 p-5
                    text-white text-lg font-bold tracking-wider text-center
                    bg-green-500 rounded-r-xl'
                > پیشنهاد </h1>
            </header>
            <SuggestionManager/>
        </>
    );
};

export default ContactUsManager;