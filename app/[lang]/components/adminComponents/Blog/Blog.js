import React from 'react';
import EventBlog from './EventBlog';
import NewsBlog from './NewsBlog';

const Blog = ({params}) => {
    return (
        <div>
            <NewsBlog params={params}/>
            <EventBlog params={params}/>
        </div>
    );
};

export default Blog;