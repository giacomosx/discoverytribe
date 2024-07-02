import React, {useState} from 'react';
import Label from "../label/Label";
import LocationInputField from "../searchlocation/LocationInputField";
import Button from "../button/Button";
import DatePicker from "react-datepicker";
import AxiosApi from "../../api/axiosApi";
import Spinner from "../spinner/Spinner";
import EditMileStoneForm from "../editmilestoneform/EditMilestoneForm";

const EditTripMilestones = ({mod, tripId}) => {
    const api = new AxiosApi();
    const [milestonesCreated, setMilestonesCreated] = useState(mod.milestones);
    const [milestone, setMilestone] = useState({});
    const [editMilestones, setEditMilestones] = useState(false);
    const [milestoneStartDate, setMilestoneStartDate] = useState(new Date());
    const [milestoneEndDate, setMilestoneEndDate] = useState(new Date());
    const [milestoneForm, setMilestoneForm] = useState(false);
    const [milestoneSelected, setMilestoneSelected] = useState(null);
    const [milestoneDestination, setMilestoneDestination] = useState(null);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    console.log(milestonesCreated);

    const handleNewMilestoneform = () => {
        setMilestoneForm(!milestoneForm);
    }

    const editMilestone = (milestone) => {
        setMilestoneSelected(milestone)
    }

    const handleMilestoneDescription = (e) => {
        setMilestone({
            ...milestone,
            description: e.target.value
        });
    }

    const handleNewMilestone = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const milestoneData = {
                ...milestone,
                rel_trip: tripId,
                destination: {
                    destination_formatted: milestoneDestination.formatted,
                    destination_name: milestoneDestination.name || milestoneDestination.address_line1,
                    destination_city: milestoneDestination.city,
                    destination_state: milestoneDestination.state,
                    destination_country: milestoneDestination.country,
                    destination_zipcode: milestoneDestination.postcode,
                    latitude: milestoneDestination.latitude,
                    longitude: milestoneDestination.longitude,
                    place_id: milestoneDestination.place_id,
                },
                start_date: milestoneStartDate,
                end_date: milestoneEndDate,
            }
            const createMilestone = await api.post('/milestones/create', milestoneData)
            const milestoneCreated = await createMilestone.milestone

            console.log(milestoneCreated)

            await setMilestonesCreated([
                ...milestonesCreated,
                milestoneCreated,
            ]);
            setMilestoneForm(false)
            setResponse('Milestone successfully created!')
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
            className={`milestones p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ${editMilestones ? 'h-fit' : 'h-20 overflow-hidden'}`}>
            <div className="mb-2">
                <div className={' flex items-center justify-between'}>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit
                        milestones details</h2>
                    <button
                        className={'text-sm text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700'}
                        onClick={() => {
                            setEditMilestones(!editMilestones)
                        }}>Edit
                    </button>
                </div>
                <div>
                    <p className={'text-sm text-gray-400 dark:text-gray-400'}>(Dates and description)</p>
                </div>
            </div>

            {milestonesCreated && milestonesCreated.length > 0 && (
                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mb-4">
                {milestonesCreated.map((milestone) => (
                        <div className="flex flex-col py-3" key={milestone._id}>
                            {milestoneSelected !== milestone ? (
                                <>
                                    <dt className="mb-1 text-gray-500 text-base dark:text-gray-400 flex items-center justify-between">
                                            <span className={'truncate me-4'}>
                                                {milestone.destination.destination_name}
                                            </span>
                                        <div className={'flex items-center gap-2'}>
                                            <button
                                                onClick={() => {
                                                    editMilestone(milestone)
                                                }}
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
                                </>
                            ) : (
                                <EditMileStoneForm mod={milestone} setMilestoneSelected={setMilestoneSelected} milestonesCreated={milestonesCreated} setMilestonesCreated={setMilestonesCreated} />
                            )}
                        </div>
                    ))}
                </dl>
            )}

            {!milestoneSelected && editMilestones && (
                <div>
                    <Button variants={'rounded'} onClick={handleNewMilestoneform}>Add a new milestone </Button>
                </div>
            )}

            {milestoneForm && (
                <form className={'space-y-6 mt-8'} onSubmit={handleNewMilestone}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <Label htmlFor={'destination'}>Milestone destination</Label>
                            <LocationInputField
                                setLocation={setMilestoneDestination}
                                variants={'w-full'}
                                required/>
                        </div>
                        <div>
                            <Label htmlFor={'startDate'}>Start date</Label>
                            <DatePicker onChange={setMilestoneStartDate}
                                        required
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
                        </div>
                        <div className="sm:col-span-2">
                            <Label htmlFor={'description'} variants={'font-medium text-sm'}>Description</Label>
                            <textarea rows="4"
                                      required
                                      onChange={handleMilestoneDescription}
                                      name="description"
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Type a simple description about your milestone"></textarea>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <Button variants={'rounded'} type={'submit'}>Add</Button>
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
            )
            }
        </div>
    )
        ;
};

export default EditTripMilestones;
