import React from 'react';

const TextInputField = ({onChange, value, required, type, placeholder, variants, label, name}) => {
    return (
        <input type={type}
               aria-label={label}
               className={`${variants ? variants : ''} block p-2.5 w-full z-20 text-sm text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-300 focus:border-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-purple-900 dark:focus:ring-purple-900`}
               placeholder={placeholder}
               onChange={onChange}
               value={value}
               required={required}
               name={name}/>
    );
};

export default TextInputField;

