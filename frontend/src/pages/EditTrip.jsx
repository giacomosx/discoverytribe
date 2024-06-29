import React, {useEffect, useState} from 'react';
import Label from "../components/label/Label";
import TextInputField from "../components/textinputfield/TextInputField";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import '../components/tripform/tripform.css'
import Button from "../components/button/Button";
import AxiosApi from "../api/axiosApi";
import Spinner from "../components/spinner/Spinner";
import Alerts from "../components/alerts/Alerts";
import Layout from "../layout/Layout";
import {useParams} from "react-router-dom";
import UploadCover from "../components/uploadcover/UploadCover";
import LocationInputField from "../components/searchlocation/LocationInputField";
import HorizontalTimeline from "../components/horizontaltimeline/HorizontalTimeline";
import Timeline from "../components/timeline/Timeline";

const EditTrip = () => {
    const api = new AxiosApi();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [destination, setDestination] = useState({});
    const [tripTypeSelected, setTripTypeSelected] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [tripId, setTripId] = useState(null);
    const params = useParams()
    const [mod, setMod] = useState({});
    const [editDetails, setEditDetails] = useState(false);
    const [editDestination, setEditDestination] = useState(false);
    const [editCover, setEditCover] = useState(false);
    const [editMilestones, setEditMilestones] = useState(false);

    const tripTypes = ['relax', 'sport', 'job', 'family', 'honeymoon', 'adventure', 'shopping']

    const getTripToEdit = async () => {
        setLoading(true);
        try {
            const trip = await api.get('/trips/' + params.id);
            setMod(trip)
            console.log(mod)
        }catch(error) {
            console.log(error);
            setError(true);
            setResponse('Something went wrong');
        } finally {
            setLoading(false)
        }
    }

    const handleTripTypeChange = (e) => {
        setTripTypeSelected(e.target.innerText)
    }
    const handleChange = (e) => {
        setMod({
            ...mod,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmitDetails = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const tripData = {
                ...mod,
                start_date: startDate,
                end_date: endDate,
                type: tripTypeSelected,
                public: true,
            }
            const createTrip = await api.post('/trips/create', tripData)
            if (createTrip.tripId) {
                setTripId(createTrip.tripId);
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


    useEffect(() => {
        getTripToEdit()
    }, [])

    console.log(editCover)
    return (
        <Layout>
            <section
                className="container max-w-2xl h-fit space-y-8">
                {loading && <Spinner/>}
                {!loading && error && <Alerts type={'danger'}>{response}</Alerts>}
                {!loading && !error && (
                    <>
                        <h1 className={'text-2xl text-gray-800 dark:text-white font-semibold'}>Edit {mod.name} trip</h1>
                        <div
                            className={'cover p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'}>
                            <div className={' flex items-center justify-between mb-2'}>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Change cover</h2>
                                <button
                                    className={'text-sm text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700'}
                                    onClick={() => {
                                        setEditCover(!editCover)
                                    }}>Edit
                                </button>
                            </div>
                            <UploadCover preview={mod.cover} edit={editCover}/>
                        </div>
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
                                        <p className={'text-sm text-gray-400 dark:text-gray-100'}>(Name, description,
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
                                                        value={mod.name}/>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <Label htmlFor={'description'}
                                               variants={'font-medium text-sm'}>Description</Label>
                                        <TextInputField onChange={handleChange}
                                                        name={'description'}
                                                        type={'text'}
                                                        value={mod.description}/>
                                    </div>
                                    <div className="sm:col-span-2 -mb-2">
                                        <Label htmlFor={'type'}>Select a trip type</Label>
                                        <div className="flex flex-wrap">
                                            {tripTypes.map((tripType, i) => (
                                                <span key={i}
                                                      onClick={handleTripTypeChange}
                                                      className={`border mb-2 flex items-center w-fit shrink-0 cursor-pointer transition-all bg-purple-100 text-purple-800 text-sm hover:border-purple-400 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 dark:hover:bg-purple-100 ${tripType === mod.type ? 'border-purple-400' : 'border-white'}`}>

                                                            {tripType}
                                                    </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor={'startDate'}>Start date</Label>
                                        <DatePicker onChange={setStartDate}
                                                    selected={mod.start_date}
                                                    name={'startDate'}
                                                    onSelect={setStartDate}/>
                                    </div>
                                    <div>
                                        <Label htmlFor={'startDate'}>End date</Label>
                                        <DatePicker onChange={setEndDate}
                                                    selected={mod.end_date}
                                                    name={'endDate'}
                                                    onSelect={setEndDate}/>
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor={'budget'}>Budget</Label>
                                        <TextInputField onChange={handleChange}
                                                        name={'budget'}
                                                        type={'text'}
                                                        value={mod.budget}/>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button variants={'rounded'} type={'submit'}>Update</Button>
                                </div>
                            </form>
                        </div>
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
                            <form className={'space-y-6'} onSubmit={handleSubmitDetails}>
                                <div className="flex items-center justify-between">
                                    <LocationInputField setLocation={setDestination}/>
                                    <Button variants={'rounded'} type={'submit'}>Update</Button>
                                </div>
                            </form>
                        </div>
                        <div
                            className={`milestones p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ${editMilestones ? 'h-fit' : 'h-16 overflow-hidden'}`}>
                            <div className="mb-2">
                                <div className={' flex items-center justify-between'}>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit
                                        milestones</h2>
                                    <button
                                        className={'text-sm text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700'}
                                        onClick={() => {
                                            setEditMilestones(!editMilestones)
                                        }}>Edit
                                    </button>
                                </div>
                            </div>

                            {mod.milestones && mod.milestones.length > 0 && (
                                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mb-4">
                                    {mod.milestones.map((milestone) => (
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 text-base dark:text-gray-400 flex items-center justify-between">
                                            <span className={'truncate'}>
                                                {milestone.destination.destination_name}
                                            </span>
                                                <div className={'flex items-center'}>
                                                    <button
                                                        className={'text-gray-500 text-base dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all'}>
                                                        <svg className=" w-5 h-5 "
                                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                             width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth="2"
                                                                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                                        </svg>

                                                    </button>
                                                    <button
                                                        className={'text-gray-500 text-base dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all'}>
                                                        <svg className=" w-5 h-5 "
                                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                             width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth="2"
                                                                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </dt>
                                            <dd className="text-sm text-gray-700 dark:text-gray-300 items-center flex">
                                                <svg className="min- w-5 h-5 me-1" aria-hidden="true"
                                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                                    <path stroke="currentColor" strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                                                </svg>
                                                {milestone.destination.destination_city}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            )}

                            <h2 className="mb-4 text-md font-bold text-gray-900 dark:text-white ">Or add a new
                                milestone</h2>

                            <form className={'space-y-6'}>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <Label htmlFor={'description'}
                                               variants={'font-medium text-sm'}>Description</Label>
                                        <TextInputField
                                            placeholder={'Type a simple description about your milestone'}
                                            name={'description'}
                                            type={'text'}/>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <Label htmlFor={'destination'}>Milestone destination</Label>
                                        <LocationInputField variants={'w-full'}/>
                                    </div>
                                    {/*<div>
                                        <Label htmlFor={'startDate'}>Start date</Label>
                                        <DatePicker onChange={setMilestoneStartDate}
                                                    selected={milestoneStartDate}
                                                    name={'startDate'}
                                                    onSelect={setMilestoneStartDate}/>
                                    </div>
                                    <div>
                                        <Label htmlFor={'startDate'}>End date</Label>
                                        <DatePicker onChange={setMilestoneEndDate}
                                                    selected={milestoneEndDate}
                                                    name={'endDate'}
                                                    onSelect={setMilestoneEndDate}/>
                                    </div>*/}
                                </div>
                                <div className="flex justify-end">
                                    <Button variants={'rounded'} type={'submit'}>Add</Button>
                                </div>
                            </form>
                        </div>
                    </>

                )}
            </section>
        </Layout>
    )
        ;
};

export default EditTrip;
