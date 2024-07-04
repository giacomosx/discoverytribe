import React, {useEffect, useState} from 'react';
import {useSession} from "../../hooks/useSession";
import axiosApi from "../../api/axiosApi";
import CardSkeleton from "../cardskeleton/CardSkeleton";
import TripCard from "../tripcard/TripCard";

const LatestTrips = () => {
    const {decodedSession} = useSession()
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(false)
    const api = new axiosApi()

    const latestTrips = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/user/${decodedSession.userId}/trips`)
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
