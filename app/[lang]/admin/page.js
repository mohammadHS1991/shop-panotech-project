import React from 'react';
import AdminProfile from '../components/adminComponents/AdminProfile/AdminProfile';

export const metadata = {
    title: " پنل ادمین ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const admin = ({ params, searchParams }) => {
    return (
        <div>
            <AdminProfile params={params}/>
        </div>
    );
};

export default admin;