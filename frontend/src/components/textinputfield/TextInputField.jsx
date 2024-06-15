import React from 'react';

const TextInputField = ({onChange, value, required, type, placeholder, variants}) => {
    return (
        <input type={type}
               className={`${variants} block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500`}
               placeholder={placeholder}
               onChange={onChange}
               value={value}
               required={required}/>
    );
};

export default TextInputField;

