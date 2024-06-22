import React from 'react';
import {Link} from "react-router-dom";

const UserListCard = ({avatar, username, location, userId}) => {
    return (
        <li className="py-3 sm:py-4">
            <Link to={'/'}>
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full"
                             src={avatar} alt={username}/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {username}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {location}
                        </p>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default UserListCard;
