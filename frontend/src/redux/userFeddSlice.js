import {createSlice} from "@reduxjs/toolkit";
import {getUserFeed} from "./actions/feedAction";


const initialState = {
    loading: false,
    error: null,
    feed: []
}

const feedSlice = createSlice({
    name: "feed",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUserFeed.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUserFeed.fulfilled, (state, action) => {
                state.loading = false;
                state.feed = action.payload;
            })
            .addCase(getUserFeed.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
    }
})

export const isLoadingFeed = state => state.feedState.loading
export const isErrorFeed = state => state.feedState.error
export const dataFeed = state => state.feedState.feed
export default feedSlice.reducer