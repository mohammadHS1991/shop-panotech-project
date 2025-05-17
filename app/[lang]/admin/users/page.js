import Users from '@/app/[lang]/components/adminComponents/Users/Users';
import React from 'react';

export const metadata = {
    title: "  پنل ادمین | مدیریت کاربران ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const users = ({params}) => {
    return (
        <div>
            <Users params={params}/>
        </div>
    );
};

export default users;