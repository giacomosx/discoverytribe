import React from 'react';
import UserListCard from "../userlistcard/UserListCard";

const LatestFollowers = () => {
    return (
        <div className="flow-root min-w-52">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <UserListCard />
            </ul>
        </div>
    );
};

export default LatestFollowers;
