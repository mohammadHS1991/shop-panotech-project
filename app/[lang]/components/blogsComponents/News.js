
import React from 'react'
import Link from 'next/link';
import { FetchPaginatedNewsFunction, GetNewsCountFunction } from '../../functions';
import CustomAsyncPagination from '../CustomAsyncPagination';
import NewsEmpty from './NewsEmpty';
import { blogText } from '../../data/data';
import SubBaner from '../headerFooterComponents/SubBaner';
import NewsCard from './NewsCard';
import { notFound } from 'next/navigation';

const News = async ({type, category, page, lang, keyword, isInBlogs=false}) => {
    let newsCount = await GetNewsCountFunction(lang, keyword, category);
    let newsData = await FetchPaginatedNewsFunction(lang, keyword, page || 1, category);
    if (!newsData) notFound();

    return (
        <>
            <Link href={`blogs/news`}>
                <SubBaner title={blogText.newsTitle[lang]} text={'text-6xl'} font={'font-extrabold'}/>
            </Link>

            <main className='mt-5 mb-20 mx-2 xs:mx-5 md:mx-10 lg:mx-20 xl:mx-40'>
                {newsData && newsData.map((news,index)=>(
                    <Link key={index} href={`/${lang}/blogs/news/${news.slug[lang]}`} title={news.slug[lang]}>
                        <NewsCard news={news} lang={lang} keywords={news?.keywords[lang]}/>
                    </Link>
                ))}
            </main>

            {newsData.length == false && <NewsEmpty lang={lang}/> }
            {/* ========== Pagination ========== */}
            <footer>
                <CustomAsyncPagination
                    counts={newsCount}
                    type={isInBlogs === true ? `blogs` : `blogs/${type}`}
                    keyword={keyword}
                    category={category}
                    lang={lang}
                />
            </footer>
        </>
    );
};

export default News;