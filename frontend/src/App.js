import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Registration from "./pages/Registration";
import Test from "./pages/Test";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path={'/'} element={<Registration />} />
                <Route path={'/test'} element={<Test />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;