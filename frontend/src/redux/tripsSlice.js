import {createSlice} from "@reduxjs/toolkit";
import {getTrips, getFilteredTrips} from "./actions/tripsActions";

const initialState = {
    trips: [],
    error: null,
    loading: false,
    searchResults: [],
}

const tripsSlice = createSlice({
    name: "trips",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getTrips.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTrips.fulfilled, (state, action) => {
                state.loading = false;
                state.trips = action.payload;
            })
            .addCase(getTrips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getFilteredTrips.pending, (state, action) => {
                    state.loading = true;
                })
            .addCase(getFilteredTrips.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(getFilteredTrips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})

export const userTripsState = state => state.tripsState.trips
export const errorTripsState = state => state.tripsState.error
export const loadingTripsState = state => state.tripsState.loading
export const searchResultsState = state => state.tripsState.searchResults
export default tripsSlice.reducer;