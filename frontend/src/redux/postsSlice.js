import {createSlice} from "@reduxjs/toolkit";
import {getPosts} from "./actions/postsActions";

const initialState = {
    posts: [],
    error: null,
    loading: false,
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const userPostsState = state => state.postsState.posts
export const errorPostsState = state => state.postsState.error
export const loadingPostsState = state => state.postsState.loading
export default postsSlice.reducer;