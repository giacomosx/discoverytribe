import React from 'react';

const LandingLayout = ({children}) => {
    return (
        <div
            className=" flex justify-center w-[calc(100vw - 256px)] min-h-[100vh-71px] p-8 mt-[71px] mx-auto">
            {children}
        </div>
    );
};

export default LandingLayout;
