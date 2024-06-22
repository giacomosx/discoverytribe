import React from 'react';
import LocationInputField from "../components/searchlocation/LocationInputField";

const Test = () => {
    return (
        <div className={'flex flex-col w-full items-center justify-center'}>
            <h1 className={'text-4xl font-semibold text-gray-900'}>Discovery Tribe</h1>
            <LocationInputField />
        </div>
    );
};

export default Test;
