import React from 'react';

const Main = ({children}) => {
    return (
        <div className=" flex justify-center w-[calc(100vw - 256px)] min-h-[100vh-71px] sm:ms-[256px] p-8 mt-[71px] mx-auto">
            {children}
        </div>
    );
};

export default Main;
