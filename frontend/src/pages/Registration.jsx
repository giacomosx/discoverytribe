import React from 'react';
import SignUpForm from "../components/signupform/SignUpForm";
import SignUpHero from "../components/signuphero/SignUpHero";
import LandingLayout from "../layout/LandingLayout";

const Registration = () => {
    return (
        <LandingLayout>
            <section className="py-8 px-4 mx-auto max-w-screen-xl grid md:grid-cols-2 gap-8 lg:gap-16">
                <SignUpHero />
                <SignUpForm/>
            </section>
        </LandingLayout>
    );
};

export default Registration;
