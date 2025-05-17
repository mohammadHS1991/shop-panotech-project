
import ManagOrders from '@/app/[lang]/components/adminComponents/ManagOrders/ManagOrders';
import React from 'react';

export const metadata = {
    title: "  پنل ادمین | مدیریت سفارشات ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const orders = ({ params, searchParams }) => {
    return (
        <div>
            <ManagOrders lang={params.lang}/>
        </div>
    );
};

export default orders;