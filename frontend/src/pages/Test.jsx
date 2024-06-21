import React from 'react';
import SuggestionsInputField from "../components/suggestionsinputfield/SuggestionsInputField";

const Test = () => {
    return (
        <div className={'flex flex-col w-full items-center justify-center'}>
            <h1 className={'text-4xl font-semibold text-gray-900'}>Discovery Tribe</h1>
            <SuggestionsInputField />
        </div>
    );
};

export default Test;
