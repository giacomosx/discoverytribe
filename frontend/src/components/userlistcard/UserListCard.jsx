import React, {useEffect, useState} from 'react';
import Button from "../button/Button";
import {Link} from "react-router-dom";
import {userState} from "../../redux/loginSlice";
import {useSelector} from "react-redux";
import axiosApi from "../../api/axiosApi";

const UserListCard = ({avatar, username, userId}) => {
    const api = new axiosApi()
    const user = useSelector(userState)
    const [alreadyFollowing, setAlreadyFollowing] = useState(false);

    const followUser = async () => {
        try {
            const response = await api.patch(`/user/${userId}/follow`)
            if (response) {
                setAlreadyFollowing(true)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const unFollowUser = async () => {
        try {
            const response = await api.patch(`/user/${userId}/unfollow`)
            if (response) {
                setAlreadyFollowing(false)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (user.followings?.includes(userId)) {
            setAlreadyFollowing(true)
        }
        // eslint-disable-next-line
    }, [userId])

    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <Link to={`/user/${userId}`}>
                        <img className="w-12 h-12 rounded-full" src={avatar} alt={username}/>
                    </Link>
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <Link to={`/user/${userId}`} className={'hover:underline'}>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {username}
                        </p>
                    </Link>
                </div>
                {alreadyFollowing ?
                    <Button onClick={unFollowUser} variants={'rounded-full'} styleType={'outline'}>Unfollow</Button> :
                    <Button onClick={followUser} variants={'rounded-full'}>Follow</Button>}
            </div>
        </li>
    );
};

export default UserListCard;
