import React, {useEffect, useState} from 'react';
import {useSession} from "../../hooks/useSession";
import axiosApi from "../../api/axiosApi";
import CardSkeleton from "../cardskeleton/CardSkeleton";
import TripCard from "../tripcard/TripCard";
import AxiosApi from "../../api/axiosApi";
import Alerts from "../alerts/Alerts";

const SavedTripsWidget = () => {
    const api = new AxiosApi()
    const user = useSession()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [response, setResponse] = useState(null);
    const [trips, setTrips] = useState([]);

    const getTrips = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/user/${user.decodedSession.userId}/liked-trips`)
            const data = await response.liked_trips;
            setTrips(data)
        } catch (e) {
            console.log(e)
            setError(true)
            setResponse('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTrips()
        // eslint-disable-next-line
    }, [])


    return (
        <ul className={'space-y-6 divide-y -mt-4'}>
            {loading && <CardSkeleton/>}
            {!loading && error && <Alerts type="danger">{response}</Alerts>}
            {!loading && error && !trips && <Alerts>Nothing to see yet!</Alerts>}
            {!loading && trips.length > 0 && (
                trips.slice(0,3).map(trip => {
                    return <TripCard trip={trip} key={trip._id} variants={'pt-8'} description={'false'}/>
                })
            )}
        </ul>
    );
};

export default SavedTripsWidget;
