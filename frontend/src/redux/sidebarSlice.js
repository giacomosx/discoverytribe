import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setSidebar: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const isSidebarOpen = state => state.sidebarState.isOpen
export const {setSidebar} = sidebarSlice.actions;
export default sidebarSlice.reducer;