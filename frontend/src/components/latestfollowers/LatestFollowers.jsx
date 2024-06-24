import React, {useEffect, useState} from 'react';
import UserListCard from "../userlistcard/UserListCard";
import axiosApi from "../../api/axiosApi";
import Spinner from "../spinner/Spinner";
import Alerts from "../alerts/Alerts";
import {useDispatch} from "react-redux";
import {getFollowings} from "../../redux/actions/userActions";

const LatestFollowers = () => {
    const api = new axiosApi()
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

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
        dispatch(getFollowings())
        getFollowers()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="flow-root min-w-52">
            {loading && <Spinner/>}
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
        </div>
    );
};

export default LatestFollowers;
