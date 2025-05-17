import React from 'react';
import EventGallery from './EventGallery';
import SelectedGallery from './SelectedGallery';

const GalleryManager = ({lang}) => {
    return (
        <div>
            <SelectedGallery lang={lang}/>
            <EventGallery lang={lang}/>
        </div>
    );
};

export default GalleryManager;