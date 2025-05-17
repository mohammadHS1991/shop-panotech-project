'use client'

import React from 'react';
import { Card, CardBody, Image, Tab, Tabs } from '@nextui-org/react';
import Link from 'next/link';
import { FaDownload } from 'react-icons/fa';
import { productText } from '../../data/data';

const ProductTabs = ({product, lang}) => {
    return (
        <article className="flex flex-col md:w-1/2 lg:w-2/3 m-2">
            <Tabs aria-label="Options">
                {/* === START Description ==== */}
                <Tab key="fullDescription" title={productText.tab1[lang]}>
                    <Card>
                        <CardBody 
                            className='
                                indent-10 leading-8 text-justify text-green-700 drop-shadow-lg
                                bg-gray-50 
                                px-5 xl:px-10 py-10
                        '>
                            {product?.fullDescription[lang]}
                        </CardBody>
                    </Card>  
                </Tab>
                {/* === / END Description ==== */}
                {/* === START guideImages ==== */}
                <Tab key="guideImages" title={productText.tab2[lang]}>
                    <Card>
                        <CardBody 
                            className='
                                indent-10 leading-8 text-justify text-green-700 drop-shadow-lg
                                bg-gray-50 
                                px-5 xl:px-10 py-10
                        '>
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={product?.name[lang]}
                                className="w-full aspect-square "
                                src={`/${product?.guideImages[0].name}`}
                            />
                        </CardBody>
                    </Card>  
                </Tab>
                {/* === / END guideImages ==== */}
                {/* ===== START useCases ===== */}
                <Tab key="useCases" title={productText.tab3[lang]}>
                    <Card>
                        <CardBody 
                            className='
                                indent-10 leading-8 text-justify text-green-700 drop-shadow-lg
                                bg-gray-50 
                                px-5 xl:px-10 py-10
                        '>
                            {product?.useCases[lang]}
                        </CardBody>
                    </Card>  
                </Tab>
                {/* ===== / END useCases ===== */}
                {/* ===== START Catalog ====== */}
                <Tab key="files" title={productText.tab4[lang]}>
                    <Card>
                        <CardBody 
                            className='
                                indent-10 leading-8 text-justify text-green-700 drop-shadow-lg
                                bg-gray-50 
                                px-5 xl:px-10 py-10
                        '>
                            { product?.files.length>0 ?
                                <Link href={`/${product?.files[0].name}`} className='flex justify-start items-center'>
                                    <FaDownload className='mx-4'/>
                                    <p> {productText.DownloadCatalog[lang]} </p>
                                </Link>
                            :
                                <p className='text-center'> {productText.CatalogNotAvailable[lang]} </p>
                            }
                        </CardBody>
                    </Card>  
                </Tab>
                {/* ===== / END Catalog ====== */}
            </Tabs>
        </article>
    );
};

export default ProductTabs;