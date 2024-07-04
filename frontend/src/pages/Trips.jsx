import React, {useEffect, useState} from 'react';
import {useSession} from "../hooks/useSession";
import Spinner from "../components/spinner/Spinner";
import TripCard from "../components/tripcard/TripCard";
import Alerts from "../components/alerts/Alerts";
import Layout from "../layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import {userState} from "../redux/loginSlice";
import {getTrips} from "../redux/actions/tripsActions";
import {errorTripsState, loadingTripsState, userTripsState} from "../redux/tripsSlice";

const Trips = () => {
    const user = useSelector(userState)
    const trips = useSelector(userTripsState);
    const error = useSelector(errorTripsState);
    const loading = useSelector(loadingTripsState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTrips(user._id))
    }, [user, dispatch])


    return (
        <Layout>
            <section
                className="container max-w-2xl h-fit">
                {loading && <Spinner/>}
                <ul className={'grid grid-cols-1 gap-8 xl:grid-cols-2'}>
                    {!loading && trips.length > 0 && (
                        trips.map(trip => {
                            return <TripCard trip={trip} key={trip._id} variants={'bg-white p-2 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'} moreButton/>
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
