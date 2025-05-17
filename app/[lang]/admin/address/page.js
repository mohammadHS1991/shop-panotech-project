import Address from '@/app/[lang]/components/adminComponents/Address/Address';
import React from 'react';

export const metadata = {
    title: " پنل ادمین | آدرس ها ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const address = () => {
    return (
        <div>
            <Address/>
        </div>
    );
};

export default address;