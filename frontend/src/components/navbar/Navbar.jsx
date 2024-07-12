import React from 'react';
import {Link} from "react-router-dom";
import Logo from '../../components/logo/Logo'
import {useDispatch} from 'react-redux'
import {setSidebar} from "../../redux/sidebarSlice";
import UserMenu from "../usermenu/UserMenu";
import NewButton from "../newbutton/NewButton";
import {useSession} from "../../hooks/useSession";


const Navbar = () => {
    const dispatch = useDispatch();
    const {decodedSession} = useSession()

    console.log(decodedSession);

    const openSidebarHandler = () => {
        dispatch(setSidebar());
    }

    return (
        <nav
            className={`bg-white border-b border-gray-200 fixed flex-grow top-0 z-50 w-full  dark:bg-gray-800 dark:border-gray-700`}>
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between flex-wrap">
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
                        <Link to="/me" className="flex items-center space-x-1">
                            <Logo/>
                            <h1
                                className="self-center text-2xl sm:text-3xl font-semibold whitespace-nowrap dark:text-white">DiscoveryTribe</h1>
                        </Link>

                    </div>

                    <div className="flex items-center md:order-last">
                        {decodedSession ? (
                            <div className="flex items-center lg:order-2 space-x-6">
                                <NewButton variants={'hidden md:flex'}/>
                                <UserMenu/>
                            </div>
                        ) : (
                            <Link to="/login"
                                  className="hidden md:inline-block text-gray-500 dark:text-white text-sm hover:underline">Login</Link>
                        )}

                    </div>
                    {!decodedSession && (
                        <>
                            <button data-collapse-toggle="navbar-hamburger" type="button"
                                    className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                    aria-controls="navbar-hamburger" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M1 1h15M1 7h15M1 13h15"/>
                                </svg>
                            </button>
                            <div className="hidden w-auto md:block" id="navbar-hamburger">
                                <ul className="flex flex-col md:flex-row font-medium mt-4 md:mt-0 rounded-lg dark:border-gray-700 md:space-x-2">
                                    <li>
                                        <Link to="/"
                                              className="block py-2 px-3 text-white bg-purple-700 rounded dark:bg-purple-600"
                                              aria-current="page">Home</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'}
                                              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">About</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'}
                                              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Contact</Link>
                                    </li>
                                    <li className={'md:hidden'}>
                                        <Link to={'/login'}
                                              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
};

export default Navbar;