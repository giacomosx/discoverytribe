import React, {useEffect, useState} from 'react';
import Layout from "../layout/Layout";
import {Link, useParams} from "react-router-dom";
import AxiosApi from "../api/axiosApi";
import {useSelector} from "react-redux";
import {userState} from "../redux/loginSlice";
import Alerts from "../components/alerts/Alerts";
import Spinner from "../components/spinner/Spinner";
import UserTabs from "../components/usertabs/UserTabs";

const Profile = () => {
    const params = useParams();
    const api = new AxiosApi();
    const user = useSelector(userState)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [data, setData] = useState({});
    const [follow, setFollow] = useState(null);

    const getUser = async () => {
        try {
            setLoading(true);
            const user = await api.get('/user/' + params.id);
            setData(user)

            console.log(user)
        } catch (error) {
            console.log(error);
            setError(true)
            setResponse('Something went wrong!')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser()
    }, [params]);


    return (
        <Layout profileLayout>
            <div className={'space-y-4 max-w-2xl container'}>
                <section
                    className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700  h-fit overflow-hidden">
                    {!loading && error && <Alerts type="danger">{response}</Alerts>}
                    {loading && <Spinner variants={'py-4'}/>}
                    {!loading && data && (
                        <div>
                            <div className={'cover w-full overflow-hidden'}>
                                <img src={data?.cover} className={'object-cover w-full h-56'}
                                     alt={data?.description}/>
                            </div>
                            <div className={'flex px-4 flex-wrap sm:flex-nowrap'}>
                                <div className="font-medium dark:text-white w-full mb-4 sm:mb-0 relative flex flex-col items-center sm:items-start">
                                    <img
                                        className="w-32 h-32  border-white dark:border-gray-800 rounded-full -translate-y-1/2 absolute"
                                        src={data?.avatar} alt=""/>

                                    <div className={'mt-16'}>
                                        <h2 className={'text-xl'}>@{data?.username}</h2>
                                        <span
                                            className={'text-base text-gray-500 dark:text-gray-400 mt-2'}>{data?.name}&nbsp;{data?.lastname}</span>
                                    </div>
                                    {data.location && (
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <svg className="w-4 h-4 me-1" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                 viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                                            </svg>
                                            <span
                                                className={'truncate max-w-60 md:max-w-xs me-4 font-normal text-gray-400 dark:text-gray-500 '}>{data.location?.location_name}</span>
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className="content p-4 flex items-start justify-between">
                                <p className={'text-sm text-gray-700 dark:text-gray-300 '}>{data?.description}</p>
                            </div>
                        </div>
                    )}
                </section>
                <UserTabs/>
            </div>

        </Layout>
    );
};

export default Profile;
