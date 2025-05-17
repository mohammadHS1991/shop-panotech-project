'use client'

import { selectAllCooperations } from '@/app/[lang]/reducers/cooperationSlice';
import Link from 'next/link';
import React from 'react';
import { FaDownload, FaRegTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import DeleteCollaborationModal from './DeleteCollaborationModal';

const CollaborationManager = () => {

//? ========================  START useSelector  ========================
    const contactUsComments = useSelector(selectAllCooperations)
//? ========================= /END useSelector =========================

    return (
        <>
            {contactUsComments.length>0 ?
                contactUsComments && contactUsComments.map((comment, index)=>(
                    <article key={index}
                        className='
                        shadow-2xl rounded-2xl border-1 border-green-100
                        bg-green-50/50
                        ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 my-2 p-4 xs:px-10'
                    >
                        <header className='mb-4 pb-1 border-b-2 border-green-900 flex justify-between items-center'>
                            <h1 className='text-green-800 font-bold drop-shadow-lg'>
                                {comment?.firstName} {comment?.lastName}
                            </h1>
                            <DeleteCollaborationModal commentId={comment._id}/>
                        </header>
                        <main className='mb-4 pb-4 border-b-1 mx-2 border-green-700'>
                            <h3 className='font-bold text-green-800 text-sm drop-shadow-lg'> متن درخواست : </h3>
                            <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'> {comment?.message} </p>
                        </main>
                        <footer className=' mx-2'>
                            <h3 className='font-bold text-green-800 text-sm drop-shadow-lg'> اطلاعات تماس : </h3>
                            <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'> ایمیل : {comment?.email} </p>
                            <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'> شماره تماس : {comment?.mobile} </p>
                            <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'> شغل : {comment?.job} </p>
                            <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm flex'> دانلود رزومه :
                            <Link href={`/${comment?.resume[0]?.name}`}> <FaDownload className='mx-4'/> </Link>
                            </p>
                        </footer>
                    </article>
                ))
            :
                <article className='text-center'>
                    <p
                        className='
                        bg-green-50/50 text-red-500
                        shadow-xl rounded-2xl border-1 border-green-100
                        ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 my-2 p-4 xs:px-10'
                    >
                         اطلاعاتی برای نمایش موجود نیست
                    </p>
                </article>
            }
        </>
    );
};

export default CollaborationManager;
