import React from 'react';

const TripTypeBadge = ({children}) => {
    return (
        <span
            className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300 flex items-center">
            {children}
        </span>
    );
};

export default TripTypeBadge;
