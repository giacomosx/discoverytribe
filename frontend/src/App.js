import React from 'react';
import SuggestionsInputField from "./components/suggestionsinputfield/SuggestionsInputField";

const App = () => {
    return (
        <div className="App flex flex-col items-center justify-center bg-white dark:bg-gray-800 w-full h-dvh">
            <h1 className={'text-3xl text-zinc-800 dark:text-white'}>DiscoveryTribe</h1>
            <SuggestionsInputField/>
        </div>
    )
}

export default App;