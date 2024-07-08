import React, {useState} from 'react';
import UserPostsPanel from "../userpostspanel/UserPostsPanel";
import UserTripsPanel from "../usertripspanel/UserTripsPanel";
import UserFollowersPanel from "../usersfollowerspanel/UserFollowersPanel";

const UserTabs = () => {
    const [activeTab, setActiveTab] = useState('posts');
    return (
        <>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center"
                    role="tablist">
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg  ${activeTab === 'posts' ? 'active-tab' : 'dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'}`}
                            onClick={() => setActiveTab('posts')}
                            type="button"
                            role="tab">
                            Posts
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg  ${activeTab === 'trips' ? 'active-tab' : 'dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'}`}
                            onClick={() => setActiveTab('trips')}
                            type="button"
                            role="tab">
                            Trips
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg  ${activeTab === 'followers' ? 'active-tab' : 'dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'}`}
                            onClick={() => setActiveTab('followers')}
                            type="button"
                            role="tab">
                            Followers
                        </button>
                    </li>
                </ul>
            </div>
            <div>
                <div className={`${activeTab === 'posts' ? 'visible' : 'hidden'}`}
                     role="tabpanel">
                    <UserPostsPanel/>
                </div>
                <div className={`${activeTab === 'trips' ? 'visible' : 'hidden'}`}
                     role="tabpanel">
                    <UserTripsPanel/>
                </div>
                <div className={`${activeTab === 'followers' ? 'visible' : 'hidden'}`}
                     role="tabpanel">
                    <UserFollowersPanel/>
                </div>
            </div>
        </>

    )
        ;
};

export default UserTabs;
