import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosApi";

const api = new axiosApi()

export const getUserFeed = createAsyncThunk('userFeed/GET', async () => {
    try {
        return await api.get('/feed')
    } catch (error) {
        console.error(error)
        return error.message
    }
})