import { createSlice } from "@reduxjs/toolkit";
import {getFollowings} from "./actions/userActions";

const initialState = {
    isLoggedIn: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("userData")) || null,
    followings: null,
    error: false
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = localStorage.getItem("token");
            state.user = JSON.parse(localStorage.getItem("userData")) || null
        },
        logout: (state) => {
            state.isLoggedIn = null
            state.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('userData')
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getFollowings.fulfilled, (state, action) => {
                state.followings = action.payload
            })
            .addCase(getFollowings.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const logState = state => state.loginState.isLoggedIn;
export const userState = state => state.loginState.user;
export const followingState = state => state.loginState.followings
export const errorState = state => state.loginState.error;
export const {login, logout} = loginSlice.actions;
export default loginSlice.reducer;