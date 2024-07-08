import React, {useEffect, useState} from 'react';
import axiosApi from "../../api/axiosApi";
import ListSkeleton from "../listskeleton/ListSkeleton";
import Alerts from "../alerts/Alerts";
import UserListCard from "../userlistcard/UserListCard";
import {useParams} from "react-router-dom";

const UserFollowersPanel = () => {
    const params = useParams();
    const api = new axiosApi()
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getFollowers = async () => {
        try {
            const response = await api.get('/user/followers/' + params.id)
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
    }, [params])

    return (
        <>
            {loading && <ListSkeleton/>}
            {error && <Alerts type={'danger'}>Something went wrong!</Alerts>}
            {!loading && followers.length === 0 ? (
                'No followers yet'
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

export default UserFollowersPanel;
