import React from 'react';
import {Link} from "react-router-dom";

const RightSidebarElement = ({children, title, viewAllUrl}) => {
    return (
        <div
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 min-w-64">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{title}</h5>
                {viewAllUrl && <Link to={viewAllUrl} className={'text-sm text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700'}>View all</Link>}
            </div>
            {children}
        </div>
    );
};

export default RightSidebarElement;
