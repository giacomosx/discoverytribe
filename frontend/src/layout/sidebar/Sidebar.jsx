import React from 'react';
import {useSelector} from "react-redux";
import {isSidebarOpen} from "../../redux/sidebarSlice";
import SidebarMenuItem from "../../components/sidebarmenuitem/SidebarMenuItem";
import Footer from "../footer/Footer";
import NewButton from "../../components/newbutton/NewButton";
import {Link} from "react-router-dom";


const Sidebar = () => {
    const sidebarState = useSelector(isSidebarOpen);

    return (
        <aside id="logo-sidebar"
               className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sidebarState === false ? '-translate-x-full' : ''} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
               aria-label="Sidebar">
            <div className={'w-full pb-4 pt-2 sm:hidden px-3'}>
                <NewButton variants={'sm:hidden flex'}/>
            </div>
            <div
                className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 divide-y justify-between flex-col flex">
                <div className={'divide-y'}>
                    <ul className="space-y-2 font-medium pb-4">
                        <SidebarMenuItem>
                            <svg
                                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path fillRule="evenodd"
                                      d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                                      clipRule="evenodd"/>
                            </svg>

                            <Link to={'/me'} className={'ms-3'}>Feed</Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <svg
                                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path fillRule="evenodd"
                                      d="M8.64 4.737A7.97 7.97 0 0 1 12 4a7.997 7.997 0 0 1 6.933 4.006h-.738c-.65 0-1.177.25-1.177.9 0 .33 0 2.04-2.026 2.008-1.972 0-1.972-1.732-1.972-2.008 0-1.429-.787-1.65-1.752-1.923-.374-.105-.774-.218-1.166-.411-1.004-.497-1.347-1.183-1.461-1.835ZM6 4a10.06 10.06 0 0 0-2.812 3.27A9.956 9.956 0 0 0 2 12c0 5.289 4.106 9.619 9.304 9.976l.054.004a10.12 10.12 0 0 0 1.155.007h.002a10.024 10.024 0 0 0 1.5-.19 9.925 9.925 0 0 0 2.259-.754 10.041 10.041 0 0 0 4.987-5.263A9.917 9.917 0 0 0 22 12a10.025 10.025 0 0 0-.315-2.5A10.001 10.001 0 0 0 12 2a9.964 9.964 0 0 0-6 2Zm13.372 11.113a2.575 2.575 0 0 0-.75-.112h-.217A3.405 3.405 0 0 0 15 18.405v1.014a8.027 8.027 0 0 0 4.372-4.307ZM12.114 20H12A8 8 0 0 1 5.1 7.95c.95.541 1.421 1.537 1.835 2.415.209.441.403.853.637 1.162.54.712 1.063 1.019 1.591 1.328.52.305 1.047.613 1.6 1.316 1.44 1.825 1.419 4.366 1.35 5.828Z"
                                      clipRule="evenodd"/>
                            </svg>

                            <span className="ms-3">Explore</span>
                        </SidebarMenuItem>
                    </ul>
                    <ul className="space-y-2 font-medium pt-4">
                        <SidebarMenuItem>
                            <svg
                                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 512 512">
                                <path
                                    d="M479.66 268.7l-32-151.81C441.48 83.77 417.68 64 384 64H128c-16.8 0-31 4.69-42.1 13.94s-18.37 22.31-21.58 38.89l-32 151.87A16.65 16.65 0 0032 272v112a64 64 0 0064 64h320a64 64 0 0064-64V272a16.65 16.65 0 00-.34-3.3zm-384-145.4v-.28c3.55-18.43 13.81-27 32.29-27H384c18.61 0 28.87 8.55 32.27 26.91 0 .13.05.26.07.39l26.93 127.88a4 4 0 01-3.92 4.82H320a15.92 15.92 0 00-16 15.82 48 48 0 11-96 0A15.92 15.92 0 00192 256H72.65a4 4 0 01-3.92-4.82z"/>
                                <path
                                    d="M368 160H144a16 16 0 010-32h224a16 16 0 010 32zM384 224H128a16 16 0 010-32h256a16 16 0 010 32z"/>
                            </svg>

                            <Link to={'/posts'} className={'ms-3'}>My Posts</Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <svg
                                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 512 512">
                                <path
                                    d="M473 39.05a24 24 0 00-25.5-5.46L47.47 185h-.08a24 24 0 001 45.16l.41.13 137.3 58.63a16 16 0 0015.54-3.59L422 80a7.07 7.07 0 0110 10L226.66 310.26a16 16 0 00-3.59 15.54l58.65 137.38c.06.2.12.38.19.57 3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0023-15.46L478.39 64.62A24 24 0 00473 39.05z"/>
                            </svg>

                            <Link to={'/trips'} className={'ms-3'}>My Trips</Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <svg
                                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"/>
                            </svg>


                            <span className="ms-3">Trips Saved</span>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <svg
                                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M17 6h-2V5h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2h-.541A5.965 5.965 0 0 1 14 10v4a1 1 0 1 1-2 0v-4c0-2.206-1.794-4-4-4-.075 0-.148.012-.22.028C7.686 6.022 7.596 6 7.5 6A4.505 4.505 0 0 0 3 10.5V16a1 1 0 0 0 1 1h7v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h5a1 1 0 0 0 1-1v-6c0-2.206-1.794-4-4-4Zm-9 8.5H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Z"/>
                            </svg>


                            <span className="ms-3">Messages</span>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <svg
                                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path fillRule="evenodd"
                                      d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                                      clipRule="evenodd"/>
                            </svg>

                            <span className="ms-3">Users</span>
                        </SidebarMenuItem>
                    </ul>
                </div>
                <Footer/>
            </div>
        </aside>
    );
};

export default Sidebar;
