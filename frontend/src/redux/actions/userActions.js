import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosApi";

const api = new axiosApi()

export const getFollowings = createAsyncThunk('userFollowings/GET', async () => {
    try {
        const user =  await api.get('/user/me')
        return user.followings
    } catch (error) {
        console.error(error)
        return error.message
    }
})
