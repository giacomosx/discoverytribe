import React, {useState} from 'react';
import ChangeUserCover from "../changeusercover/ChangeUserCover";
import ChangeUserAvatar from "../changeuseravatar/ChangeUserAvatar";
import EditUserInfo from '../edituserinfo/EditUserInfo';

const Tabs = ({user}) => {
    const [activeTab, setActiveTab] = useState('details');
    return (
        <>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center"
                    role="tablist">
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg  ${activeTab === 'details' ? 'active-tab' : 'dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'}`}
                                onClick={() => setActiveTab('details')}
                                type="button"
                                role="tab">
                            Change user details
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg  ${activeTab === 'avatar' ? 'active-tab' : 'dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'}`}
                                onClick={() => setActiveTab('avatar')}
                                type="button"
                                role="tab">
                            Change Avatar
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg  ${activeTab === 'cover' ? 'active-tab' : 'dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'}`}
                                onClick={() => setActiveTab('cover')}
                                type="button"
                                role="tab">
                            Change Cover
                        </button>
                    </li>
                </ul>
            </div>
            <div>
                <div className={`${activeTab === 'cover' ? 'visible' : 'hidden'}`}
                     role="tabpanel">
                    <ChangeUserCover preview={user.cover}/>
                </div>
                <div className={`${activeTab === 'avatar' ? 'visible' : 'hidden'}`}
                     role="tabpanel">
                    <ChangeUserAvatar data={user.avatar}/>
                </div>
                <div className={`${activeTab === 'details' ? 'visible' : 'hidden'}`}
                     role="tabpanel">
                    <EditUserInfo user={user}/>
                </div>
            </div>
        </>

    )
        ;
};

export default Tabs;
