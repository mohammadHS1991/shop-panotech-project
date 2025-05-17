
import React from 'react';
import SearchModal from '../headerFooterComponents/SearchModal';
import HomeSlider from './HomeSlider';
import PanotechModal from './PanotechModal';
import Baner from '../headerFooterComponents/Baner';
import { homeText } from '../../data/data';

const Home = ({lang}) => {

    return (
        <>
            <Baner title={homeText.title[lang]}/>

            <div className='flex justify-center items-center my-5'>
                <h2 className='m-3' > {homeText.welcome[lang]} </h2>
                <SearchModal lang={lang}/>
                <PanotechModal lang={lang}/>
            </div>

            <HomeSlider/>
        </>
    );
};

export default Home;