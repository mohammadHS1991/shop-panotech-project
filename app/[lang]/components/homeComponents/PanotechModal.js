'use client'

import React from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Link from 'next/link';
import { aboutText, homeText } from '../../data/data';

const PanotechModal = ({lang}) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color="success" className='text-white mr-2'> {homeText.panotech[lang]} </Button>
            
            <Modal isOpen={isOpen} size='xl' placement='top'
              onOpenChange={onOpenChange}
              backdrop="blur"
              scrollBehavior="inside"
            >
                <ModalContent className='bg-gray-100'>
                    {(onClose) => (
                    <>
                    
                        <ModalHeader className='border-b-2 border-green-700 m-4'>
                            <h3 className='font-bold text-lg text-green-800 '> {homeText.panotech[lang]} </h3>
                        </ModalHeader>
                        
                        <ModalBody className='indent-10 leading-7 text-green-700 xs:mx-3' >
                            <p className="text-justify drop-shadow-2xl"> {aboutText.text1[lang]} </p>
                        </ModalBody>

                        <ModalFooter>

                            <Button color="danger" variant="light" onPress={onClose}>
                                {lang=='fa' && 'بستن' || lang=='en' && 'Close' || lang=='ar' && 'يغلق'}
                            </Button>

                            <Button color="success" className='text-white' onPress={onClose}>
                                <Link href='/about'>
                                    {aboutText.title[lang]}
                                </Link>
                            </Button>

                        </ModalFooter>

                    </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default PanotechModal;