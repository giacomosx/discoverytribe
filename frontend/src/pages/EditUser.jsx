import React from 'react';
import Layout from "../layout/Layout";
import Spinner from "../components/spinner/Spinner";
import Alerts from "../components/alerts/Alerts";
import Button from "../components/button/Button";
import {useSelector} from "react-redux";
import {userErrorState, userLoadingState, userState} from "../redux/loginSlice";
import ChangeUserCover from "../components/changeusercover/ChangeUserCover";
import ChangeUserAvatar from "../components/changeuseravatar/ChangeUserAvatar";
import EditUserInfo from "../components/edituserinfo/EditUserInfo";
import Tabs from "../components/tabs/Tabs";

const EditUser = () => {
    const user = useSelector(userState)
    const loading = useSelector(userLoadingState)
    const error = useSelector(userErrorState)

    console.log(user)


    return (
        <Layout>
            <section
                className="container max-w-2xl h-fit space-y-8">
                {loading && <Spinner/>}
                {!loading && error && <Alerts type={'danger'}>Something went wrong!</Alerts>}
                {!loading && !error && (
                    <>
                        <h1 className={'text-2xl text-gray-800 dark:text-white font-semibold'}>@{user.username}'s
                            settings</h1>
                        <Tabs user={user}/>
                    </>
                )}
            </section>
        </Layout>
    )
        ;
};

export default EditUser;
