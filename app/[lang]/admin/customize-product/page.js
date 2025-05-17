import CustomizeProductManager from '@/app/[lang]/components/adminComponents/CustomProduct/CustomizeProductManager';
import React from 'react';

export const metadata = {
    title: "  پنل ادمین | محصولات سفارشی ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const customizeProduct = ({params}) => {
    return (
        <div>
            <CustomizeProductManager params={params}/>
        </div>
    );
};

export default customizeProduct;