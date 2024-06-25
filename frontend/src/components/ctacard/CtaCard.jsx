import React from 'react';
import Button from "../button/Button";

const CtaCard = ({variants, title, onClick, children, buttonTitle}) => {
    return (
        <div
            className={`max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ${variants}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {children}
            </p>

            <Button variants={'rounded'} onClick={onClick}>{buttonTitle}</Button>
        </div>

    );
};

export default CtaCard;
