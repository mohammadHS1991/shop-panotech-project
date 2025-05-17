import ManagOrder from '@/app/[lang]/components/adminComponents/ManagOrders/ManagOrder';
import React from 'react';

export const metadata = {
    title: "  پنل ادمین | مدیریت سفارشات | سفارش ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const order = ({ params, searchParams }) => {
    return (
        <div>
            <ManagOrder params={params} lang={params.lang}/>
        </div>
    );
};

export default order;