import React, {useState} from 'react';
import UsersFollowingsPanel from "../usersfollowingspanel/UsersFollowingsPanel";
import UsersFollowersPanel from "../userfollowerspanel/UsersFollowersPanel";

const UsersTabs = () => {
    const [activeTab, setActiveTab] = useState('followers');
    return (
        <>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center"
                    role="tablist">
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg  ${activeTab === 'followers' ? 'active-tab' : 'dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'}`}
                            onClick={() => setActiveTab('followers')}
                            type="button"
                            role="tab">
                            Followers
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg  ${activeTab === 'followings' ? 'active-tab' : 'dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'}`}
                            onClick={() => setActiveTab('followings')}
                            type="button"
                            role="tab">
                            Followings
                        </button>
                    </li>
                </ul>
            </div>
            <div>
                <div className={`${activeTab === 'followers' ? 'visible' : 'hidden'}`}
                     role="tabpanel">
                    <UsersFollowersPanel />
                </div>
                <div className={`${activeTab === 'followings' ? 'visible' : 'hidden'}`}
                     role="tabpanel">
                    <UsersFollowingsPanel />
                </div>
            </div>
        </>

    )
        ;
};

export default UsersTabs;
