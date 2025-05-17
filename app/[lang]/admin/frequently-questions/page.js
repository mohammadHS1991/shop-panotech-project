import FrequentlyQuestionsManager from '@/app/[lang]/components/adminComponents/FAQ/FrequentlyQuestionsManager';
import React from 'react';

export const metadata = {
    title: "  پنل ادمین | سوالات پرتکرار ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const frequentlyQuestions = ({ params, searchParams }) => {
    return (
        <div>
            <FrequentlyQuestionsManager lang={params.lang}/>
        </div>
    );
};

export default frequentlyQuestions;