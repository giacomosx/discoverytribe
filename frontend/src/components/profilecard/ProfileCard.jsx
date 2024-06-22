import React from 'react';

const ProfileCard = ({src, username, email, size, variants}) => {
    let sizeStyle;
    switch (size) {
        case 'xl':
            sizeStyle = 'w-48 h-48';
            break;
        case 'l':
            sizeStyle = 'w-32 h-32';
            break;
        case 's':
            sizeStyle = 'w-16 h-16';
            break;
        case 'xs':
            sizeStyle = 'w-8 h-8';
            break;
        default:
            sizeStyle = 'w-48 h-48';
    }

    return (
        <div className={`flex flex-col items-center justify-center ${variants ? variants : ''}`}>
            <img className={`${sizeStyle} rounded-full shadow-lg object-cover`}
                 src={src} alt="Avatar preview"/>
            <h5 className="mb-1 text-xl font-medium text-gray-800 dark:text-white">{username}</h5>
            <span
                className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
        </div>
    );
};

export default ProfileCard;
