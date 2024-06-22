import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white m-4 dark:bg-gray-800 pt-4">
            <div className="w-full">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link to={'/'}
                                                                                                               className="hover:underline">DiscoveryTribe™</Link>. <br/> All Rights Reserved.</span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <li>
                        <Link to={'/'} className="hover:underline me-4 md:me-6">Home</Link>
                    </li>
                    <li>
                        <Link to={'/'} className="hover:underline me-4 md:me-6">About</Link>
                    </li>
                    <li>
                        <Link to={'/'} className="hover:underline">Contact</Link>
                    </li>
                    <li>
                        <Link to={'/'} className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
