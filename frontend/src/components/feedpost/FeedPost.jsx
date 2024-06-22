import React from 'react';

const FeedPost = () => {
    return (
        <li className="mb-10 ms-6">
            <span
                className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <img className="rounded-full shadow-lg" src="https://picsum.photos/200" alt="Bonnie"/>
            </span>
            <div
                className="items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                <div className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                    <span className={'text-gray-500 dark:text-gray-300 mb-3 block'}>@giacomosx: </span>
                    <p>Here are the biggest enterprise
                        technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise
                        technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise
                        technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise
                        technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise
                        technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0 min-w-fit self-end">just now</time>
            </div>
        </li>
    );
};

export default FeedPost;
