import React, {useEffect, useState} from 'react';
import Layout from "../layout/Layout";
import AxiosApi from "../api/axiosApi";
import {useSession} from "../hooks/useSession";
import Spinner from "../components/spinner/Spinner";
import Alerts from "../components/alerts/Alerts";
import TripCard from "../components/tripcard/TripCard";

const LikedPosts = () => {
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
    }, [])

    return (
        <Layout>
            <section
                className="h-fit container max-w-5xl">
                {loading && <Spinner/>}
                {!loading && error && <Alerts type="danger">{response}</Alerts>}
                {!loading && error && !trips && <Alerts>No trips founded!</Alerts>}
                {!loading && trips.length > 0 && (
                    <ul className={'grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3'}>
                        {!loading && trips.length > 0 && (
                            trips.map(trip => {
                                return <TripCard trip={trip} key={trip._id}
                                                 userId={trip.userId}
                                                 variants={'bg-white p-2 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'}
                                                 moreButton/>
                            })
                        )}
                    </ul>
                )}
            </section>
        </Layout>
    );
};

export default LikedPosts;
