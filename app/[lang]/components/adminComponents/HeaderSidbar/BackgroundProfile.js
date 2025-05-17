
import React from 'react';

const BackgroundProfile = () => {
    return (
        <section className="fixed w-full h-screen lg:mr-60 -z-10 bg-[url('/images/svg/bgGreenGrid.svg')] bg-cover">
            <div className='absolute top-0 right-0 bottom-0 left-0 bg-white opacity-80'></div>
        </section>
    );
};

export default BackgroundProfile;