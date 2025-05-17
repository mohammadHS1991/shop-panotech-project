'use client'

import { Image } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const IslandContactUs = ({lang}) => {

    const url = usePathname()

    return (
        <Link
            href={`/${lang}/contact-us`}
            className=
            {`
                ${url==`/${lang}/contact-us` && 'hidden'}
                animate-bounce
                w-20 h-20 m-4
                fixed bottom-0 right-0 z-50
            `}
        >
            <Image
                src="/images/contactUs.png"
                alt="contactUs"
                shadow=""
                className=""
            />
        </Link>
    );
};

export default IslandContactUs;