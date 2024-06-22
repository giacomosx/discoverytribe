import React from 'react';
import LandingLayout from "../layout/LandingLayout";
import SignInForm from "../components/signinform/SignInForm";
import SignInHero from "../components/signuinhero/SignInHero";

const Login = () => {
    return (
        <LandingLayout>
            <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <SignInHero />
                <SignInForm />
            </section>
        </LandingLayout>
    );
};

export default Login;
