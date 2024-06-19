import React from 'react';

const Label = ({children, htmlFor}) => {
    return (
            <label htmlFor={htmlFor}
                   className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                {children}
            </label>
    );
};

export default Label;
