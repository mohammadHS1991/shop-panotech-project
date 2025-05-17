import Order from '@/app/[lang]/components/adminComponents/Orders/Order';
import React from 'react';

export const metadata = {
    title: " پنل ادمین | سفارشات | سفارش ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const order = ({params}) => {
    return (
        <div>
            <Order params={params}/>
        </div>
    );
};

export default order;