import React, {useEffect, useState} from 'react';
import {useSession} from "../hooks/useSession";
import axiosApi from "../api/axiosApi";
import Spinner from "../components/spinner/Spinner";
import TripCard from "../components/tripcard/TripCard";
import Alerts from "../components/alerts/Alerts";
import Layout from "../layout/Layout";

const Trips = () => {
    const {decodedSession} = useSession()
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const api = new axiosApi()

    const upcomingTrips = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/user/${decodedSession.userId}/trips`)
            setTrips(response.trips)
        } catch (error) {
            console.error(error)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        upcomingTrips()
        // eslint-disable-next-line
    }, [])


    return (
        <Layout>
            <section
                className="container max-w-2xl h-fit">
                {loading && <Spinner/>}
                <ul className={'grid grid-cols-1 gap-8 xl:grid-cols-2'}>
                    {!loading && trips.length > 0 && (
                        trips.map(trip => {
                            return <TripCard trip={trip} key={trip._id} variants={'bg-white p-2 border rounded-lg'} moreButton/>
                        })
                    )}
                </ul>
                {!loading && trips.length === 0 && (
                    <div className={'w-full col-span-4'}>
                        <Alerts>Nothing to see yet!</Alerts>
                    </div>)
                }
                {!loading && error && <Alerts type={'danger'}>Something went wrong!</Alerts>}

            </section>
        </Layout>
    )
        ;
};

export default Trips;
