import React, {useEffect, useState} from 'react';
import axiosApi from "../../api/axiosApi";
import ListSkeleton from "../listskeleton/ListSkeleton";
import Alerts from "../alerts/Alerts";
import UserListCard from "../userlistcard/UserListCard";

const UsersFollowersPanel = () => {
    const api = new axiosApi()
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getFollowers = async () => {
        try {
            const response = await api.get('/user/me/followers')
            setFollowers(response.followers)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
            console.log(error)
        }
    }


    useEffect(() => {
        getFollowers()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {loading && <ListSkeleton/>}
            {error && <Alerts type={'danger'}>Something went wrong!</Alerts>}
            {!loading && !error && followers.length === 0 ? (
                <Alerts>Nobody followers yet!</Alerts>
            ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {followers.length > 0 && followers.map((follower) => (
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

export default UsersFollowersPanel;
