import React, {useEffect} from 'react';
import Spinner from "../spinner/Spinner";
import TripCard from "../tripcard/TripCard";
import Alerts from "../alerts/Alerts";
import {useDispatch, useSelector} from "react-redux";
import {getTrips} from "../../redux/actions/tripsActions";
import {errorTripsState, loadingTripsState, userTripsState} from "../../redux/tripsSlice";
import {useParams} from "react-router-dom";

const UserTripsPanel = () => {
    const params = useParams();
    const trips = useSelector(userTripsState);
    const error = useSelector(errorTripsState);
    const loading = useSelector(loadingTripsState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTrips(params.id))
    }, [params, dispatch])


    return (
        <section
            className="container max-w-2xl h-fit mt-8">
            {loading && <Spinner/>}
            {!loading && !error && !trips && <Alerts type={'danger'}>Something went wrong!</Alerts>}
            {!loading && error && <Alerts type={'danger'}>Something went wrong!</Alerts>}
            <ul className={'grid grid-cols-1 gap-8 xl:grid-cols-2'}>
                {!loading && trips.length > 0 && (
                    trips.map(trip => {
                        return <TripCard trip={trip} key={trip._id}
                                         variants={'bg-white p-2 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'}
                                         moreButton/>
                    })
                )}
            </ul>
            {!loading && trips.length === 0 && (
                <div className={'w-full col-span-4'}>
                    <Alerts>Nothing to see yet!</Alerts>
                </div>)
            }
        </section>
    )
        ;
};

export default UserTripsPanel;
