import React from 'react';

const PostCard = ({post}) => {
    return (
        <div className="space-y-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-full pb-2">
            <div>
                <img className="rounded-t-lg w-full object-cover h-80" src={post.media} alt={post.content}/>
            </div>
            <div className={'px-2 text-sm text-gray-700 flex flex-col justify-between space-y-4'}>
            <p className="truncate">{post.content}</p>
            <span className={'block text-xs text-gray-500 dark:text-gray-400'}>Likes: {post.likes.length}</span>
            </div>
        </div>
    );
};

export default PostCard;
