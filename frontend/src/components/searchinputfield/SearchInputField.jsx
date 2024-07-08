import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {getFilteredTrips} from "../../redux/actions/tripsActions";
import Button from "../button/Button";

const SearchInputField = () => {
    const [country, setCountry] = useState("");
    const [tripType, setTripType] = useState("");
    const dispatch = useDispatch();

    const handleChangeCountry = (e) => {
        setCountry(e.target.value);
    }

    const handleChangeTripType = (e) => {
        setTripType(e.target.value);
    }

    const resetFilter = () => {
        try {
            setTripType('')
            setCountry('')
            dispatch(getFilteredTrips({
                country: '',
                tripType: '',
            }))
        } catch (error) {
            console.error(error);
        }
    }


    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(getFilteredTrips({
                country: country,
                tripType: tripType,
            }))
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            <div className="mb-12 rounded-lg relative bg-white dark:bg-gray-800 px-4 md:px-8 py-4 border border-gray-200 shadow-sm md:rounded-full mx-auto max-w-2xl">
                <form className={'flex items-center justify-center gap-4 flex-wrap'} onSubmit={onSubmit}>
                    <label htmlFor="topbar-search" className="sr-only">Search by country</label>
                    <div className="relative mt-1 w-full sm:w-fit md:max-w-48">
                        <div
                            className="flex absolute inset-y-0 left-0 items-center pointer-events-none ps-3">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" name="country" id="topbar-search"
                               onChange={handleChangeCountry}
                               className="w-full ps-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                               placeholder="Search a destination"
                        />
                    </div>
                    <div className={'w-full sm:w-fit'}>
                        <select name={'tripType'}
                                onChange={handleChangeTripType}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500">
                            <option defaultValue>Choose a trip type</option>
                            <option value={'relax'}>Relax</option>
                            <option value={'sport'}>Sport</option>
                            <option value={'job'}>Job</option>
                            <option value={'family'}>Family</option>
                            <option value={'honeymoon'}>HoneyMoon</option>
                            <option value={'adventure'}>Adventure</option>
                            <option value={'shopping'}>Shopping</option>
                            <option value={'fun'}>Fun</option>
                        </select>
                    </div>
                    <div className={'space-x-2'}>
                        <Button variants={'rounded-full'}>Search</Button>
                        <button className={'underline text-xs text-gray-500 dark:text-gray-300'} type={'button'} onClick={resetFilter}>Reset filter</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SearchInputField;
