import React from 'react';
import FeedPost from "../feedpost/FeedPost";

const Feed = () => {
    return (
        <div className={'flex flex-col container'}>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                <FeedPost/>
                <FeedPost/>
                <FeedPost/>
                <FeedPost/>
                <FeedPost/>
                <FeedPost/>
                <FeedPost/>
                <FeedPost/>
                <FeedPost/>
                <FeedPost/>
                <FeedPost/>
                <FeedPost/>
                <FeedPost/>
            </ol>
        </div>
    )
        ;
};

export default Feed;
