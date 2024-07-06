import React, {useEffect, useState} from 'react';
import Layout from "../layout/Layout";
import {Link, useParams} from "react-router-dom";
import AxiosApi from "../api/axiosApi";
import Alerts from "../components/alerts/Alerts";
import Spinner from "../components/spinner/Spinner";
import Timeline from "../components/timeline/Timeline";
import {useSelector} from "react-redux";
import {userState} from "../redux/loginSlice";
import TripTypeBadge from "../components/triptypebadge/TripTypeBadge";
import TripBudgetBadge from "../components/tripbudgetbadge/TripBudgetBadge";

const Trip = () => {
        const params = useParams();
        const api = new AxiosApi();
        const user = useSelector(userState)
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [data, setData] = useState({});
        const [alreadyLike, setAlreadyLike] = useState(null);
        const [response, setResponse] = useState(null);
        const startDate = new Date(data.start_date).toDateString();
        const endDate = new Date(data.start_date).toDateString()
        const [likeCount, setLikeCount] = useState(0);
        //const [alreadyLikes, setAlreadyLikes] = useState(false);

        const getTrip = async () => {
            setLoading(true);
            try {
                const trip = await api.get('/trips/' + params.id);
                setData(trip)
                setLikeCount(trip.likes.length)
                if (user.liked_trips.includes(trip._id)) {
                    setAlreadyLike(true)
                }

                console.log(trip.likes.length)
            } catch (error) {
                console.log(error);
                setError(true)
                setResponse('Something went wrong!')
            } finally {
                setLoading(false);
            }


        }

        useEffect(() => {
            getTrip()
        }, [params])

        console.log(data)
        const handleLike = async () => {
            setLikeCount(likeCount + 1)
            setAlreadyLike(true)
            try {

                const response = await api.patch(`/trips/${params.id}/like`)
            } catch (error) {
                console.error(error)
                setLikeCount(likeCount - 1)
                setAlreadyLike(false)
            }

        }
        const handleUnLike = async () => {
            setAlreadyLike(false)
            setLikeCount(likeCount - 1)
            try {
                const response = await api.patch(`/trips/${params.id}/unlike`)

            } catch (error) {
                console.error(error)
                setLikeCount(likeCount + 1)
                setAlreadyLike(true)
            }

        }
        return (
            <Layout>
                <div className={'space-y-12 max-w-2xl container'}>
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
                                <div className={'flex px-4 pt-4 flex-wrap sm:flex-nowrap'}>
                                    <div className="font-medium dark:text-white w-full mb-4 sm:mb-0">
                                        <h2 className={'-mt-2 text-2xl'}>{data?.name}</h2>
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
                                                className={'truncate max-w-xs me-4'}>{data.destination?.destination_name}</span>
                                        </div>
                                        <div
                                            className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            <Link to={`/user/${data.userId?._id}`}>
                                                <img
                                                    className="w-8 h-8 border-2 border-white dark:border-gray-800 rounded-full"
                                                    src={data.userId?.avatar} alt=""/>
                                            </Link>
                                            <Link to={`/user/${data.userId?._id}`} className={'hover:underline'}>{data.userId?.username}</Link>
                                        </div>

                                    </div>
                                    <ul className="text-xs text-gray-500 dark:text-gray-400 ps-1 w-full space-y-2.5">
                                        <li className="flex items-center">
                                            <svg className="w-3 h-3 me-2" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                            </svg>
                                            From {startDate} to {endDate}
                                        </li>
                                        {data?.type && (
                                            <li className="flex items-center">
                                                <TripTypeBadge>{data?.type}</TripTypeBadge>
                                            </li>
                                        )}
                                        <li className="flex items-center">
                                            <TripBudgetBadge>{data?.budget}</TripBudgetBadge>
                                        </li>

                                    </ul>

                                </div>
                                <div className="content p-4 flex items-start justify-between">
                                    <p className={'text-sm text-gray-700 dark:text-gray-300 '}>{data?.description}</p>
                                    <div>
                                        {alreadyLike ? (
                                            <button
                                                onClick={handleUnLike}
                                                className={'ms-2 float-end flex items-center justify-center text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all'}>
                                                <span className="text-xs ">{likeCount} Saved</span>
                                                <svg
                                                    className="w-6 h-6 text-xs font-normal text-yellow-400 hover:text-yellow-800 dark:hover:text-white transition-all"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"/>
                                                </svg>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleLike}
                                                className={'ms-2 float-end flex items-center justify-center text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all'}>
                                                <span className="text-xs invisible sm:visible">{likeCount} Saved</span>
                                                <svg
                                                    className="w-6 h-6 text-xs font-normal "
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    fill="none"
                                                    viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/>
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                    {data.milestones && (
                        <section className={'px-4'}>
                            <Timeline milestones={data.milestones}/>
                        </section>
                    )}
                </div>
            </Layout>
        );
    }
;

export default Trip;
