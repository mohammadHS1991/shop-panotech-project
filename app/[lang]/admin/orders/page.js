import Orders from '@/app/[lang]/components/adminComponents/Orders/Orders';
import React from 'react';

export const metadata = {
    title: " پنل ادمین | سفارشات ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const orders = ({params}) => {
    return (
        <div>
            <Orders params={params}/>
        </div>
    );
};

export default orders;