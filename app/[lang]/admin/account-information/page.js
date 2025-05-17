
import AccountInformation from '@/app/[lang]/components/adminComponents/AccountInformation/AccountInformation';
import React from 'react';

export const metadata = {
    title: " پنل ادمین | اطلاعات حساب ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const accountInformation = ({params}) => {
    return (
        <>
            <AccountInformation params={params}/>
        </>
    );
};

export default accountInformation;