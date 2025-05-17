
import { Chip } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const Keywords
 = ({keywords,lang,url}) => {
    return (
        <div>
            {keywords.map((keyword,index)=>(
                <Link
                    key={index}
                    href={`/${lang}${url}?keyword=${keyword}`}
                    title={keyword}
                    rel="nofollow noindex"
                >
                    <Chip size="sm" variant="shadow"
                        className='
                        text-gray-400 hover:bg-green-500 hover:text-white m-px'
                    >
                        {keyword}
                    </Chip>
                </Link>
            ))}
        </div>
    );
};

export default Keywords;