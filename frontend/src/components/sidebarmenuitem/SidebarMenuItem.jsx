import React from 'react';

const SidebarMenuItem = ({children}) => {
    return (
        <li>
            <button
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                {children}
            </button>
        </li>
    );
};

export default SidebarMenuItem;
