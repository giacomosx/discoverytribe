import React, {useState} from 'react';
import Label from "../label/Label";
import TextInputField from "../textinputfield/TextInputField";
import {Link} from "react-router-dom";
import Button from "../button/Button";
import UploadAvatar from "../uploadavatar/UploadAvatar";
import Stepper from "../stepper/Stepper";
import AxiosApi from "../../api/axiosApi";
import Spinner from "../spinner/Spinner";
import Alerts from "../alerts/Alerts";
import ProfileCard from "../profilecard/ProfileCard";

const SignUpForm = () => {
    const api = new AxiosApi();
    const [activeTab, setActiveTab] = useState(0);
    const [user, setUser] = useState({});
    const [preview, setPreview] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState(false);
    const [response, setResponse] = useState([]);
    const [fileSize, setFileSize] = useState(0);
    const maxSize = 2266274;

    const handleRetry = () => {
        setActiveTab(0)
        setErrors(false)
        setResponse([])
        setLoading(false)
        setDisabled(true)
        setFileSize(0)
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

        if (user.password) {
            if (user.password.length >= 6 && user.email && user.username) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        }
    }
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setPreview(e.target.result);
                setAvatar(file);
                setFileSize(file.size)
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
                setSuccess(true)
                setLoading(false)
            }

        } catch (e) {
            console.log(e)
            setErrors(true)
            setLoading(false)
            if (e.error) {
                setResponse([...response, e.error])
            }
            if (e.errors) {
                setResponse(e.errors)
            }
        }
    }

    return (
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
                        <form onSubmit={handleSubmit} >
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
                                        <p className={'text-xs text-gray-500 dark:text-gray-300 ps-1'}>Min. 6 characters</p>
                                    </div>

                                    <Button type={'button'} variants={'rounded'} onClick={nextBtn}
                                            disabled={disabled}>Next</Button>
                                </div>
                            )}
                            {activeTab === 1 && (
                                <div className="space-y-6 min-h-[322px] flex flex-col items-center justify-between">
                                    <UploadAvatar onChange={handleFile} preview={preview} onClick={resetPreview}/>
                                    {fileSize > maxSize && (
                                        <p className={'text-red-500 dark:text-red-800 text-sm -mt-2'}>Too big image!</p>
                                    )}
                                    <div className="flex w-full justify-between">
                                        <Button type={'button'} variants={'rounded'} onClick={prevBtn}
                                                styleType={'outline'}>Back</Button>
                                        {preview && (fileSize < maxSize) && (
                                            <Button type={'button'} variants={'rounded'} onClick={nextBtn}>Next</Button>
                                        )}
                                    </div>
                                </div>
                            )}
                            {loading && (
                                <div className={'min-h-[322px] flex flex-col justify-center'}>
                                    <Spinner/>
                                </div>
                            )}
                            {activeTab === 2 && !loading && !errors && (
                                <div className="flex flex-col items-center min-h-[322px] justify-between">
                                    <ProfileCard src={preview} username={user.username} email={user.email} />
                                    <div className="flex mt-4 md:mt-6 space-x-6">
                                        {success ? (
                                            <Alerts type={'success'}>
                                                Cool news {user.username}.
                                                Registration successfully complete. <br/>
                                                Check your email and <Link to={'/login'}
                                                                           className=" font-semibold underline ">login</Link>.
                                            </Alerts>
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
                            {activeTab === 2 && !loading && errors && (
                                <div className={'min-h-[322px] flex flex-col justify-center items-center'}>
                                    <Alerts type={'danger'}>
                                        {response && response.map((item, index) => (<span key={index}>{item.msg || item}</span>))}
                                        <p className={'underline cursor-pointer'} onClick={handleRetry}>Retry</p>
                                    </Alerts>

                                </div>
                            )}
                        </form>

                        {!success && !errors && (<div className="text-sm font-medium text-gray-800 dark:text-white">
                            Do you already have an account? <Link to={'/login'}
                                                                  className="text-purple-700 hover:underline dark:text-purple-600">Login</Link>
                        </div>)}

                    </div>
                </div>
    );
};

export default SignUpForm;
