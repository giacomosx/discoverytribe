import React from 'react';

const Button = ({children, type, variants, onClick, onSubmit, styleType, disabled}) => {
    return (
        <button type={type}
                disabled={disabled}
                onClick={onClick}
                onSubmit={onSubmit}
                className={`${variants ? variants : ''} ${styleType === 'outline' ? 'text-purple-700 dark:text-purple-600 border border-purple-700 dark:border-purple-600 hover:text-white hover:bg-purple-800 dark:hover:text-white dark:hover:bg-purple-700' : 'text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700'}   focus:outline-none focus:ring-4  font-medium text-sm px-5 py-2.5 text-center dark:focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}>
            {children}
        </button>
    );
};

export default Button;