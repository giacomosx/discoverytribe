import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Registration from "./pages/Registration";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path={'/'} element={<Registration />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;