import React, {useEffect, useState} from 'react';
import axiosApi from "../../api/axiosApi";
import ListSkeleton from "../listskeleton/ListSkeleton";
import Alerts from "../alerts/Alerts";
import UserListCard from "../userlistcard/UserListCard";

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
                    {followings.length > 0 && followings.map((follower) => (
                        <UserListCard key={follower._id}
                                      userId={follower._id}
                                      username={follower.username}
                                      avatar={follower.avatar}
                        />
                    ))}
                </ul>
            )}
        </>
    );
};

export default UsersFollowingsPanel;
