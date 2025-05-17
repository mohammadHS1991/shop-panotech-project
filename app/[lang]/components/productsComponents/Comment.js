import React from 'react';

const Comment = ({ author, comment, status }) => {
    return (
        <section
            className='
            shadow-2xl rounded-2xl border-1 border-green-100
            bg-green-50
            m-2 sm:m-5 py-4 px-3 xs:px-5 sm:px-10'
        >
            <header className='mb-4 pb-1 border-b-2 border-green-900 flex justify-between items-center'>
                        <h1 className='text-green-800 font-bold drop-shadow-lg'> {author.firstName} {author.lastName} </h1>
                        {!status && <p className='text-red-500 text-xs'> این نظر هنوز توسط ادمین تایید نشده است </p>}
            </header>
            <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'>{comment}</p>
        </section>
    );
};

export default Comment;