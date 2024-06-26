import {createAsyncThunk} from "@reduxjs/toolkit";
import AxiosApi from "../../api/axiosApi";

export const getPosts = createAsyncThunk('currentUserPosts/GET', async (userId) => {
    const api = new AxiosApi()
    try {
        const response = await api.get(`/user/${userId}/posts`)
        return response.posts
    } catch (e) {
        console.log(e)
        return e
    }
})