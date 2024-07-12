import React, {useEffect} from 'react';
import LandingLayout from "../layout/LandingLayout";
import Spinner from "../components/spinner/Spinner";
import Alerts from "../components/alerts/Alerts";
import SearchInputField from "../components/searchinputfield/SearchInputField";
import {searchResultsState, loadingTripsState, errorTripsState} from "../redux/tripsSlice";
import {getFilteredTrips} from "../redux/actions/tripsActions";
import {useDispatch, useSelector} from "react-redux";
import TripCard from "../components/tripcard/TripCard";

const Explore = () => {
    const dispatch = useDispatch();
    const results = useSelector(searchResultsState);
    const loading = useSelector(loadingTripsState);
    const error = useSelector(errorTripsState);

    useEffect(() => {
        dispatch(getFilteredTrips({
            country: '',
            tripType: ''
        }))
    }, [dispatch])

    return (
        <LandingLayout>
            <section
                className="container max-w-7xl h-fit">
                <SearchInputField />
                <div>
                    {loading && <Spinner/>}
                    {!loading && !error && !results && <Alerts type={'danger'}>Something went wrong!</Alerts>}
                    {!loading && error && <Alerts type={'danger'}>Something went wrong!</Alerts>}
                    <ul className={'grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}>
                        {!loading && results.length > 0 && (
                            results.map(trip => {
                                return <TripCard trip={trip} key={trip._id} userId={trip.userId._id}
                                                 variants={'bg-white p-2 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'}
                                                 moreButton/>
                            })
                        )}
                    </ul>
                    {!loading && results.length === 0 && (
                        <div className={'w-full col-span-4'}>
                            <Alerts>Nothing to see yet!</Alerts>
                        </div>)
                    }
                </div>
            </section>
        </LandingLayout>
    );
};

export default Explore;
