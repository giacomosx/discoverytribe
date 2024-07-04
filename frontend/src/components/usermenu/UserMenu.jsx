import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {logout, userState} from "../../redux/loginSlice";
import {NavLink} from "react-router-dom";


const UserMenu = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const userLogged = useSelector(userState)
    const dispatch = useDispatch();

    const openMenuHandler = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <div className={'relative'}>
            <div>
                <button type="button"
                        onClick={openMenuHandler}
                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full"
                         src={userLogged?.avatar}
                         alt="user avatar"/>
                </button>
            </div>
            <div
                className={`translate-y-6 right-0 top-0 absolute z-50 ${openMenu ? 'visible' : 'hidden'}  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 min-w-[120px]`}
                id="dropdown-user">
                <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                        @{userLogged?.username}
                    </p>
                </div>
                <ul className="py-1" role="none">
                    <li>
                        <NavLink to={'/me/settings'}
                            className="gap-2 flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white text-start"
                            role="menuitem">
                            <svg
                                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd"
                                      d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z"
                                      clipRule="evenodd"/>
                            </svg>
                            Settings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/posts/liked'}
                            className="gap-2 flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white text-start"
                            role="menuitem">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path
                                    d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                            </svg>

                            My Likes
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={() => dispatch(logout())}
                                className="gap-2 flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white text-start"
                                role="menuitem">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="32"/>
                            </svg>
                            Sign out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserMenu;
