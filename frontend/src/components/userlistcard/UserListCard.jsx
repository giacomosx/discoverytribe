import React, {useEffect, useState} from 'react';
import Button from "../button/Button";
import {Link} from "react-router-dom";
import {followingState} from "../../redux/loginSlice";
import {useDispatch, useSelector} from "react-redux";
import {getUserFeed} from "../../redux/actions/feedAction";
import axiosApi from "../../api/axiosApi";

const UserListCard = ({avatar, username, userId}) => {
    const api = new axiosApi()
    const followings = useSelector(followingState)
    const [alreadyFollowing, setAlreadyFollowing] = useState(false);
    const dispatch = useDispatch()

    const followUser = async () => {
        try {
            const response = await api.patch(`/user/${userId}/follow`)
            if (response) {
                setAlreadyFollowing(true)
                dispatch(getUserFeed())
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
                dispatch(getUserFeed())
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (followings.includes(userId)) {
            setAlreadyFollowing(true)
        }
        // eslint-disable-next-line
    }, [followings, api])

    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <Link to={'/'}>
                        <img className="w-12 h-12 rounded-full" src={avatar} alt={username}/>
                    </Link>
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <Link to={'/'} className={'hover:underline'}>
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
