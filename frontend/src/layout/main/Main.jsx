import React from 'react';

const Main = ({children}) => {
    return (
        <div className="main flex flex-col items-center justify-center w-full min-h-screen md:container md:mx-auto">
            {children}
        </div>
    );
};

export default Main;
