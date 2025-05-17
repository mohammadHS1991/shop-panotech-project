import { Image } from '@nextui-org/react';
import React from 'react';

const ProductsEmpty = ({lang}) => {
    return (
        <article className=' flex flex-col justify-center items-center '>
            <section 
                className='
                flex flex-col justify-center items-center
                shadow-2xl rounded-lg
                lg:w-1/4 m-5 lg:m-20 '
            >
                <Image
                    width={300}
                    alt="NextUI hero Image"
                    src="/images/empty/emptyProduct.jpg"
                />
                <p className='font-bold text-lg m-5 text-danger-400 text-center' >
                    {
                        lang=='fa' && 'اطلاعاتی برای نمایش موجود نیست !' ||
                        lang=='en' && 'There is no information to display!' ||
                        lang=='ar' && 'لا يوجد معلومات لعرضها!'
                    }
                </p>
            </section>
        </article>
    );
};

export default ProductsEmpty;