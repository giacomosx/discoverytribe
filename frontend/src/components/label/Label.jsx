import React from 'react';

const Label = ({children, htmlFor, variants}) => {
    return (
            <label htmlFor={htmlFor}
                   className={`block mb-2 text-gray-800 dark:text-white font-medium text-sm ${variants ? variants : ''}`}>
                {children}
            </label>
    );
};

export default Label;
