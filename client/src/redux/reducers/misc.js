import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSearch: false,
    isNotification: false,
    isNewGroup: false,
    isAddMember: false,
    isProfile: false,
}

const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        setIsSearch: (state, action) => {
            state.isSearch = action.payload;
        },
        setIsNotification: (state, action) => {
            state.isNotification = action.payload;
        },
        setIsNewGroup: (state, action) => {
            state.isNewGroup = action.payload;
        },
        setIsAddMember: (state, action) => {
            state.isAddMember = action.payload;
        },
        setIsProfile: (state, action) => {
            state.isProfile = action.payload;
        }
    }
});

export default miscSlice;
export const { 
    setIsSearch,
    setIsNotification,
    setIsNewGroup,
    setIsAddMember,
    setIsProfile,
} = miscSlice.actions;