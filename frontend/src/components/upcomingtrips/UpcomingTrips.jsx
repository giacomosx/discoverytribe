import React, {useEffect, useState} from 'react';
import {useSession} from "../../hooks/useSession";
import axiosApi from "../../api/axiosApi";
import CardSkeleton from "../cardskeleton/CardSkeleton";

const UpcomingTrips = () => {
    const {decodedSession} = useSession()
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(false)
    const api = new axiosApi()

    const upcomingTrips = async () => {
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
        upcomingTrips()
    }, [])


    return (
        <ul className={'space-y-6 pt-4'}>
            {loading && <CardSkeleton/>}
            {!loading && trips.length > 0 && (
                trips.map(trip => {
                    return (
                        <li key={trip._id}>
                            <article className={'space-y-3.5'}>
                                <img src={trip.cover} className={'w-full rounded-lg'} alt={trip.name}/>
                                <div className="font-medium dark:text-white ps-1">
                                    <h3 className={'-mt-2'}>{trip.name}</h3>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        {trip.destination.destination_name}
                                    </div>
                                    <p className={'text-sm text-gray-700 mt-2'}>{trip.description}</p>
                                </div>
                                <ul className="text-sm text-gray-500 dark:text-gray-400 ps-1">
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 me-2" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                        </svg>
                                        From {trip.start_date} to {trip.end_date}
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 me-2" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="currentColor" viewBox="0 0 20 19">
                                            <path
                                                d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
                                            <path
                                                d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
                                        </svg>
                                        {trip.type}
                                    </li>
                                </ul>
                            </article>
                        </li>
                    )
                })
            )}
        </ul>
    );
};

export default UpcomingTrips;
