import React from 'react';

const Main = ({children}) => {
    return (
        <div className="justify-center flex sm:ms-[256px] p-8 mt-[71px] mx-auto">
            {children}
        </div>
    );
};

export default Main;
