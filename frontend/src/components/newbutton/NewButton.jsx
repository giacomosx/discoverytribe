import React, {useState} from 'react';
import Button from "../button/Button";
import { NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setPostModal} from "../../redux/postModalSlice";

const NewButton = ({variants}) => {
    const [openMenu, setOpenMenu] = useState(false)
    const dispatch = useDispatch();

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }

    const handlePostModal = () => {
        dispatch(setPostModal(true))
        setOpenMenu(!openMenu)
    }

    return (
        <div className={`relative`}>
            <Button variants={`rounded ${variants}`} onClick={handleOpenMenu}>
                <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5 text-center" fill="currentColor"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"></path>
                </svg>
                <span>New</span>
            </Button>
            <div
                className={`translate-y-8 right-0 top-0 absolute z-50 ${openMenu ? 'visible' : 'hidden'}  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 min-w-[120px]`}
                id="dropdown-user">
                <ul className="py-1" role="none">
                    <li>
                        <NavLink to={'/post/create'}
                            className="gap-2 flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white text-start"
                            role="menuitem">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                            </svg>
                            Post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/trip/create'}
                            className="gap-2 flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white text-start"
                            role="menuitem">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"/>
                            </svg>
                            Trip
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NewButton;
