import React from 'react';
import {Link} from "react-router-dom";

const SignUpHero = () => {
    return (
        <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Explore,
                Share, Connect</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Welcome
                to &nbsp;
                <span className={'underline'}>DiscoveryTribe</span>, the global community of passionate
                travelers! Discover new destinations, share
                your adventures, and connect with fellow explorers. Join us today and start your journey of
                discovery!</p>
            <Link to={'/'}
                  className="text-purple-700 dark:text-purple-600 hover:underline font-medium text-lg inline-flex items-center">Read
                more about our app
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
        </div>
    );
};

export default SignUpHero;
