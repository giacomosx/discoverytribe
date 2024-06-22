import React from 'react';
import {Link} from "react-router-dom";
import Logo from '../../components/logo/Logo'
import {useDispatch} from 'react-redux'
import {setSidebar} from "../../redux/sidebarSlice";
import UserMenu from "../usermenu/UserMenu";
import NotificationMenu from "../notificationmenu/NotificationMenu";
import SearchInputField from "../searchinputfield/SearchInputField";
import NewButton from "../newbutton/NewButton";


const Navbar = () => {
    const dispatch = useDispatch();

    const openSidebarHandler = () => {
        dispatch(setSidebar());
    }

    return (
        <nav
            className="fixed flex-grow top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button onClick={openSidebarHandler}
                                aria-controls="logo-sidebar" type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd"
                                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <Link to="/me" className="flex ms-2 md:me-8 items-center space-x-2">
                            <Logo/>
                            <span
                                className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">DiscoveryTribe</span>
                        </Link>
                        <SearchInputField formClass={'hidden lg:block lg:pl-2'} />

                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center lg:order-2 space-x-6">
                            <NewButton variants={'hidden md:flex'}/>
                            <NotificationMenu/>
                            <UserMenu/>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
};

export default Navbar;