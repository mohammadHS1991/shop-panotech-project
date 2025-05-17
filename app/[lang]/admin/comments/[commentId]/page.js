

import CommentManager from '@/app/[lang]/components/adminComponents/CommentsManager/CommentManager';
import React from 'react';

export const metadata = {
    title: "  پنل ادمین | مدیریت نظرات | نظرها ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const comment = ({params}) => {
    return (
        <div>
            <CommentManager params={params}/>
        </div>
    );
};

export default comment;