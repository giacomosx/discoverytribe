import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Me from "./pages/Me";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import CreateTrip from "./pages/CreateTrip";
import Posts from "./pages/Posts";
import Trip from "./pages/Trip";
import Trips from "./pages/Trips";
import EditTrip from "./pages/EditTrip";
import Post from "./pages/Post";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/register'} element={<Registration />} />
                <Route path={'/login'} element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path={'/me'} element={<Me />} />
                    <Route path={'/posts'} element={<Posts />} />
                    <Route path={'/post/create'} element={<Post />} />
                    <Route path={'/trips'} element={<Trips />} />
                    <Route path={'/trips/:id'} element={<Trip />} />
                    <Route path={'/trip/create'} element={<CreateTrip />} />
                    <Route path={'/trips/:id/edit'} element={<EditTrip />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;