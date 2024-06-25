import React, {useEffect} from 'react';
import Layout from "../layout/Layout";
import Feed from "../components/feed/Feed";
import {useDispatch} from "react-redux";
import {getUserInfo} from "../redux/actions/userActions";

const Me = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])
    return (
        <Layout>
            <Feed/>
        </Layout>
    );
};

export default Me;
