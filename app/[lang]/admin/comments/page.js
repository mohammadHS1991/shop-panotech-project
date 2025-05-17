
import CommentsManager from '@/app/[lang]/components/adminComponents/CommentsManager/CommentsManager';
import React from 'react';

export const metadata = {
    title: "  پنل ادمین | مدیریت نظرات ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const comments = ({params}) => {
    return (
        <div>
            <CommentsManager params={params}/>
        </div>
    );
};

export default comments;