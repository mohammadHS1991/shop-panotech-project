'use client'

import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCustomProducts } from '../../../reducers/customProductSlice';
import DeleteCustoProductModal from './DeleteCustoProductModal';

const CustomizeProductManager = ({params}) => {

    const lang = params.lang;

//? ========================  START useSelector  ========================
    const customProducts = useSelector(selectAllCustomProducts)
//? ========================= /END useSelector =========================

    return (
        <>
            {customProducts.length>0 ?
                customProducts && customProducts.map((customProduct, index)=>(
                    <article key={index}
                        className='
                        shadow-2xl rounded-2xl border-1 border-green-100
                        bg-green-50/50
                        ms-7 me-2 xs:mx-10 md:mx-20 2xl:mx-40 mb-5 p-2 xs:p-5'
                    >
                        <header
                            className='
                            mb-4 pb-1 border-b-2 border-green-900
                            flex justify-between'
                        >
                            <h1 className='text-green-800 font-bold drop-shadow-lg'> درخواست سفارشی سازی محصول {customProduct.product.name[lang]} </h1>
                            <DeleteCustoProductModal productId={customProduct?._id}/>
                        </header>

                        <div className='sm:flex'>
                            <aside className='mb-2 sm:mb-0 sm:w-2/4 2xl:w-1/4'>
                                <Card shadow="sm">
                                    <CardBody className="overflow-visible p-0">
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            width="100%"
                                            alt={customProduct.product.name[lang]}
                                            className="w-full object-cover h-[240px]"
                                            src={`/${customProduct.product.images[0].name}`}
                                        />
                                    </CardBody>
                                    <CardFooter className="text-small flex-col items-stretch">
                                        <b>{customProduct.product.name[lang]}</b>
                                        <div className='flex justify-end'>
                                            <p className="text-default-500">
                                                {customProduct.product.price[lang].amount} {customProduct.product.price[lang].unit}
                                            </p>
                                        </div>
                                    </CardFooter> 
                                </Card>
                            </aside>

                            <div className='sm:w-2/4 2xl:w-3/4'>
                                <main className='mb-4 pb-4 border-b-1 mx-2 border-green-700'>
                                    <h3 className='font-bold text-green-800 text-sm drop-shadow-lg'>
                                        {customProduct?.firstName} {customProduct?.lastName} :
                                    </h3>
                                    <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'> {customProduct?.message} </p>
                                </main>
                                <footer className=' mx-2'>
                                    <h3 className='font-bold text-green-800 text-sm drop-shadow-lg'> اطلاعات تماس : </h3>
                                    <div className='xl:flex justify-between indent-5 text-justify text-green-700 drop-shadow-lg text-sm mb-2'>
                                        <p> شماره تماس : </p>
                                        <p className='indent-10'> {customProduct?.mobile} </p>
                                    </div>
                                    <div className='xl:flex justify-between indent-5 text-justify text-green-700 drop-shadow-lg text-sm mb-2'>
                                        <p> پست الکترونیک : </p>
                                        <p className='indent-10'> {customProduct?.email} </p>
                                    </div>
                                    <div className='xl:flex justify-between indent-5 text-justify text-green-700 drop-shadow-lg text-sm mb-2'>
                                        <p> شغل : </p>
                                        <p className='indent-10'> {customProduct?.job} </p>
                                    </div>
                                    <div className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'>
                                        <p> آدرس : </p>
                                        <p> {customProduct?.address} - کدپستی : {customProduct?.postalCode} </p>
                                    </div>
                                </footer>
                            </div>
                        </div>
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

export default CustomizeProductManager;