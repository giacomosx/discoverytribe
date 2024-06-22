import React from 'react';

const NotificationElement = () => {
    return (
        <button
           className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
            <div className="flex-shrink-0">
                <img className="w-11 h-11 rounded-full"
                     src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                     alt="Bonnie Green avatar"/>
                <div
                    className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                    <svg className="w-2 h-2 text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path
                            d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z"/>
                        <path
                            d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z"/>
                    </svg>
                </div>
            </div>
            <div className="pl-3 w-full text-start">
                <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">New message
                    from <span
                        className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>:
                    "Hey, what's up? All set for the presentation?"
                </div>
                <div className="text-xs font-medium text-primary-700 dark:text-primary-400">a few
                    moments ago
                </div>
            </div>
        </button>
    );
};

export default NotificationElement;
