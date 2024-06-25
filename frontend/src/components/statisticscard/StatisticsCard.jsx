import React from 'react';

const StatisticsCard = () => {
    return (
            <div className="p-4 rounded-lg ">
                <dl className="grid grid-cols-2 gap-8 p-4 mx-auto text-gray-800 dark:text-white ">
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Trips created</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">100M+</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Users inspired</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">1000s</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Days in travel</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">1B+</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Trips saved</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">90+</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Likes collected</dd>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <dt className="mb-2 text-3xl font-extrabold">4M+</dt>
                        <dd className="text-gray-500 dark:text-gray-400">Spotted places</dd>
                    </div>
                </dl>
            </div>
    );
};

export default StatisticsCard;
