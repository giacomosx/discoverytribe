import React from 'react';
import Button from "../button/Button";
import {Link} from "react-router-dom";

const CtaCard = ({variants, title, onClick, children, buttonTitle, linkUrl, linkTitle, }) => {
    return (
        <div
            className={`max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ${variants}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                {children}
            </p>

            {buttonTitle && (
                <Button variants={'rounded'} onClick={onClick}>{buttonTitle}</Button>
            )}
            {linkUrl && (
                <Link to={linkUrl}
                      className={`text-white rounded bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none focus:ring-4  font-medium text-sm px-5 py-2.5 text-center dark:focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                >{linkTitle}</Link>
            )}
        </div>

    );
};

export default CtaCard;
