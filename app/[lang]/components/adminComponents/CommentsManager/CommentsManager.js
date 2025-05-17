'use client'

import { Badge } from '@nextui-org/react';
import React from 'react';
import { useSelector } from 'react-redux';
import CommentCard from './CommentCard';
import { selectAllProducts } from '@/app/[lang]/reducers/productSlice';

const CommentsManager = ({params}) => {

    const lang = params.lang;
    
//? ========================= START useSelector =========================
    const products = useSelector(selectAllProducts)
    const commentQty = products?.reduce((value,product)=>value+product.comments.length ,0)
//? ========================= / END useSelector =========================
    return (
        <div
            className='
            shadow-2xl rounded-2xl border-1 border-gray-100 bg-gray-100
            ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 mb-10 p-2 xs:p-5'
        >
            <header className='font-bold text-lg text-white bg-green-500 rounded-2xl'>
                <Badge content={commentQty} color="danger" placement="top-left">
                    <p className='py-4 mr-10'> نظر کاربران </p>
                </Badge>
            </header>

            { commentQty>0 ?
                <div className='gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-4'>
                    {products.map((product,index)=>(
                        product.comments.length > 0 &&
                        <CommentCard key={index} product={product} lang={lang}/>
                    ))}
                </div>
            :
                <div className='text-center'>
                    <p
                        className='
                        bg-gray-100 text-red-500
                        shadow-xl rounded-2xl border-1 border-gray-100
                        my-10 mx-auto py-8 px-4 w-3/4 md:w-2/4 xl:w-1/4'
                    >
                         اطلاعاتی برای نمایش موجود نیست
                    </p>
                </div>
            }
        </div>
    );
};

export default CommentsManager;

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
