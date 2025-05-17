'use client'

import React from 'react';
import {Modal,ModalContent,ModalBody,useDisclosure,Image,Button} from '@nextui-org/react';

const ImageModal = ({src,alt}) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button variant="light" onPress={onOpen} className='h-auto'>
                <Image alt={alt} src={src} className='aspect-video'/>
            </Button>

            <Modal isOpen={isOpen} size='full' placement='top'
                onOpenChange={onOpenChange}
                backdrop="blur"
                scrollBehavior="inside"
                classNames={{
                    closeButton: "bg-red-500/50 text-white hover:text-gray-400 active:bg-white/10",
                  }}
            >
                <ModalContent className="bg-transparent shadow-none">
                    <ModalBody className='flex justify-center items-center'>
                        <Image alt={alt} src={src} className='aspect-video'/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ImageModal;