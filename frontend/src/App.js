import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Registration from "./pages/Registration";
import Test from "./pages/Test";
import Login from "./pages/Login";
import Me from "./pages/Me";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/register'} element={<Registration />} />
                <Route path={'/login'} element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path={'/me'} element={<Me />} />
                    <Route path={'/test'} element={<Test />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;