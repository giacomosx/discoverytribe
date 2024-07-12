import React, {useState} from 'react';
import Header from "./header/Header";
import Footer from "./footer/Footer";
import {Link} from "react-router-dom";
import Logo from "../components/logo/Logo";
import NewButton from "../components/newbutton/NewButton";
import UserMenu from "../components/usermenu/UserMenu";
import {useSession} from "../hooks/useSession";

const LandingLayout = ({children}) => {
    const {decodedSession} = useSession()
    const [openMenu, setOpenMenu] = useState(false);

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <>
            <Header>
                <nav
                    className={`bg-white border-b border-gray-200 fixed flex-grow top-0 z-50 w-full  dark:bg-gray-800 dark:border-gray-700`}>
                    <div className="px-3 py-3 lg:px-5 lg:pl-3">
                        <div className="flex items-center justify-between flex-wrap">
                            <div className="flex items-center justify-start rtl:justify-end">
                                {decodedSession ? (
                                    <Link to="/me" className="flex items-center space-x-2">
                                        <Logo/>
                                        <h1
                                            className="self-center text-2xl sm:text-3xl font-semibold whitespace-nowrap dark:text-white">DiscoveryTribe</h1>
                                    </Link>
                                ) : (
                                    <Link to="/" className="flex items-center space-x-2">
                                        <Logo/>
                                        <h1
                                            className="self-center text-2xl sm:text-3xl font-semibold whitespace-nowrap dark:text-white">DiscoveryTribe</h1>
                                    </Link>
                                )}
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
                                    <button onClick={handleOpenMenu}
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
                                    <div
                                        className={`${openMenu ? 'h-48' : 'h-0'} w-full md:w-auto md:h-auto md:block transition-all overflow-hidden`}
                                        id="navbar-hamburger">
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
            </Header>
            <div
                className=" flex justify-center md:p-8 mt-[60px] mx-auto landing-body min-h-[calc(100vh-150px)] landing-bg">
                {children}
            </div>
            <Footer variants={'flex justify-between gap-4 border-t dark:border-gray-700 p-4'}/>
        </>
    );
};

export default LandingLayout;
