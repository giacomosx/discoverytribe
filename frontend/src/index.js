import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import sidebarReducer from './redux/sidebarSlice'
import loginReducer from './redux/loginSlice'
import feedReducer from './redux/userFeedSlice'
import modalReducer from './redux/modalSlice'
import postsReducer from './redux/postsSlice'
import tripsReducer from './redux/tripsSlice'

const rootReducer = combineReducers({
    sidebarState: sidebarReducer,
    loginState: loginReducer,
    feedState: feedReducer,
    modalState: modalReducer,
    postsState: postsReducer,
    tripsState: tripsReducer,

})

const store = configureStore({
    reducer: rootReducer,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>
);