import React from 'react';
import { Modal,ModalContent,ModalBody,Button,useDisclosure } from "@nextui-org/react";
import { RiContactsFill } from 'react-icons/ri';

const MorInfoModal = ({user}) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            {/* <Button onPress={onOpen} className='hidden sm:block bg-green-500 text-white font-bold'>
                مشاهده اطلاعات بیشتر
            </Button> */}
            <Button isIconOnly variant="light" onPress={onOpen} className='text-green-500 text-2xl font-bold'>
                <RiContactsFill />
            </Button>

            <Modal isOpen={isOpen} size='md' placement='top' onOpenChange={onOpenChange}
                scrollBehavior="inside"
                backdrop="blur"
            >
                <ModalContent className='bg-green-200'>
                    <>
                        <ModalBody>
                            <div className='border border-green-700/30 rounded-lg shadow-lg bg-green-100 px-2 py-10 m-4'>
                                <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm p-1'> نام و نام خانوادگی : {user?.firstName} {user?.lastName} </p>
                                <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm p-1'> ایمیل : {user?.email} </p>
                                <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm p-1'> شماره تماس : {user?.mobile}+ </p>
                                <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm p-1'> شغل : {user?.job} </p>
                                <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm p-1'> رشته تحصیلی : {user?.field} </p>
                                <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm p-1'> آدرس : {user?.address} </p>
                                <p className='indent-5 text-justify text-green-700 drop-shadow-lg text-sm p-1'> کدپستی : {user?.postalCode} </p>
                            </div>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </>
      );
};

export default MorInfoModal;

// user?.firstName
// user?.lastName
// user?.email
// user?.mobile
// user?.postalCode
// user?.job
// user?.field
// user?.address
// user?.role
