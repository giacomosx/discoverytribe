import React, {useState} from 'react';
import Label from "../label/Label";
import TextInputField from "../textinputfield/TextInputField";
import LocationInputField from "../searchlocation/LocationInputField";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './tripform.css'
import Button from "../button/Button";
import AxiosApi from "../../api/axiosApi";
import Spinner from "../spinner/Spinner";
import Alerts from "../alerts/Alerts";

const TripForm = () => {
    const api = new AxiosApi();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [destination, setDestination] = useState({});
    const [tripTypeSelected, setTripTypeSelected] = useState(null);
    const [infoTrip, setInfoTrip] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const tripTypes = ['relax', 'sport', 'job', 'family', 'honeymoon', 'adventure', 'shopping']

    const handleTripTypeChange = (e) => {
        setTripTypeSelected(e.target.innerText)
    }
    const handleChange = (e) => {
        setInfoTrip({
            ...infoTrip,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const tripData = {
                ...infoTrip,
                destination: destination,
                start_date: startDate,
                end_date: endDate,
                type: tripTypeSelected
            }
            const createTrip = await api.post('/trips/create', tripData)
            if (createTrip) {
                setResponse('Trip successfully created!')
            }

        } catch (e) {
            console.log(e)
            setError(true)
            setResponse('Something went wrong!')
            /*if (e.response.data.error) {
                setResponse(e.response.data.error)
            }
            if (e.response.data.errors) {
                setError(true)
                setResponse('Something went wrong!')
            }*/
            ;
        } finally {
            setLoading(false)
        }
    }

    console.log(destination)

    return (
        <section
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 container max-w-2xl h-fit">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create a new trip</h2>
            {loading && <Spinner />}
            {!loading && error && <Alerts type={'danger'}>{response}</Alerts>}
            {!loading && !error && response && <Alerts type={'success'}>{response}</Alerts>}
            {!loading && !error && (
                <form className={'space-y-6'} onSubmit={handleSubmit}>
                    <div className="space-y-2 mb-4">

                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <Label htmlFor={'name'}>Trip Name</Label>
                            <TextInputField onChange={handleChange}
                                            placeholder={'Choose the name of your next trip'}
                                            name={'name'}
                                            type={'text'}/>
                        </div>
                        <div className="sm:col-span-2">
                            <Label htmlFor={'description'} variants={'font-medium text-sm'}>Description</Label>
                            <TextInputField onChange={handleChange}
                                            placeholder={'Type a simple description about your trip'}
                                            name={'description'}
                                            type={'text'}/>
                        </div>
                        <div className="sm:col-span-2 -mb-2">
                            <Label htmlFor={'type'}>Select a trip type</Label>
                            <div className="flex flex-wrap">
                                {tripTypes.map((tripType, i) => (
                                    <span key={i}
                                          onClick={handleTripTypeChange}
                                          className={`mb-2 flex items-center w-fit shrink-0 cursor-pointer transition-all bg-purple-100 text-purple-800 text-sm hover:bg-purple-300 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 dark:hover:bg-purple-100 ${tripType === tripTypeSelected ? 'shadow-sm shadow-purple-900 border dark:shadow-purple-200 dark:shadow' : 'border'} border-purple-400`}>

                                    {tripType}
                            </span>
                                ))}
                            </div>
                        </div>
                        <div className="w-full">
                            <Label htmlFor={'destination'}>Destination</Label>
                            <LocationInputField setLocation={setDestination}/>
                        </div>
                        <div className="w-full">
                            <Label htmlFor={'budget'}>Budget</Label>
                            <TextInputField onChange={handleChange}
                                            placeholder={'$ 2.300'}
                                            name={'budget'}
                                            type={'text'}/>
                        </div>
                        <div>
                            <Label htmlFor={'startDate'}>Start date</Label>
                            <DatePicker onChange={setStartDate}
                                        selected={startDate}
                                        name={'startDate'}
                                        onSelect={setStartDate}/>
                        </div>
                        <div>
                            <Label htmlFor={'startDate'}>End date</Label>
                            <DatePicker onChange={setEndDate}
                                        selected={endDate}
                                        name={'endDate'}
                                        onSelect={setEndDate}/>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button variants={'rounded'} type={'submit'}>Next</Button>
                    </div>
                </form>
            )}
        </section>
    );
};

export default TripForm;
