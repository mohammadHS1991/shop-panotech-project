'use client'

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addedToLocalCart } from '../../reducers/localCartSlice';
import { editUserOpenCart } from '../../reducers/userSlice';
import { useSession } from 'next-auth/react';
import { Button } from '@nextui-org/react';
import { FaShoppingCart } from 'react-icons/fa';
import CustomToast from '../CustomToast';
import { customTostText, productText } from '../../data/data';

const AddToCartBtn = ({product ,lang}) => {

    const productId= product?._id
    const session = useSession();
    const userId = session?.data?.user?.id;
    const [addLoading, setAddLoading] = useState(false);
//? ======================== START useDispatch ========================
    const dispatch = useDispatch()
//? ======================== /END useDispatch =========================
//? ====================== START handleAddToCart ======================
    const handleAddToCart = async (productId, qty) => {
        if (session.status == "authenticated") {
            setAddLoading(true)
            try {
                const data = { productId, userId, qty };
                const res = await dispatch(editUserOpenCart(data)).unwrap();
                CustomToast("success", customTostText.products.addToCart.Success[lang]);
            } catch (err) {
                CustomToast("error", customTostText.products.addToCart.Err[lang]);
            } finally {
                setAddLoading(false);
            }
        } else {
            dispatch(addedToLocalCart({ productId, productQty:50 , qty }))
            CustomToast("success", customTostText.products.addToCart.Success[lang]);
        }
    };
//? ====================== / END handleAddToCart ======================
    return (
        <Button endContent={<FaShoppingCart />}
            className='w-full bg-green-500 text-white text-base font-bold'
            onClick={()=>{handleAddToCart(productId, 1)}}
            isLoading={addLoading}
            isDisabled={product.qty <= 0}
        >
            {productText.addBTN[lang]}
        </Button>
    );
};

export default AddToCartBtn;