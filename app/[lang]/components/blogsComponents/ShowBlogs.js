
import React from 'react';
import Baner from '../headerFooterComponents/Baner';
import News from './News';
import Event from './Event';
import { blogText } from '../../data/data';

const ShowBlogs = ({params, searchParams}) => {

    const lang = params.lang

    return (
        <div>
            <Baner title={blogText.title[lang]}/>

            <News
                type={"news"}
                category={searchParams.category || "null"}
                page={searchParams.page || 1}
                lang={lang}
                keyword={searchParams.keyword || "null"}
                isInBlogs={true}
            />
            
            <Event
                type={"events"}
                category={searchParams.category || "null"}
                page={searchParams.page || 1}
                lang={lang}
                keyword={searchParams.keyword || "null"}
                isInBlogs={true}
            />
        </div>
    );
};

export default ShowBlogs;