'use client'

import React, { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";

import { IoMdMail } from "react-icons/io";
import mailer from '@/app/[lang]/utils/mailer';

const SendMailModal = ({fName,lName,email}) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [mail, setMail] = useState(email)
    const [subject, setSubject] = useState()
    const [name, setName] = useState(fName+' '+lName)
    const [body, setBody] = useState()

    const handleSendMail =async()=> await mailer(mail,subject,
        `<div style="text-align: right">
        <h1 style="color: #0099ad"> ${subject} </h1>
        <hr style="border-top: 1px solid #ff8e00" />
        <h2 style="color: #003f7e"> ${name} عزیز </h2>
        <h3 style="color: #003f7e">با سلام و ادب</h3>
        <p style="color: #0099ad; font-weight: 700"> ${body} </p>
        <h3 style="color: #003f7e">با تشکر</h3>
        </div>
        `
    )

    return (
        <>
            {/* <Button onPress={onOpen} color="primary" className='hidden sm:block text-white mr-2'>
                ارسال ایمیل
            </Button> */}
            <Button onPress={onOpen} isIconOnly variant="light" className=' text-blue-500 text-2xl font-bold'>
                <IoMdMail />
            </Button>
            
            <Modal isOpen={isOpen} size='2xl' placement='top' onOpenChange={onOpenChange}
                scrollBehavior="inside"
                backdrop="blur"
            >
                
                <ModalContent className=''>
                    {(onClose) => (
                    <>
                        <ModalHeader className='border-b-2 border-green-700 m-4'>
                            <h1 className='font-bold text-lg text-green-800'> ارسال ایمیل به {name} </h1>
                        </ModalHeader>
                        
                        <ModalBody>
                            <form className='my-5 py-5 bg-gray-100 rounded-3xl shadow-xl flex flex-col justify-center items-center '>
                                <input className='p-2 mb-4 h-14 w-5/6 sm:w-3/4 rounded-lg' value={mail} type="email" placeholder=' ایمیل ' onChange={ (e)=>{ setMail(e.target.value) } } />
                                <input className='p-2 mb-4 h-14 w-5/6 sm:w-3/4 rounded-lg' type="text" placeholder=' عنوان ' onChange={ (e)=>{ setSubject(e.target.value) } } />
                                <input className='p-2 mb-4 h-14 w-5/6 sm:w-3/4 rounded-lg' value={name} type="text" placeholder=' نام گیرنده ' onChange={ (e)=>{ setName(e.target.value) } } />
                                <input className='p-2 mb-4 h-14 w-5/6 sm:w-3/4 rounded-lg' type="text" placeholder=' متن ایمیل ' onChange={ (e)=>{ setBody(e.target.value) } } />
                                <Button type='button'
                                className="pb-2 py-2 h-14 w-5/6 sm:w-3/4 mb-10 rounded-lg text-center text-white font-semibold hover:bg-green-300 bg-green-500"
                                onClick={ handleSendMail }
                                onPress={onClose}
                                > ارسال ایمیل </Button>
                            </form>
                        </ModalBody>
                    </>
                    )}
                </ModalContent>
                
            </Modal>
        </>
    );

};

export default SendMailModal;