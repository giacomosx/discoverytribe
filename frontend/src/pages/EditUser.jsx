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

                        <ChangeUserCover preview={user.cover}/>
                        <div className={'y items-center justify-center flex flex-wrap p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 md:gap-16 gap-8'}>
                            <ChangeUserAvatar data={user.avatar}/>
                            <EditUserInfo user={user} />
                        </div>

                    </>
                )}
            </section>
        </Layout>
    )
        ;
};

export default EditUser;
