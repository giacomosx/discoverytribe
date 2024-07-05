import React from 'react';
import {Link} from "react-router-dom";

const Footer = ({variants, logged}) => {
    return (
        <footer className=" m-4 dark:bg-gray-800 pt-4">
            <div className={`${variants ? variants: ''} w-full`}>
                <span className="text-sm text-gray-500 dark:text-gray-400">© 2024 <Link to={'/'}
                                                                                                               className="hover:underline">DiscoveryTribe™</Link>. All Rights Reserved.</span>
                <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    <li>
                        <Link to={'/'} className="hover:underline me-4 md:me-6">Home</Link>
                    </li>
                    <li>
                        <Link to={'/'} className="hover:underline me-4 md:me-6">About</Link>
                    </li>
                    <li>
                        <Link to={'/'} className="hover:underline me-4 md:me-6">Contact</Link>
                    </li>
                    <li>
                        <Link to={'/'} className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                    </li>
                </ul>
            </div>
            <span className={`text-xs text-gray-500 block ${logged ? 'mt-4' : ''}`}>Created with 💜 by <Link to={'https://github.com/giacomosx'} className={'underline'}>@giacomosx</Link> </span>
        </footer>
    );
};

export default Footer;
