'use client'

import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../../reducers/userSlice';

const Order = ({params}) => {

    const lang = params.lang;
    const session = useSession();
    const userId = session?.data?.user?.id;

//? =============================  START useSelector  =============================
    const finishedCarts = useSelector((state) => selectUserById(state,userId))?.finishedCarts;
//? =============================  / END useSelector  =============================

    const [finishedCart,setFinishedCart] = useState([])
    
    useEffect(()=>{
        finishedCarts && finishedCarts.map((finishedCart,index)=>{
            if(params.orderCode==finishedCart.orderCode){setFinishedCart(finishedCart)}
        })
    },[])

    return (
        <div className=" mx-10 sm:mx-20 2xl:mx-50 my-10 gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {finishedCart && finishedCart.cart?.map((cartItem,index)=>(
                <Card key={index} shadow="sm">

                    <CardBody className="overflow-visible p-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={cartItem.product?.name[lang]}
                            className="w-full object-cover h-[240px]"
                            src={`/${cartItem.product?.images[0].name}`}
                        />
                    </CardBody>

                    <CardFooter className="text-small flex-col items-stretch">
                        <b>{cartItem?.product.name[lang]}</b>
                        <div className='flex justify-between mt-1'>
                            <p className="text-default-500"> تعداد : 
                                {cartItem?.qty}
                            </p>
                            <p className="text-default-500">
                                {cartItem?.product.price[lang].amount} {cartItem?.product.price[lang].unit}
                            </p>
                        </div>
                    </CardFooter> 

                </Card>
            ))}
        </div>
    );
};

export default Order;

// finishedCart._id
// finishedCart.totalCartPrice
// finishedCart.currency
// finishedCart.date
// finishedCart.orderCode
// finishedCart.cart.map(cartItem) [array]
    // cartItem._id
    // cartItem.qty
    // cartItem.product {obj}
        // cartItem.product.name[lang]
        // cartItem.product.slug[lang]
        // cartItem.product.price[lang].amount
        // cartItem.product.price[lang].unit
        // cartItem.product.price[lang].discount
        // cartItem.product.qty
        // cartItem.product.images
