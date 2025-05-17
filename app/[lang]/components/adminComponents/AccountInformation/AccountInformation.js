'use client'

import React from 'react';
import EditUserInfoModal from './EditUserInfoModal';
import { useSelector } from 'react-redux';
import { selectUserById } from '@/app/[lang]/reducers/userSlice';
import { useSession } from 'next-auth/react';

const AccountInformation = ({params}) => {;

    const lang = params.lang;
    const session = useSession();
    const userId = session.data?.user?.id;
//? ======================= START useSelector =======================
    const user = useSelector((state) => selectUserById(state,userId))
//? =======================  / END useSelector =======================

    return (
        <section
            className='
            shadow-2xl rounded-2xl bg-white
            ms-7 me-2 mb-5 xs:m-8 px-4 py-8 xs:p-8'
        >

            <header className='mb-8'>
                <h1 className='font-bold text-lg text-green-800 border-b-2 pb-8 ps-4'> اطلاعات حساب کاربری </h1>
            </header>

            <main className=''>

                <div className='sm:flex'>
                    {/* ===================================  full name  =================================== */}
                    <div className='border-b-2 sm:border-l-2 sm:w-1/2 p-4 flex justify-between items-center'>
                        <div>
                            <p className='text-gray-400'> نام و نام خانوادگی </p>
                            <p className={`text-lg font-bold m-2`}>
                                {user?.firstName}{` `}{user?.lastName}
                            </p>
                        </div>
                        <EditUserInfoModal user={user}/>
                    </div>
                    {/* ===================================  phone number  =================================== */}
                    <div className='border-b-2 sm:w-1/2 p-4 flex justify-between items-center'>
                        <div>
                            <p className='text-gray-400'> شماره موبایل </p>
                            <p className={`text-lg font-bold m-2`}>
                                {user?.mobile}
                            </p>
                        </div>
                        <EditUserInfoModal user={user}/>
                    </div>
                </div>

                <div className='sm:flex'>
                    {/* ===================================  fild  =================================== */}
                    <div className='border-b-2 sm:border-l-2 sm:w-1/2 p-4 flex justify-between items-center'>
                        <div>
                            <p className='text-gray-400'> رشته تحصیلی </p>
                            <p className={`text-lg font-bold m-2`}>
                                {user?.field}
                            </p>
                        </div>
                        <EditUserInfoModal user={user}/>
                    </div>
                    {/* ===================================  job  =================================== */}
                    <div className='border-b-2 sm:w-1/2 p-4 flex justify-between items-center'>
                    <div>
                            <p className='text-gray-400'> شغل </p>
                            <p className={`text-lg font-bold m-2`}>
                                {user?.job}
                            </p>
                        </div>
                        <EditUserInfoModal user={user}/>
                    </div>
                </div>

                <div className='sm:flex'>
                    {/* ===================================  Adress  =================================== */}
                    <div className='border-b-2 sm:border-b-0 sm:border-l-2 sm:w-1/2 p-4 flex justify-between items-center'>
                        <div>
                            <p className='text-gray-400'> آدرس </p>
                            <p className={`text-lg font-bold m-2`}>
                                {user?.address}
                            </p>
                        </div>
                        <EditUserInfoModal user={user}/>
                    </div>
                    {/* ===================================  postal code  =================================== */}
                    <div className='border-b-2 sm:border-b-0 sm:w-1/2 p-4 flex justify-between items-center'>
                        <div>
                            <p className='text-gray-400'>  کد پستی  </p>
                            <p className={`text-lg font-bold m-2`}>
                                {user?.postalCode}
                            </p>
                        </div>
                        <EditUserInfoModal user={user}/>
                    </div>
                </div>
                
            </main>

        </section>
    );
};

export default AccountInformation;

// user.firstName
// user.lastName
// user.email
// user.mobile
// user.postalCode
// user.job
// user.field
// user.address
