import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    openModal: false,
}

const postModalSlice = createSlice({
    name: "postModal",
    initialState,
    reducers: {
        setPostModal: (state, action) => {
            state.openModal = action.payload
        }
    }
})

export const postModal = state => state.postModalState.openModal
export const {setPostModal} = postModalSlice.actions;
export default postModalSlice.reducer;