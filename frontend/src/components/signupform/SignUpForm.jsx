import React, {useState} from 'react';
import Label from "../label/Label";
import TextInputField from "../textinputfield/TextInputField";
import {Link} from "react-router-dom";
import Button from "../button/Button";
import HeroClaim from "../heroclaim/HeroClaim";

const SignUpForm = () => {
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);

    const handleClick = () => {
        setStepOne(!stepOne);
        setStepTwo(!stepTwo);
    }
    return (
        <>
            <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <HeroClaim/>
                <div>
                    <div
                        className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800 transition-all">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Sign up now to DiscoveryTribe
                        </h2>
                        <form className="mt-8">
                            {stepOne && (
                                <div className={`space-y-6`}>
                                    <div>
                                        <Label htmlFor={'username'}>Username</Label>
                                        <TextInputField type={'text'} label="username" name="username"
                                                        placeholder={'Es. jhonsnow'} required/>
                                    </div>
                                    <div>
                                        <Label htmlFor={'email'}>Email</Label>
                                        <TextInputField type={'email'} label="email" name="email"
                                                        placeholder={'Es. jhon@snow.it'} required/>
                                    </div>
                                    <div>
                                        <Label htmlFor={'password'}>Password</Label>
                                        <TextInputField type={'password'} label="password" name="password"
                                                        placeholder={'Insert your password'} required/>
                                    </div>

                                    <Button type={'button'} variants={'rounded'} onClick={handleClick}>Next</Button>
                                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                                        Do you already have an account? <Link to={'/'}
                                                                              className="text-purple-700 hover:underline dark:text-purple-600">Login</Link>
                                    </div>
                                </div>
                            )}
                            {stepTwo && (
                                <div className="">

                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>


        </>
    );
};

export default SignUpForm;
