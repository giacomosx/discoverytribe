import React, {useState} from 'react';
import Label from "../label/Label";
import TextInputField from "../textinputfield/TextInputField";
import DatePicker from "react-datepicker";
import Button from "../button/Button";
import AxiosApi from "../../api/axiosApi";
import Spinner from "../spinner/Spinner";

const EditMileStoneForm = ({mod, setMilestoneSelected, milestonesCreated, setMilestonesCreated}) => {
    const api = new AxiosApi();
    const [milestone, setMilestone] = useState(mod);
    const [milestoneStartDate, setMilestoneStartDate] = useState(mod.start_date);
    const [milestoneEndDate, setMilestoneEndDate] = useState(mod.end_date);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const handleMilestoneDescription = (e) => {
        setMilestone({
            ...milestone,
            description: e.target.value,
        })
    }

    const handleNewMilestone = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const milestoneData = {
                ...milestone,
                start_date: milestoneStartDate,
                end_date: milestoneEndDate,
            }
            const editMilestone = await api.patch(`/milestones/${mod._id}/edit`, milestoneData)
            const milestoneEdited = await editMilestone.editedMilestone

            const updatedMilestones= await milestonesCreated.filter(milestone => {
                return milestone._id !== milestoneEdited._id
            })

            console.log(updatedMilestones)

            await setMilestonesCreated([
                ...updatedMilestones,
                milestoneEdited,
            ]);
            setResponse('Milestone successfully edited!')
        } catch (e) {
            console.log(e)
            setError(true)
            setResponse('Something went wrong!');
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className={'space-y-6 py-4'} onSubmit={handleNewMilestone}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2 ">
                    <div className="w-full flex items-center justify-between mb-4">
                        <h4 className={'text-gray-400 dark:text-white text-xl'}>Editing: {milestone.name}</h4>
                        <button className={'inline-block underline dark:text-purple-600 text-sm'} onClick={() =>{
                            setMilestoneSelected(null)
                        }}>Close</button>
                    </div>
                    <TextInputField name={'destination'} value={milestone.destination.destination_formatted}
                                    variants={'disabled:cursor-not-allowed '} disabled={true}/>
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
                              value={milestone.description}
                              onChange={handleMilestoneDescription}
                              name="description"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Type a simple description about your milestone"></textarea>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <Button variants={'rounded'} type={'submit'}>Update</Button>
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
    );
};

export default EditMileStoneForm;
