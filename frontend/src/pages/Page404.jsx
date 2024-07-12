import React from 'react';
import LandingLayout from "../layout/LandingLayout";
import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <LandingLayout>
            <div className="container flex justify-center text-center w-full h-full">
                <p className={'text-gray-500 dark:text-gray-300 mt-8 text-base'}>
                    <span className={'text-9xl block'}>404</span>
                    Ops...page not found! <Link to={'/me'} className={'block text-purple-700 hover:underline dark:text-purple-600'}>Do you wanna come back home?</Link></p>

            </div>
        </LandingLayout>
    );
};

export default Page404;
