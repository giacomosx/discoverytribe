import { createSlice } from "@reduxjs/toolkit";
import {getUserInfo} from "./actions/userActions";

const initialState = {
    isLoggedIn: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
    loading: false,
    error: false
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = localStorage.getItem("token");
            state.user = JSON.parse(localStorage.getItem("userInfo")) || null
        },
        logout: (state) => {
            state.isLoggedIn = null
            state.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUserInfo.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
                localStorage.setItem('userInfo', JSON.stringify(action.payload))
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const logState = state => state.loginState.isLoggedIn;
export const userState = state => state.loginState.user;
export const userLoadingState = state => state.loginState.loading;
export const userErrorState = state => state.loginState.error;
export const {login, logout} = loginSlice.actions;
export default loginSlice.reducer;