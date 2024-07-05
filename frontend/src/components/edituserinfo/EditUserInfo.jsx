import React, {useState} from 'react';
import Label from "../label/Label";
import TextInputField from "../textinputfield/TextInputField";
import Button from "../button/Button";
import DatePicker from "react-datepicker";
import LocationInputField from "../searchlocation/LocationInputField";
import AxiosApi from "../../api/axiosApi";
import Spinner from "../spinner/Spinner";
import {getUserInfo} from "../../redux/actions/userActions";
import {useDispatch} from "react-redux";

const EditUserInfo = ({user}) => {
    const api = new AxiosApi()
    const initialDate = user.birth_date ? user.birth_date : new Date();
    const [startDate, setStartDate] = useState(initialDate);
    const [editDetails, setEditDetails] = useState(user);
    const [location, setLocation] = useState(null);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [hobbies, setHobbies] = useState([]);

    const handleChange = e => {
        setEditDetails({
            ...editDetails,
            [e.target.name]: e.target.value
        })
    }

    console.log(startDate)

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setLoading(true);

            const editUser = await api.patch('/user/me/edit', {
                ...editDetails,
                birth_date: startDate,
                location: {
                    location_formatted: location?.formatted,
                    location_name: location?.name || location?.address_line1,
                    location_city: location?.city,
                    location_state: location?.state,
                    location_country: location?.country,
                    location_zipcode: location?.postcode,
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                    place_id: location?.place_id,
                }
            });
            setResponse('Details successfully edited!')
            console.log(editUser)
        } catch (e) {
            console.log(e)
            setError(true)
        } finally {
            setLoading(false)
            dispatch(getUserInfo())
        }

    }

    console.log(location)
    console.log(editDetails);
    return (
        <div
            className={'details p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Change your info details</h2>
            <form className="md:grid md:grid-cols-2 gap-4 space-y-4 md:space-y-0" onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor={'name'}>Name:</Label>
                    <TextInputField placeholder={'Es. John'} defaultValue={editDetails.name} onChange={handleChange}
                                    name={'name'}/>
                </div>
                <div>
                    <Label htmlFor={'name'}>Lastname:</Label>
                    <TextInputField placeholder={'Es. Snow'} defaultValue={editDetails.lastname} onChange={handleChange}
                                    name={'lastname'}/>
                </div>
                <div>
                    <Label htmlFor={'name'}>Username:</Label>
                    <TextInputField defaultValue={editDetails.username} onChange={handleChange} name={'username'}/>
                </div>
                <div>
                    <Label htmlFor={'name'}>Location:</Label>
                    <LocationInputField setLocation={setLocation} variants={'w-full'}
                                        defaultValue={editDetails.location?.location_formatted}/>
                </div>
                <div>
                    <Label htmlFor={'name'}>Birth date:</Label>
                    <DatePicker onChange={setStartDate}
                                className={'block p-2.5 w-full z-20 text-sm text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-300 focus:border-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-purple-900 dark:focus:ring-purple-900 disabled:opacity-60'}
                                selected={startDate}
                                name={'startDate'}
                                onSelect={setStartDate}/>
                </div>
                <div>
                    <Label htmlFor={'name'}>Hobbies:</Label>
                    <TextInputField defaultValue={editDetails.hobbies}
                                    placeholder={'Es. Gaming, trekking, swimming... '} name={'hobbies'}
                                    onChange={handleChange}/>
                </div>
                <div className={'col-span-2'}>
                    <Label htmlFor={'name'}>Simple biography:</Label>
                    <textarea rows="4"
                              onChange={handleChange}
                              defaultValue={editDetails.description}
                              name="description"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Type a simple description about you..."></textarea>
                </div>
                <div>
                    <Button type="submit" variants={'rounded'}>Update</Button>
                </div>
                <div className={'max-w-xs'}>
                    {loading && <Spinner size={'w-6 h-6'}/>}
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
                        <span className={'text-red-800 dark:text-red-400 text-sm'}>
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

export default EditUserInfo;
