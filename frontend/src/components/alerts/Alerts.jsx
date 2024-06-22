import React from 'react';

const Alerts = ({type, children}) => {
    let alertStyles = `flex items-center p-4 border-t-4 `;

    switch (type) {
        case 'success':
            alertStyles += `text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800`
            break;
        case 'danger':
            alertStyles += `text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800`
            break;
        case 'warning':
            alertStyles += `text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-400 dark:bg-gray-800 dark:border-yellow-800`
            break;
        default:
            alertStyles += `text-purple-800 border-purple-300 bg-purple-50 dark:text-purple-400 dark:bg-gray-800 dark:border-purple-800`
    }

    return (
        <div
            className={alertStyles}
            role="alert">
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <div className="ms-3 text-sm font-medium">
                {children}
            </div>
        </div>
    );
};

export default Alerts;
