'use client'

import React, { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Image, Chip} from "@nextui-org/react";
import mailer from '@/app/[lang]/utils/mailer';

const SendMultiMailModal = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [mailes, setMailes] = useState([])
    const [mail, setMail] = useState()
    const [names, setNames] = useState([])
    const [name, setName] = useState()

    const [subject, setSubject] = useState()
    const [body, setBody] = useState()

    const handleSendMail =async(email,title,theName,text)=> await mailer(email,title,
        `<div style="text-align: right">
        <h1 style="color: #0099ad"> ${title} </h1>
        <hr style="border-top: 1px solid #ff8e00" />
        <h2 style="color: #003f7e"> ${theName} عزیز </h2>
        <h3 style="color: #003f7e">با سلام و ادب</h3>
        <p style="color: #0099ad; font-weight: 700"> ${text} </p>
        <h3 style="color: #003f7e">با تشکر</h3>
        </div>
        `
    )
    const handleSendMultiMail = () =>{
        mailes.forEach((eMail,index)=>{
            handleSendMail(eMail,subject,names[index],body)
        });
        setMailes([]);
        setNames([]);
    }

    const handelAddMail = () => {
        setMailes((prv)=>[...prv,mail])
        setMail('')
        setNames((prv)=>[...prv,name])
        setName('')
    }

    const handleClose = (nameToRemove,mailIndex) => {
        setNames(names.filter((name) => name !== nameToRemove))
        setMailes(mailes.filter((mail) => mail !== mailes[mailIndex]))
    };

    return (
        <>
            <Button onPress={onOpen} variant="" isIconOnly
                className="
                    animate-bounce
                    w-20 sm:w-24 h-20 sm:h-24 m-10
                    fixed bottom-0 left-0 z-50
                "
            >
                <Image
                    src="/images/GreenEmailIcon.png"
                    alt="email"
                    shadow=""
                    className=""
                />
            </Button>
            
            <Modal isOpen={isOpen} size='2xl' placement='top' onOpenChange={onOpenChange}
                scrollBehavior="inside"
                backdrop="blur"
            >
                
                <ModalContent className=''>
                    {(onClose) => (
                    <>
                        <ModalHeader className='border-b-2 border-green-700 m-4'>
                            <h1 className='font-bold text-lg text-green-800'> ارسال ایمیل </h1>
                        </ModalHeader>
                        
                        <ModalBody>
                            <form className='my-5 py-5 bg-gray-100 rounded-3xl shadow-xl flex flex-col justify-center items-center '>
                                <input className='p-2 mb-4 h-14 w-5/6 sm:w-3/4 rounded-lg' value={mail} type="email" placeholder=' ایمیل ' onChange={ (e)=>{ setMail(e.target.value) } } />
                                <input className='p-2 mb-4 h-14 w-5/6 sm:w-3/4 rounded-lg' value={name} type="text" placeholder=' نام گیرنده ' onChange={ (e)=>{ setName(e.target.value) } } />
                                <Button type='button' isDisabled={mail && name ? false : true}
                                className="pb-2 py-2 h-14 w-5/6 sm:w-3/4 mb-10 rounded-lg text-center text-white font-semibold hover:bg-green-300 bg-green-500"
                                onClick={ handelAddMail }
                                > اضافه کردن گیرنده </Button>
                            </form>
                            {/* <div className='flex gap-3'> {mailes.map((mail,index)=>(<Chip key={index} color="default"> {mail} </Chip>))} </div> */}
                            <div className='flex gap-3'> {names.map((name,index)=>(<Chip key={index} color="default" onClose={() => handleClose(name,index)}> {name} </Chip>))} </div>
                            {mailes.length && names.length ?
                            <form className='my-5 py-5 bg-gray-100 rounded-3xl shadow-xl flex flex-col justify-center items-center '>
                                <input className='p-2 mb-4 h-14 w-5/6 sm:w-3/4 rounded-lg' type="text" placeholder=' عنوان ' onChange={ (e)=>{ setSubject(e.target.value) } } />
                                <input className='p-2 mb-4 h-14 w-5/6 sm:w-3/4 rounded-lg' type="text" placeholder=' متن ایمیل ' onChange={ (e)=>{ setBody(e.target.value) } } />
                                <Button type='button' isDisabled={subject && body ? false : true}
                                className="pb-2 py-2 h-14 w-5/6 sm:w-3/4 mb-10 rounded-lg text-center text-white font-semibold hover:bg-green-300 bg-green-500"
                                onClick={ handleSendMultiMail }
                                onPress={onClose}
                                > ارسال ایمیل </Button>
                            </form>
                            : null }
                            
                        </ModalBody>
                    </>
                    )}
                </ModalContent>
                
            </Modal>
        </>
    );

};

export default SendMultiMailModal;