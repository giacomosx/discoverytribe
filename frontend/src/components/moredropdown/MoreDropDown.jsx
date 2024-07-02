import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setModalOpen, setItemId, itemIdToDelete, setItemType} from "../../redux/modalSlice";

const MoreDropDown = ({editUrl, onClick, itemId, typeItem}) => {
    const [openMenu, setOpenMenu] = useState(false);
    const dispatch = useDispatch();

    const handleMenu = () => {
        setOpenMenu(!openMenu);
    }
    
    const handleModal = () => {
        dispatch(setModalOpen());
        dispatch(setItemId(itemId));
        dispatch(setItemType(typeItem))
    }

    return (
        <div className="relative">
            <button onClick={handleMenu}
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                    type="button">
                <span className="sr-only">Open dropdown</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     viewBox="0 0 16 3">
                    <path
                        d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
            </button>
            <div id="dropdown"
                 className={`z-10 ${openMenu ? 'visible' : 'hidden'} absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-fit min-w-32 dark:bg-gray-700 top-0 left-0 -translate-x-full translate-y-6`}>
                <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                        <Link to={editUrl}
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</Link>
                    </li>
                    <li>
                        <button
                            onClick={handleModal}
                           className="w-full text-start block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MoreDropDown;
