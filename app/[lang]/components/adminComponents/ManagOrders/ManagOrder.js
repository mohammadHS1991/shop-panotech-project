'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { selectOrderById } from '@/app/[lang]/reducers/orderSlice';
import OrderCard from './OrderCard';

const ManagOrder = ({params,lang}) => {

//? =============================  START useSelector  =============================
    const endCartItem = useSelector((state) => selectOrderById(state,params.managOrderId))
//? =============================  / END useSelector  =============================

    return (
        <div className=" mx-10 sm:mx-20 2xl:mx-50 my-10 gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {endCartItem && endCartItem.cart?.map( (CartItem,index)=>(
                <div key={index}>
                    <OrderCard CartItem={CartItem} lang={lang}/>
                </div>
            ))}
        </div>
    );
};

export default ManagOrder;

// endCartCartItem.cart.map(CartItem)
    // CartItem.product {obj}
        // CartItem.product.price[lang].discount
