import React, {useEffect, useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../components/tripform/tripform.css'
import Button from "../components/button/Button";
import AxiosApi from "../api/axiosApi";
import Spinner from "../components/spinner/Spinner";
import Alerts from "../components/alerts/Alerts";
import Layout from "../layout/Layout";
import {useNavigate, useParams} from "react-router-dom";
import UploadCover from "../components/uploadcover/UploadCover";
import EditTripDetails from "../components/edittripdetails/EditTripDetails";
import EditTripLocation from "../components/edittriplocation/EditTripLocation";
import EditTripMilestones from "../components/edittripmilestones/EditTripMilestones";

const EditTrip = () => {
    const navigate = useNavigate()
    const api = new AxiosApi();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const params = useParams()
    const [mod, setMod] = useState({});


    const getTripToEdit = async () => {
        setLoading(true);
        try {
            const trip = await api.get('/trips/' + params.id);
            setMod(trip)
        }catch(error) {
            console.log(error);
            setError(true);
            setResponse('Something went wrong');
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getTripToEdit()
    }, [])

    return (
        <Layout>
            <section
                className="container max-w-2xl h-fit space-y-8">
                {loading && <Spinner/>}
                {!loading && error && <Alerts type={'danger'}>{response}</Alerts>}
                {!loading && !error && (
                    <>
                        <h1 className={'text-2xl text-gray-800 dark:text-white font-semibold'}>Edit {mod.name} trip</h1>

                        <UploadCover preview={mod.cover} tripId={params.id}/>
                        <EditTripDetails tripId={params.id} mod={mod}/>
                        <EditTripLocation tripId={params.id} mod={mod}/>
                        <EditTripMilestones tripId={params.id} mod={mod}/>
                        <div
                            className="flex justify-end items-center mt-8 border-t border-gray-300 pt-8 dark:border-gray-500">
                            <Button onClick={() => {
                                navigate(`/trips/${params.id}`);
                            }}
                                    variants={'rounded'}>Finish</Button>
                        </div>
                    </>
                )}
            </section>
        </Layout>
    )
        ;
};

export default EditTrip;
