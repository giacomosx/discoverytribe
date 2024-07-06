import React, {useEffect, useState} from 'react';
import axiosApi from "../../api/axiosApi";
import CardSkeleton from "../cardskeleton/CardSkeleton";
import TripCard from "../tripcard/TripCard";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {userState} from "../../redux/loginSlice";

const LatestTrips = () => {
    const params = useParams();
    const user = useSelector(userState)
    const userId = params.userId || params.id
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(false)
    const api = new axiosApi()

    const latestTrips = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/user/${userId}/trips`)
            setTrips(response.trips)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        latestTrips()
        // eslint-disable-next-line
    }, [])


    return (
        <ul className={'space-y-6 divide-y -mt-4'}>
            {loading && <CardSkeleton/>}
            {!loading && trips.length > 0 && (
                trips.slice(0,3).map(trip => {
                    return <TripCard trip={trip} key={trip._id} variants={'pt-8'} description={'false'}/>
                })
            )}
        </ul>
    );
};

export default LatestTrips;
