'use client'

import React from 'react';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { selectProductById } from '@/app/[lang]/reducers/productSlice';
import { customizedProductText } from '@/app/[lang]/data/data';

const CustomProductCard = ({customProduct,productId,lang}) => {

//? =============================  START useSelector  =============================
    const product = useSelector((state) => selectProductById(state,productId));
    console.log(product)
//? =============================  / END useSelector  =============================

    return (
        <article 
            className='
            shadow-2xl rounded-2xl border-1 border-green-100
            bg-green-50/50
            ms-7 me-2 xs:mx-10 md:mx-20 2xl:mx-40 mb-5 p-2 xs:p-5'
        >
            <header
                className='
                mb-4 pb-1 border-b-2 border-green-900'
            >
                <h1 className='text-green-800 font-bold drop-shadow-lg'>
                    {customizedProductText.customizeRequest[lang]} {product.name[lang]}
                </h1>
            </header>

            <div className='sm:flex'>
                <aside className='mb-2 sm:mb-0 sm:w-2/4 2xl:w-1/4'>
                    <Card shadow="sm">
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={product.name[lang]}
                                className="w-full object-cover h-[240px]"
                                src={`/${product.images[0].name}`}
                            />
                        </CardBody>
                        <CardFooter className="text-small flex-col items-stretch">
                            <b>{product.name[lang]}</b>
                            <div className='flex justify-end'>
                                <p className="text-default-500">
                                    {Number(product.price[lang].amount).toLocaleString()} {product.price[lang].unit}
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
                        <h3 className='font-bold text-green-800 text-sm drop-shadow-lg'> {customizedProductText.ContactInformation[lang]} </h3>
                        <div className='xl:flex justify-between indent-5 text-justify text-green-700 drop-shadow-lg text-sm mb-2'>
                            <p> {customizedProductText.ContactNumber[lang]} </p>
                            <p className='indent-10'> {customProduct?.mobile} </p>
                        </div>
                        <div className='xl:flex justify-between indent-5 text-justify text-green-700 drop-shadow-lg text-sm mb-2'>
                            <p> {customizedProductText.Email[lang]} </p>
                            <p className='indent-10'> {customProduct?.email} </p>
                        </div>
                        <div className='xl:flex justify-between indent-5 text-justify text-green-700 drop-shadow-lg text-sm mb-2'>
                            <p> {customizedProductText.Job[lang]} </p>
                            <p className='indent-10'> {customProduct?.job} </p>
                        </div>
                        <div className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm'>
                            <p> {customizedProductText.Address[lang]} </p>
                            <p> {customProduct?.address} {customizedProductText.ZipCode[lang]} {customProduct?.postalCode} </p>
                        </div>
                    </footer>
                </div>
            </div>
        </article>
    );
};

export default CustomProductCard;