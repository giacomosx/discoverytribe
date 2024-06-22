import React from 'react';
import Main from "./main/Main";

const LandingLayout = ({children}) => {
    return (
        <>
            <Main>

                {children}

            </Main>
        </>
    );
};

export default LandingLayout;
