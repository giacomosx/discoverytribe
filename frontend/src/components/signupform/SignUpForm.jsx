import React, {useState} from 'react';
import Label from "../label/Label";
import TextInputField from "../textinputfield/TextInputField";
import {Link} from "react-router-dom";
import Button from "../button/Button";
import HeroClaim from "../heroclaim/HeroClaim";
import UploadAvatar from "../uploadavatar/UploadAvatar";
import Stepper from "../stepper/Stepper";
import AxiosApi from "../../api/axiosApi";
import Spinner from "../spinner/Spinner";

const SignUpForm = () => {
    const api = new AxiosApi();
    const [activeTab, setActiveTab] = useState(0);
    const [user, setUser] = useState({});
    const [preview, setPreview] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const handleRetry = () => {
        setActiveTab(0)
        setError(null)
        setResponse(null)
        setLoading(false)
        resetPreview()
    }
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
            [e.target.name]: e.target.value.trim(),
        })

        if (user.name || user.email || user.password) {
            setDisabled(false)
        }
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("avatar", avatar);
            formData.append("username", user.username);
            formData.append("email", user.email);
            formData.append("password", user.password);

            const createUser = await api.post('/auth/register', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            if (createUser) {
                setLoading(false)
                setSuccess(true)
            }

        } catch (e) {
            console.log(e)
            setLoading(false)
            setError(true)
            if (e.response.data.error) {
                setResponse(e.response.data.error.message)
            }
            if (e.response.data.errors) {
                setError(true)
                setResponse(e.response.statusText)
            }
            ;
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
                                Sign up to DiscoveryTribe
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
                        <form onSubmit={handleSubmit}>
                            {activeTab === 0 && (
                                <div className={`space-y-6 min-h-[322px]`}>
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

                                    <Button type={'button'} variants={'rounded'} onClick={nextBtn}
                                            disabled={disabled}>Next</Button>
                                </div>
                            )}
                            {activeTab === 1 && (
                                <div className="space-y-6 min-h-[322px] flex flex-col items-center justify-between">
                                    <UploadAvatar onChange={handleFile} preview={preview} onClick={resetPreview}/>
                                    <div className="flex w-full justify-between">
                                        <Button type={'button'} variants={'rounded'} onClick={prevBtn}
                                                styleType={'outline'}>Back</Button>
                                        {preview && (
                                            <Button type={'button'} variants={'rounded'} onClick={nextBtn}>Next</Button>
                                        )}
                                    </div>
                                </div>
                            )}
                            {loading && (
                                <div className={'min-h-[322px] flex flex-col items-center'}>
                                    <Spinner/>
                                </div>
                            )}
                            {activeTab === 2 && !loading && !error && (
                                <div className="flex flex-col items-center min-h-[322px] justify-between">
                                    <img className="w-48 h-48 rounded-full shadow-lg object-cover"
                                         src={preview} alt="Avatar preview"/>
                                    <h5 className="mb-1 text-xl font-medium text-gray-800 dark:text-white">{user.username}</h5>
                                    <span
                                        className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
                                    <div className="flex mt-4 md:mt-6 space-x-6">
                                        {success ? (
                                            <p className={'text-gray-800 dark:text-gray-400'}>Cool news {user.username}.
                                                Registration successfully complete. <br/>
                                                Check your email and <Link to={'/login'}
                                                                           className="text-purple-700 hover:underline dark:text-purple-600">login</Link>.
                                            </p>
                                        ) : (
                                            <>
                                                <Button type={'button'} variants={'rounded'} onClick={prevBtn}
                                                        styleType={'outline'}>Back</Button>
                                                <Button type={'submit'} variants={'rounded'}>Join Now</Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                            {activeTab === 2 && !loading && error && (
                                <div className={'min-h-[322px] flex flex-col justify-center items-center'}>
                                    <p className={'text-gray-800 dark:text-gray-400'}>{response}</p>
                                    <p className={'underline cursor-pointer'} onClick={handleRetry}>Retry</p>
                                </div>
                            )}
                        </form>

                        {!success && !error (<div className="text-sm font-medium text-gray-800 dark:text-white">
                            Do you already have an account? <Link to={'/'}
                                                                  className="text-purple-700 hover:underline dark:text-purple-600">Login</Link>
                        </div>)}

                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUpForm;
