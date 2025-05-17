'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { customizedProductText } from '../../../data/data';
import { useSession } from 'next-auth/react';
import { selectUserById } from '../../../reducers/userSlice';
import CustomProductCard from './CustomProductCard';

const CustomizeProduct = ({params}) => {

    const lang = params.lang;
    const session = useSession();
    const userId = session?.data?.user?.id;

//? =============================  START useSelector  =============================
    const customProducts = useSelector((state) => selectUserById(state,userId))?.customProducts;
//? =============================  / END useSelector  =============================

    return (
        <>
            {customProducts?.length>0 ?
                customProducts?.map((customProduct, index)=>(
                    <CustomProductCard key={index}
                        customProduct={customProduct}
                        productId={customProduct.product}
                        lang={lang}
                    />
                ))
            :
                <article className='text-center'>
                    <p
                        className='
                        bg-green-50/50 text-red-500
                        shadow-xl rounded-2xl border-1 border-green-100
                        ms-7 me-2 xs:mx-10 sm:mx-20 2xl:mx-40 my-2 p-4 xs:px-10'
                    >
                        {customizedProductText.noInformation[lang]}
                    </p>
                </article>
            }
        </>
    );
};

export default CustomizeProduct;