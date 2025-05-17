'use client'

import React, { useState } from 'react';
import { BiSolidDirections } from "react-icons/bi";
import { IoPerson } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { TbRouteX } from "react-icons/tb";
import SendAddressModal from './SendAddressModal';
import InvoiceAddressModal from './InvoiceAddressModal';
const Address = () => {

// =============================================** sendAddress **=============================================
    const [sendAddress,setSendAddress] = useState(
        {
            name:' مهدی هاشمی ',
            city:' شهرری ',
            address:' آوینی-کریمی شیرازی-پلاک 5 ',
            postalCode:579761211,
        }
    )
    const handleSendAddress = (values) => {
        setSendAddress(values)
    }
// =============================================** /sendAddress **=============================================
// =============================================** invoiceAddress **=============================================
    const [invoiceAddress,setInvoiceAddress] = useState(
        {
            name:' محمدهادی ثامنی ',
            city:' تهران ',
            address:' ازگل-توانبخشی-الگانت-46 ',
            postalCode:169681921,
        }
    )
    const handleInvoiceAddress = (values) => {
        setInvoiceAddress(values)
    }
// =============================================** /invoiceAddress **=============================================
    return (
        <section>

            <div className='md:flex lg:mt-20 ms-8 mx-4 lg:mx-8 gap-4 lg:gap-8'>
{/* =============================================** invoiceAddress **============================================= */}
                <article className='shadow-2xl rounded-2xl p-8 mb-4 md:mb-0 md:w-1/2 bg-white' >
                    <header className='flex justify-between mb-8'>
                        <div>
                            <h1 className='font-bold text-lg text-green-800'> آدرس صورت حساب </h1>
                            <span className='text-gray-400 text-small'> آدرس اصلی شما </span>
                        </div>
                        <InvoiceAddressModal invoiceAddress={invoiceAddress} handleInvoiceAddress={handleInvoiceAddress}/>
                    </header>
                    <main className='leading-10'>
                        <div className='flex items-center'>
                            <IoPerson className='me-2 text-xl text-gray-400'/>
                            <p className='text-green-700 drop-shadow-2xl'> {invoiceAddress.name} </p>
                        </div>
                        <div className='flex items-center'>
                            <FaLocationDot className='me-2 text-xl text-gray-400'/>
                            <p className='text-green-700 drop-shadow-2xl'> {invoiceAddress.city} </p>
                        </div>
                        <div className='flex items-center'>
                            <TbRouteX className='me-2 text-xl text-gray-400'/>
                            <p className='text-green-700 drop-shadow-2xl'> {invoiceAddress.address} </p>
                        </div>
                        <div className='flex items-center'>
                            <BiSolidDirections className='me-2 text-xl text-gray-400'/>
                            <p className='text-green-700 drop-shadow-2xl'> {invoiceAddress.postalCode} </p>
                        </div>
                    </main>
                </article>
{/* =============================================** sendAddress **============================================= */}
                <article className='shadow-2xl rounded-2xl p-8 md:w-1/2 bg-white' >
                    <header className='flex justify-between mb-8'>
                        <div>
                            <h1 className='font-bold text-lg text-green-800'> آدرس حمل ونقل </h1>
                            <span className='text-gray-400 text-small'> آدرس ارسال مرسوله </span>
                        </div>
                        <SendAddressModal sendAddress={sendAddress} handleSendAddress={handleSendAddress}/>
                    </header>
                    <main className='leading-10'>
                        <div className='flex items-center'>
                            <IoPerson className='me-2 text-xl text-gray-400'/>
                            <p className='text-green-700 drop-shadow-2xl'> {sendAddress.name} </p>
                        </div>
                        <div className='flex items-center'>
                            <FaLocationDot className='me-2 text-xl text-gray-400'/>
                            <p className='text-green-700 drop-shadow-2xl'> {sendAddress.city} </p>
                        </div>
                        <div className='flex items-center'>
                            <TbRouteX className='me-2 text-xl text-gray-400'/>
                            <p className='text-green-700 drop-shadow-2xl'> {sendAddress.address} </p>
                        </div>
                        <div className='flex items-center'>
                            <BiSolidDirections className='me-2 text-xl text-gray-400'/>
                            <p className='text-green-700 drop-shadow-2xl'> {sendAddress.postalCode} </p>
                        </div>
                    </main>
                </article>

            </div>

            <article
                className="
                    bg-[url('/images/mapSent.png')] md:bg-none bg-no-repeat bg-contain bg-center
                    shadow-2xl rounded-2xl bg-white
                    p-8 ms-8 m-4 lg:m-8 flex
            ">
                <div className="md:w-2/3 bg-white opacity-70 md:opacity-100">
                    <header className='mb-8'>
                        <h1 className='font-bold text-lg text-green-800'> رویه ارسال سفارشات فروشگاه </h1>
                    </header>
                    <main className='indent-10 leading-8 space-y-5 text-green-700'>
                        <p className="text-justify drop-shadow-2xl"     >
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        </p>
                        <p className="text-justify drop-shadow-2xl"     >
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        </p>
                    </main>
                </div>
                <div className="hidden md:block w-1/3 bg-[url('/images/mapSent.png')] bg-no-repeat bg-contain bg-center"></div>
            </article>
            
        </section>
    );
};

export default Address;