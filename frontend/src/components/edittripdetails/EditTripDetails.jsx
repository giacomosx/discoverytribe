import React, {useState} from 'react';
import Label from "../label/Label";
import TextInputField from "../textinputfield/TextInputField";
import DatePicker from "react-datepicker";
import Button from "../button/Button";
import AxiosApi from "../../api/axiosApi";
import Spinner from "../spinner/Spinner";

const EditTripDetails = ({tripId, mod}) => {
    const api = new AxiosApi()
    const [editDetails, setEditDetails] = useState(false);
    const [tripTypeSelected, setTripTypeSelected] = useState(mod.type);
    const [startDate, setStartDate] = useState(mod.start_date);
    const [endDate, setEndDate] = useState(mod.end_date);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modDetails, setModDetails] = useState(mod);

    const tripTypes = ['relax', 'sport', 'job', 'family', 'honeymoon', 'adventure', 'shopping']

    const handleTripTypeChange = (e) => {
        setTripTypeSelected(e.target.innerText)
    }

    const handleChange = (e) => {
        setModDetails({
            ...modDetails,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmitDetails = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            setLoading(true);
            const tripData = {
                ...modDetails,
                start_date: startDate,
                end_date: endDate,
                type: tripTypeSelected,
                public: true,
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

    console.log(modDetails)

    return (
        <div
            className={`details p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ${editDetails ? 'h-fit' : 'h-20 overflow-hidden'}`}>
            <div className="mb-4">
                <div className={' flex items-center justify-between'}>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit trip
                        details</h2>
                    <button
                        className={'text-sm text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700'}
                        onClick={() => {
                            setEditDetails(!editDetails)
                        }}>Edit
                    </button>
                </div>
                {!editDetails && (
                    <div>
                        <p className={'text-sm text-gray-400 dark:text-gray-400'}>(Name, description,
                            budget, dates and type)</p>
                    </div>
                )}
            </div>
            <form className={'space-y-6'} onSubmit={handleSubmitDetails}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <Label htmlFor={'name'}>Trip Name</Label>
                        <TextInputField onChange={handleChange}
                                        name={'name'}
                                        type={'text'}
                                        value={modDetails?.name}/>
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor={'description'}
                               variants={'font-medium text-sm'}>Description</Label>
                        <TextInputField onChange={handleChange}
                                        name={'description'}
                                        type={'text'}
                                        value={modDetails?.description}/>
                    </div>
                    <div className="sm:col-span-2 -mb-2">
                        <Label htmlFor={'type'}>Select a trip type</Label>
                        <div className="flex flex-wrap">
                            {tripTypes.map((tripType, i) => (
                                <span key={i}
                                      onClick={handleTripTypeChange}
                                      className={`border mb-2 flex items-center w-fit shrink-0 cursor-pointer transition-all bg-purple-100 text-purple-800 text-sm hover:border-purple-400 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 dark:hover:bg-purple-100 ${tripType === tripTypeSelected ? 'border-purple-400' : 'border-white'}`}>

                                                            {tripType}
                                                    </span>
                            ))}
                        </div>
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
                    <div className="w-full">
                        <Label htmlFor={'budget'}>Budget</Label>
                        <TextInputField onChange={handleChange}
                                        name={'budget'}
                                        type={'number'}
                                        value={modDetails?.budget}/>
                    </div>
                </div>
                <div className="justify-between flex mt-4 items-center">
                    <div>
                        <Button variants="rounded shrink-0" type="submit">Update</Button>
                    </div>
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

export default EditTripDetails;
