import React, {useEffect, useState} from 'react';
import AxiosApi from "../../api/axiosApi";
import ListSkeleton from "../listskeleton/ListSkeleton";
import Alerts from "../alerts/Alerts";

const StatisticsCard = ({userId}) => {
    const api = new AxiosApi()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [data, setData] = useState(null);

    console.log(userId)

    const getUserStatistics = async () => {
        try {
            setLoading(true)
            const statistics = await api.get('/user/stats/' + userId )
            if (statistics) {
                setData(statistics)
                console.log(statistics)
            }
        } catch (e) {
            console.error(e);
            setError(true)
            setResponse('Something went wrong!')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserStatistics();
    }, [userId])

    return (
            <div className="p-4 rounded-lg ">
                {loading && <ListSkeleton />}
                {!loading && !error && data && (
                    <dl className="grid grid-cols-2 gap-8 p-4 mx-auto text-gray-800 dark:text-white ">
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">{data.user?.trips.length}</dt>
                            <dd className="text-gray-500 dark:text-gray-400">Trips created</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">{data.milestones}</dt>
                            <dd className="text-gray-500 dark:text-gray-400">Places spotted</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">{data.user?.liked_trips.length}</dt>
                            <dd className="text-gray-500 dark:text-gray-400">Trips saved</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl font-extrabold">{data.user?.followers.length}</dt>
                            <dd className="text-gray-500 dark:text-gray-400">Followers</dd>
                        </div>
                    </dl>
                )}
                {error && <Alerts type="danger">{response}</Alerts>}
            </div>
    );
};

export default StatisticsCard;
