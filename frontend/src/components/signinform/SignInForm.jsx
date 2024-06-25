import React, {useEffect, useState} from 'react';
import Label from "../label/Label";
import TextInputField from "../textinputfield/TextInputField";
import Button from "../button/Button";
import Spinner from "../spinner/Spinner";
import Alerts from "../alerts/Alerts";
import AxiosApi from "../../api/axiosApi";
import { useNavigate} from "react-router-dom";
import {login} from "../../redux/loginSlice";
import {useDispatch} from "react-redux";

const SignInForm = () => {
    const api = new AxiosApi();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('primo')

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }
    const handleRetry = () => {
        setUser({})
        setError(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/auth/login', user)
            await setData(response)
            await setLoading(false);
            console.log(data)
            localStorage.setItem("token", response.token)
            localStorage.setItem('userInfo', JSON.stringify(response.userData))

            if (response.token) {
                dispatch(login())
                navigate('/me')
                console.log('token')
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true);
        }
    }

    return (
        <div>
            <div
                className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800 transition-all">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Sign in to DiscoveryTribe
                </h2>
                <form onSubmit={handleSubmit} className={'flex flex-col min-h-[228px] justify-center'}>
                    {loading && (

                        <Spinner/>
                    )}
                    {error && (
                        <Alerts type={'danger'}>
                            Invalid email or password
                            <p className={'underline cursor-pointer'} onClick={handleRetry}>Retry</p>
                        </Alerts>
                    )}
                    {!loading && !error && (
                        <div className={`space-y-6`}>
                            <div>
                                <Label htmlFor={'email'}>Email</Label>
                                <TextInputField type={'email'}
                                                label="email"
                                                name="email"
                                                onChange={handleChange}
                                                placeholder={'Es. jhon@snow.it'} required/>
                            </div>
                            <div>
                                <Label htmlFor={'password'}>Password</Label>
                                <TextInputField type={'password'}
                                                label="password"
                                                name="password"
                                                onChange={handleChange}
                                                placeholder={'Insert your password'} required/>
                            </div>
                            <Button type={'submit'}
                                    variants={'rounded'}>Log in</Button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SignInForm;
