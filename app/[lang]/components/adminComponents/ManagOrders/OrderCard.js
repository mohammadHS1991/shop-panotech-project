
import { selectProductById } from '@/app/[lang]/reducers/productSlice';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import React from 'react';
import { useSelector } from 'react-redux';

const OrderCard = ({CartItem,lang}) => {
    
//? =============================  START useSelector  =============================
    const product =  useSelector((state) => selectProductById(state,CartItem?.product._id))
//? =============================  / END useSelector  =============================

    return (
        <Card shadow="sm">
            <CardBody className="overflow-visible p-0">
                <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={product?.name[lang]}
                    className="w-full object-cover h-[240px]"
                    src={`/${product?.images[0].name}`}
                />
            </CardBody>
            <CardFooter className="text-small flex-col items-stretch">
                <b>{product?.name[lang]}</b>
                <div className='flex justify-between mt-1'>
                    <p className="text-default-500"> تعداد : {CartItem?.qty} </p>
                    <p className="text-default-500"> {product?.price[lang].unit} {product?.price[lang].amount} </p>
                </div>
            </CardFooter> 
        </Card>
    );
};

export default OrderCard;