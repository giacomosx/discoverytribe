import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosApi";

const api = new axiosApi()

export const getUserInfo = createAsyncThunk('userFollowings/GET', async () => {
    try {
        return await api.get('/user/me')
    } catch (error) {
        console.error(error)
        return error.message
    }
})
