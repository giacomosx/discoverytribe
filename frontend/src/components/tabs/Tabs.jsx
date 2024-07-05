import React, {useState} from 'react';
import ChangeUserCover from "../changeusercover/ChangeUserCover";
import ChangeUserAvatar from "../changeuseravatar/ChangeUserAvatar";
import EditUserInfo from '../edituserinfo/EditUserInfo';

const Tabs = ({user}) => {
    const [activeTab, setActiveTab] = useState('');
    console.log(user);
    return (
        <>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center"
                    data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
                    role="tablist">
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg active-tab`}
                                type="button"
                                role="tab">
                            Change Cover
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'avatar' ? 'active-tab' : ''}`}
                                type="button"
                                role="tab">
                            Change Avatar
                        </button>
                    </li>
                </ul>
            </div>
            <div>
                <div className={` p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
                     role="tabpanel">
                    <ChangeUserCover preview={user.cover}/>
                </div>
                <div className={` p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
                     role="tabpanel">
                    <ChangeUserAvatar data={user.avatar}/>
                </div>
                <div className={` p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
                     role="tabpanel">
                    <EditUserInfo user={user}/>
                </div>
            </div>
        </>

    )
        ;
};

export default Tabs;
