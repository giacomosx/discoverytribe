import React from 'react';
import Layout from "../layout/Layout";
import Spinner from "../components/spinner/Spinner";
import Alerts from "../components/alerts/Alerts";
import Button from "../components/button/Button";
import {useSelector} from "react-redux";
import {userErrorState, userLoadingState, userState} from "../redux/loginSlice";
import Tabs from "../components/tabs/Tabs";
import {useNavigate} from "react-router-dom";

const EditUser = () => {
    const user = useSelector(userState)
    const loading = useSelector(userLoadingState)
    const error = useSelector(userErrorState)
    const navigate = useNavigate();

    return (
        <Layout>
            <section
                className="container max-w-2xl h-fit space-y-8">
                {loading && <Spinner/>}
                {!loading && error && <Alerts type={'danger'}>Something went wrong!</Alerts>}
                {!loading && !error && (
                    <Tabs user={user}/>
                )}
                <div
                    className="flex justify-end items-center mt-8 border-t border-gray-300 pt-8 dark:border-gray-500">
                    <Button onClick={() => {
                        navigate(`/me`);
                    }}
                            variants={'rounded'}>Finish</Button>
                </div>
            </section>
        </Layout>
    )
        ;
};

export default EditUser;
