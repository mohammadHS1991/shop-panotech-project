'use client'

import React, { useState } from 'react';
import {Modal, ModalContent, ModalBody, Button, useDisclosure} from "@nextui-org/react";
import { cartText, customTostText } from '../../data/data';
import { useDispatch } from 'react-redux';
import CustomToast from '../CustomToast';
import { emptyOpenCart } from '../../reducers/userSlice';
import { emptyTheCart } from '../../reducers/localCartSlice';

const CancelCartModal = ({session,lang}) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [submitLoading, setSubmitLoading] = useState(false);
    const userId = session?.data?.user?.id;

//? ======================== START useDispatch ========================
    const dispatch = useDispatch();
//? ======================== / END useDispatch ========================
//? ==================== START handleCancelTheCart ====================
    const handleCancelTheCart = async () => {
        setSubmitLoading(true);
        try {
            if (session.status === "authenticated") {
                await dispatch(emptyOpenCart({ lang, userId }));
            } else {
                await dispatch(emptyTheCart([]));
            }
            CustomToast("success", customTostText.products.cancelCart.Success[lang]);
            onClose()
        } catch (error) {
            CustomToast("error", customTostText.products.cancelCart.Err[lang]);
            onClose()
        } finally {
            setSubmitLoading(false);
        }
    };
//? ==================== / END handleCancelTheCart ====================

    return (
        <>
            <Button
                className="bg-red-500 text-white text-base font-bold w-full mt-5"
                onPress={onOpen}
            >
                {cartText.cancelBtnModal.BTN[lang]}
            </Button>
            
            <Modal isOpen={isOpen} size='2xl' placement='top'
              onOpenChange={onOpenChange}
              backdrop="blur"
              scrollBehavior="inside"
            >
                <ModalContent>
                    <ModalBody className='bg-danger-50 rounded-2xl p-10'>
                        <p> {cartText.cancelBtnModal.text[lang]} </p>
                        <Button
                            className="bg-red-500 text-white text-base font-bold w-full mt-5"
                            onClick={handleCancelTheCart}
                            isLoading={submitLoading}
                        >
                            {cartText.cancelBtnModal.BTN[lang]}
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CancelCartModal;