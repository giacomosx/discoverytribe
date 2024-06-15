import React, {useState} from 'react';
import AxiosApi from "../../api/axiosApi";
import {useDebouncedCallback} from "use-debounce";
import TextInputField from "../textinputfield/TextInputField";

const SuggestionsInputField = () => {
    const api = new AxiosApi();
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);


    const debounced = useDebouncedCallback(async () => {

        try {
            const response = await api.get('/geoapi/search?text=' + inputValue);
            const data = await response.results;
            setSuggestions(data)
        } catch (e) {
            console.error(e);
            setSuggestions(['No locations founded!'])
        }

    }, 500)

    const handelChange = (e) => {
        setInputValue(e.target.value);

        if (inputValue.trim() && inputValue.length >= 3) {
            debounced()
        } else {
            setSuggestions([])
        }
    }

    return (
        <div className="App flex flex-col items-center justify-center bg-white dark:bg-gray-800 w-full">
            <h1 className={'text-3xl text-zinc-800 dark:text-white'}>DiscoveryTribe</h1>


            <form className="container mx-auto mt-8 max-w-lg">
                <div className="relative">
                    <TextInputField type={'search'} placeholder={'Search your next destination...'}
                                    onChange={handelChange} value={inputValue} required/>

                    <button type="submit"
                            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                    <div className="absolute suggestions-list">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 w-full">
                            {suggestions && suggestions.length !== 0 && suggestions.map(suggestion => (
                                <li key={suggestion.place_id}>
                                    <button onClick={() => {
                                        setInputValue(suggestion.formatted)
                                        setSuggestions(null)
                                    }} type={'button'}
                                            className={'text-start w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'}>
                                        {suggestion.formatted}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SuggestionsInputField;
