import React from 'react';
import Header from "./header/Header";
import Navbar from "../components/navbar/Navbar";
import Footer from "./footer/Footer";

const LandingLayout = ({children}) => {
    return (
        <>
            <Header>
                <Navbar />
            </Header>
            <div
                className=" flex justify-center p-8 mt-[71px] mx-auto landing-body min-h-[calc(100vh-150px)]">
                {children}
            </div>
            <Footer variants={'flex justify-center gap-4 border-t border-gray-700 pt-4'} />
        </>
    );
};

export default LandingLayout;
