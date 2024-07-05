import React, {useState} from 'react';
import LocationInputField from "../searchlocation/LocationInputField";
import Button from "../button/Button";
import AxiosApi from "../../api/axiosApi";
import Spinner from "../spinner/Spinner";

const EditTripLocation = ({mod, tripId}) => {
    const api = new AxiosApi()
    const [destination, setDestination] = useState(mod);
    const [editDestination, setEditDestination] = useState(false);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log(destination);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            setLoading(true);
            const tripData = {
                destination: {
                    destination_formatted: destination.formatted,
                    destination_name: destination.name || destination.address_line1,
                    destination_city: destination.city,
                    destination_state: destination.state,
                    destination_country: destination.country,
                    destination_zipcode: destination.postcode,
                    latitude: destination.latitude,
                    longitude: destination.longitude,
                    place_id: destination.place_id,
                },
            }
            const tripEdited = await api.patch(`/trips/${tripId}/edit`, tripData)
            if (tripEdited) {
                setResponse('Tripe successfully edited!')
                console.log(tripEdited)
            }

        } catch (e) {
            console.log(e)
            setError(true)
            setResponse('Something went wrong!');
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className={`destination p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ${editDestination ? 'h-fit' : 'h-16 overflow-hidden'}`}>
            <div className="mb-4">
                <div className={' flex items-center justify-between'}>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit
                        destination</h2>
                    <button
                        className={'text-sm text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700'}
                        onClick={() => {
                            setEditDestination(!editDestination)
                        }}>Edit
                    </button>
                </div>
            </div>
            <form className={'space-y-6'} onSubmit={handleSubmit}>
                <div className="flex items-center justify-between">
                    <LocationInputField setLocation={setDestination} location={destination} defaultValue={mod.destination?.destination_formatted}/>
                    <Button variants={'rounded'} type={'submit'}>Update</Button>
                </div>
                <div className={'flex justify-end'}>
                    {loading && <Spinner/>}
                    {!error && response && (
                        <span className={'text-green-800 dark:text-green-400 text-sm flex items-center gap-2'}>
                            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            {response}
                        </span>
                    )}
                    {error && (
                        <span className={'text-red-800 dark:text-red-400 text-sm flex items-center gap-2'}>
                            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            {response}
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EditTripLocation;
