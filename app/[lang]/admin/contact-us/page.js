import ContactUsManager from '@/app/[lang]/components/adminComponents/ContactUsManager/ContactUsManager';
import React from 'react';

export const metadata = {
    title: "  پنل ادمین | تماس با ما ",
    description: "این پنل برا مدیریت سایت پانوتک طراحی شده است",
  };

const contactUs = () => {
    return (
        <div>
            <ContactUsManager />
        </div>
    );
};

export default contactUs;