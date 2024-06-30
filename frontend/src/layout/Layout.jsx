import React from 'react';
import Header from "./header/Header";
import Main from "./main/Main";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import RightSidebar from "./rightsidebar/RightSidebar";
import Modal from "../components/modal/Modal";

const Layout = ({children}) => {
    return (
        <>
            <Modal />
            <Header>
                <Navbar />
            </Header>
            <Sidebar />
            <Main>
                {children}
                <RightSidebar />
            </Main>
        </>
    );
};

export default Layout;
