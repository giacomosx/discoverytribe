import React from 'react';
import Button from "../button/Button";

const UserCard = ({avatar, username, location, userId}) => {

    return (
        <div
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-4 lg:p-4">
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={avatar} alt={username}/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{username}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{location}</span>
                <div className="flex mt-4 md:mt-6 space-x-2">
                    <Button variants={'rounded-full'}>Follow</Button>
                    <Button variants={'rounded-full'} styleType={'outline'}>Message</Button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
