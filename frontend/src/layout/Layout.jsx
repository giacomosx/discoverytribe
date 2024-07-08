import React from 'react';
import Header from "./header/Header";
import Main from "./main/Main";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import RightSidebar from "./rightsidebar/RightSidebar";
import Modal from "../components/modal/Modal";
import PersonalComps from "./personalcomps/PersonalComps";
import ProfileComps from "./profilecomps/ProfileComps";
import {useLocation} from "react-router-dom";


const Layout = ({children, profileLayout, user, username}) => {
const location = useLocation();

    return (
        <>
            <Modal />
            <Header>
                <Navbar />
            </Header>
            <Sidebar />
            <Main>
                {children}
                {location.pathname !== "/posts/liked" && location.pathname !== "/trips/saved" && (
                    <RightSidebar>
                        {profileLayout ? (
                            <ProfileComps userId={user} username={username} />
                        ) : (
                            <PersonalComps />
                        )}

                    </RightSidebar>
                )}
            </Main>
        </>
    );
};

export default Layout;
