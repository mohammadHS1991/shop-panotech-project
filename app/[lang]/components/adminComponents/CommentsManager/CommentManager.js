'use client'

import { selectProductById } from '@/app/[lang]/reducers/productSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import AceptCommentModal from './AceptCommentModal';

const CommentManager = ({params}) => {

//? ============================ START useSelector ============================
    const product = useSelector((state) => selectProductById(state,params.commentId))
//? ============================ / END useSelector ============================

    return (
        <section>
            {product && product.comments.map((comment,index)=>(
                <article key={index}
                    className='
                    shadow-2xl rounded-2xl border-1 border-green-100
                    bg-green-50/15
                    m-5 py-4 px-10'
                >
                    <header className='mb-4 pb-1 border-b-2 border-green-900 flex justify-between items-center'>
                        <h1 className='text-green-800 font-bold drop-shadow-lg'> {comment.author.firstName} {comment.author.lastName} </h1>
                        <AceptCommentModal comment={comment} productId={product._id}/>
                    </header>
                    <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'>{comment.comment}</p>
                </article>
            ))}
        </section>
    );
};

export default CommentManager;

// product.name[lang]
// product.slug[lang]
// product.fullDescription[lang]
// product.useCases[lang]
// product.price[lang].amount
// product.price[lang].unit
// product.price[lang].discount
// product.keywords[lang]
// product.qty
// product.images
// product.guideImages
// product.guideVideos
// product.files
// product.comments.map(comment) [array]
    // comment._id
    // comment.author {obj}
    // comment.comment
    // comment.status
    // comment.date
