import React from 'react';
import Layout from "../layout/Layout";
import UsersTabs from "../components/userstab/UsersTabs";

const Users = () => {
    return (
        <Layout>
            <section className={'space-y-12 max-w-2xl container'}>
                <UsersTabs />
            </section>
        </Layout>
);
};

export default Users;
