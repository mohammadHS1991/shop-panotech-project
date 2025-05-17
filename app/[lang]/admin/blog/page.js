import Blog from '@/app/[lang]/components/adminComponents/Blog/Blog';
import React from 'react';

export const metadata = {
    title: " پنل ادمین | وبلاگ ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const blog = ({ params, searchParams }) => {
    return (
        <div>
            <Blog params={params}/>
        </div>
    );
};

export default blog;