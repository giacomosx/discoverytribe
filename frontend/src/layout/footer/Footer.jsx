import React from 'react';
import {Link} from "react-router-dom";

const Footer = ({variants, logged}) => {
    return (
        <footer className=" pt-4">
            <div className={`${variants ? variants: ''} w-full flex-wrap`}>
                <span className="text-center text-sm text-gray-500 dark:text-gray-400 inline-block w-full md:w-fit">© 2024 <Link to={'/'} className="hover:underline">DiscoveryTribe™</Link>. All Rights Reserved.</span>
                <ul className="gap-4 flex flex-wrap items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400 w-full md:w-fit">
                    <li>
                        <Link to={'/'} className="hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link to={'/'} className="hover:underline">About</Link>
                    </li>
                    <li>
                        <Link to={'/'} className="hover:underline">Contact</Link>
                    </li>
                    <li>
                        <Link to={'/'} className="hover:underline">Privacy Policy</Link>
                    </li>
                </ul>
            </div>
            <span className={`text-center md:text-start text-xs text-gray-500 block ${logged ? 'mt-4' : 'ms-4 mb-2'}`}>Created with 💜 by <Link to={'https://github.com/giacomosx'} className={'underline'}>@giacomosx</Link> </span>
        </footer>
    );
};

export default Footer;
