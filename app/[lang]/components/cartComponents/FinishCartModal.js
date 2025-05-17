'use client'

import React, { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { cartText, customTostText } from '../../data/data';
import { useDispatch } from 'react-redux';
import { finishOpenCart } from '../../reducers/userSlice';
import CustomToast from '../CustomToast';

const FinishCartModal = ({totalPrice,totalDiscount,userId,lang}) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [submitLoading, setSubmitLoading] = useState(false);

//? ======================== START useDispatch ========================
    const dispatch = useDispatch();
//? ======================== / END useDispatch ========================
//? ==================== START handleFinishTheCart ====================
    const handleFinishTheCart = async (
        totalCartPrice,
        shippingPrice,
        userId,
        lang
    ) => {
        setSubmitLoading(true);
        const data = { totalCartPrice, totalDiscount, shippingPrice, userId, lang };
        try {
            const res = await dispatch(finishOpenCart(data)).unwrap();
            CustomToast("success", customTostText.products.finishCart.Success[lang]);
            onClose()
        } catch (err) {
            CustomToast("error", customTostText.products.finishCart.Err[lang]);
            onClose()
        } finally {
            setSubmitLoading(false);
        }
    };
//? ==================== / END handleFinishTheCart ====================

    return (
        <>
            <Button
                className="bg-green-500 text-white text-base font-bold w-full mt-5"
                onPress={onOpen}
            >
                {cartText.finishBtnModal.BTN[lang]}
            </Button>
            
            <Modal isOpen={isOpen} size='2xl' placement='top'
              onOpenChange={onOpenChange}
              backdrop="blur"
              scrollBehavior="inside"
            >
                <ModalContent className='bg-gray-100'>
                    <>
                    
                        <ModalHeader className='border-b-2 border-green-700 m-4'>
                            <h1 className='font-bold text-lg text-green-800 '>
                                {cartText.finishBtnModal.BTN[lang]}
                            </h1>
                        </ModalHeader>
                        
                        <ModalBody>
                            <div className='leading-7 text-green-700 flex flex-col items-center justify-center xs:mx-3'>
                                <p className="drop-shadow-2xl text-center">
                                    {cartText.finishBtnModal.upText[lang]}
                                </p>
                                <p
                                    className="
                                    drop-shadow-2xl font-bold text-lg
                                    border-1 border-green-300 rounded-xl
                                    bg-green-200/50 shadow-2xl
                                    my-5 py-5 px-10"
                                >
                                    {cartText.finishBtnModal.cardNumber}
                                </p>
                                <p className="drop-shadow-2xl text-center">
                                    {cartText.finishBtnModal.downText[lang]}
                                </p>
                            </div>
                            <Button
                                className="bg-green-500 text-white text-base font-bold w-full mt-5 py-6"
                                isLoading={submitLoading}
                                onClick={() =>
                                handleFinishTheCart(totalPrice, 500000, userId, lang)
                                }
                            >
                                {cartText.finishBtnModal.BTN[lang]}
                            </Button>
                        </ModalBody>

                        <ModalFooter></ModalFooter>

                    </>
                </ModalContent>
            </Modal>
        </>
    );
};

export default FinishCartModal;