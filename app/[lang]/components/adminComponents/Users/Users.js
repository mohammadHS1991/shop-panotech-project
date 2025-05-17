'use client'

import { Chip } from '@nextui-org/react';
import React from 'react';
import { useSelector } from 'react-redux';
import RolesModal from './RolesModal';
import MorInfoModal from './MorInfoModal';
import SendMailModal from './SendMailModal';
import SendMultiMailModal from './SendMultiMailModal';
import { selectAllUsers } from '@/app/[lang]/reducers/userSlice';
import { useSession } from 'next-auth/react';

const Users = ({params}) => {

    const lang = params.lang;
    const session = useSession()
    const role = session?.data?.user?.role;
//? ==================== START useSelector ====================
    const users = useSelector(selectAllUsers)
//? ==================== / END useSelector ====================

    return (
        <div>

            {users && users.map((user,index)=>(
                <article key={index}
                    className='
                    bg-green-50/50 shadow-2xl rounded-2xl border-1 border-green-100
                    ms-7 me-2 xs:mx-10 md:mx-20 xl:mx-32 2xl:mx-40 mb-2 xs:mb-5 py-4 px-10'
                >
                    <header className='flex justify-between items-center mb-4 pb-4 border-b-2 border-green-900'>
                        <Chip color="danger">
                            {user.role == 'user' && ' کاربر عادی '}
                            {user.role == 'admin' && ' مدیر '}
                            {user.role == 'operator' && ' اپراتور '}
                        </Chip>
                        <div className='flex items-center gap-1'>
                            <SendMailModal
                                fName={user?.firstName}
                                lName={user?.lastName}
                                email={user?.email}
                            />
                            <MorInfoModal user={user}/>
                            {role === "admin" && <RolesModal user={user}/>}
                        </div>
                    </header>

                    <main className='mb-4 pb-4 border-b-1 mx-2 border-green-700'>
                        <h3 className='font-bold text-green-800 text-sm drop-shadow-lg'> نام و نام خانوادگی : </h3>
                        <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'>
                            {user?.firstName} {user?.lastName}
                        </p>
                    </main>

                    <footer className=' mx-2'>
                        <h3 className='font-bold text-green-800 text-sm drop-shadow-lg'> اطلاعات تماس : </h3>
                        <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'> ایمیل : {user.email} </p>
                        <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'> شماره تماس : 
                            {user?.mobile}
                        </p>
                        <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'> شغل : 
                            {user?.job}
                        </p>
                    </footer>

                </article>
            ))}

            <SendMultiMailModal/>
            
        </div>
    );
};

export default Users;
