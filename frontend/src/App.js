import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Me from "./pages/Me";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import Trip from "./pages/Trip";
import Posts from "./pages/Posts";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/register'} element={<Registration />} />
                <Route path={'/login'} element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path={'/me'} element={<Me />} />
                    <Route path={'/posts'} element={<Posts />} />
                    <Route path={'/trip/create'} element={<Trip />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;