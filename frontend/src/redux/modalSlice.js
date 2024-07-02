import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    openModal: false,
    type: '',
    itemId: null
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModalOpen: (state, action) => {
            state.openModal = !state.openModal
        },
        setItemId: (state, action) => {
            state.itemId = action.payload
        },
        setItemType: (state, action) => {
            state.type = action.payload
        }
    }
})

export const isModalOpen = state => state.modalState.openModal
export const itemIdToDelete = state => state.modalState.itemId
export const typeItemToDelete = state => state.modalState.type
export const {setModalOpen, setItemId, setItemType} = modalSlice.actions;
export default modalSlice.reducer;