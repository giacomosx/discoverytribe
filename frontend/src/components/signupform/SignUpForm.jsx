import React, {useState} from 'react';
import Label from "../label/Label";
import TextInputField from "../textinputfield/TextInputField";
import {Link} from "react-router-dom";
import Button from "../button/Button";
import HeroClaim from "../heroclaim/HeroClaim";
import UploadAvatar from "../uploadavatar/UploadAvatar";
import Stepper from "../stepper/Stepper";
import AxiosApi from "../../api/axiosApi";

const SignUpForm = () => {
    const api = new AxiosApi();
    const [activeTab, setActiveTab] = useState(0);
    const [user, setUser] = useState({});
    const [preview, setPreview] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const resetPreview = () => {
        setAvatar(null);
        setPreview(null);
    }
    const prevBtn = () => {
        setActiveTab(activeTab - 1)
    }
    const nextBtn = () => {
        setActiveTab(activeTab + 1)
    }
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setPreview(e.target.result);
                setAvatar(file);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
            setAvatar(null);
        }
    }

    return (
        <>
            <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <HeroClaim/>
                <div>
                    <div
                        className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800 transition-all">

                        {activeTab === 0 && (
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Sign up now to DiscoveryTribe
                            </h2>
                        )}

                        {activeTab === 1 && (
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Choose an Avatar
                            </h2>
                        )}

                        {activeTab === 2 && (
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Verify and join with us!
                            </h2>
                        )}

                        <Stepper tabIndex={activeTab}/>
                        <form>
                            {activeTab === 0 && (
                                <div className={`space-y-6`}>
                                    <div>
                                        <Label htmlFor={'username'}>Username</Label>
                                        <TextInputField type={'text'} label="username" name="username"
                                                        onChange={handleChange}
                                                        placeholder={'Es. jhonsnow'} required/>
                                    </div>
                                    <div>
                                        <Label htmlFor={'email'}>Email</Label>
                                        <TextInputField type={'email'} label="email" name="email"
                                                        onChange={handleChange}
                                                        placeholder={'Es. jhon@snow.it'} required/>
                                    </div>
                                    <div>
                                        <Label htmlFor={'password'}>Password</Label>
                                        <TextInputField type={'password'} label="password" name="password"
                                                        onChange={handleChange}
                                                        placeholder={'Insert your password'} required/>
                                    </div>

                                    <Button type={'button'} variants={'rounded'} onClick={nextBtn}>Next</Button>
                                </div>
                            )}
                            {activeTab === 1 && (
                                <div className="space-y-6">
                                    <UploadAvatar onChange={handleFile} preview={preview} onClick={resetPreview}/>
                                    <div className="flex w-full justify-between">
                                        <Button type={'button'} variants={'rounded'} onClick={prevBtn}
                                                styleType={'outline'}>Back</Button>
                                        <Button type={'button'} variants={'rounded'} onClick={nextBtn}>Next</Button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 2 && (
                                <div className="flex flex-col items-center">
                                    <img className="w-48 h-48 mb-3 rounded-full shadow-lg object-cover"
                                         src={preview} alt="Avatar preview"/>
                                    <h5 className="mb-1 text-xl font-medium text-gray-800 dark:text-white">{user.username}</h5>
                                    <span
                                        className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
                                    <div className="flex mt-4 md:mt-6 space-x-6">
                                        <Button type={'button'} variants={'rounded'} onClick={prevBtn}
                                                styleType={'outline'}>Back</Button>
                                        <Button type={'submit'} variants={'rounded'}>Join Now</Button>
                                    </div>
                                </div>
                            )}
                        </form>
                        {activeTab < 2 && (
                            <div className="text-sm font-medium text-gray-800 dark:text-white">
                                Do you already have an account? <Link to={'/'}
                                                                      className="text-purple-700 hover:underline dark:text-purple-600">Login</Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>


        </>
    );
};

export default SignUpForm;
