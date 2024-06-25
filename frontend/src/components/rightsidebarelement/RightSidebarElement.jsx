import React from 'react';

const RightSidebarElement = ({children, title}) => {
    return (
        <div
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 min-w-64">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{title}</h5>
            </div>
            {children}
        </div>
    );
};

export default RightSidebarElement;
