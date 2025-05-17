
import React from 'react';
import ContactForms from './ContactForms';

const ContactUs = () => {
    return (
        <section className='lg:flex lg:px-20 '>

            <main className="w-full lg:w-2/3 py-10" >
                <ContactForms/>
            </main>

            <aside 
                className="
                    relative
                    shadow-2xl w-full h-96 lg:w-1/3 lg:h-auto 
                    bg-[url('/images/bgContact.png')] bg-scroll bg-no-repeat bg-center bg-auto
                "
            >
                <div className='absolute top-0 right-0 bottom-0 left-0 bg-green-700 opacity-50'></div>    
            </aside>
            
        </section>
        
    );
};

export default ContactUs;