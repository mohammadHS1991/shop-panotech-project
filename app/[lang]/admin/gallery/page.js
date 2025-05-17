import GalleryManager from '@/app/[lang]/components/adminComponents/GalleryManager/GalleryManager';
import React from 'react';

export const metadata = {
    title: "  پنل ادمین | گالری ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const gallery = ({ params, searchParams }) => {
    return (
        <div>
            <GalleryManager lang={params.lang}/>
        </div>
    );
};

export default gallery;