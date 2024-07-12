import React, {useEffect, useState} from 'react';
import axiosApi from "../../api/axiosApi";
import ListSkeleton from "../listskeleton/ListSkeleton";
import Alerts from "../alerts/Alerts";
import {Link} from "react-router-dom";
import Button from "../button/Button";

const UsersFollowingsPanel = () => {
    const api = new axiosApi()
    const [followings, setFollowings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getFollowings = async () => {
        try {
            const response = await api.get('/user/me/followings')
            setFollowings(response.followings)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
            console.log(error)
        }
    }

    const unFollowUser = async (id) => {
        const updateFollowings = await followings.filter(following => {
            return following._id !== id
        })
        setFollowings(updateFollowings)
        try {
            const response = await api.patch(`/user/${id}/unfollow`)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getFollowings()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {loading && <ListSkeleton/>}
            {error && <Alerts type={'danger'}>Something went wrong!</Alerts>}
            {!loading && !error && followings.length === 0 ? (
                <Alerts>Nobody followings yet!</Alerts>
            ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {followings.length > 0 && followings.map((following) => (
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Link to={`/user/${following._id}`}>
                                        <img className="w-12 h-12 rounded-full" src={following.avatar} alt={following.username}/>
                                    </Link>
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <Link to={`/user/${following._id}`} className={'hover:underline'}>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {following.username}
                                        </p>
                                    </Link>
                                </div>
                                    <Button onClick={() => {
                                        unFollowUser(following._id)
                                    }} variants={'rounded-full'} styleType={'outline'}>Unfollow</Button>
                            </div>
                        </li>
                        ))}
                </ul>
            )}
        </>
    );
};

export default UsersFollowingsPanel;
