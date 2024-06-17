import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSearch: false,
    isNotification: false,
    isNewGroup: false,
    isAddMember: false,
    isProfile: false,
    isFileMenu: false,
    uploadingLoader: false,
    isDeleteMenu: false,
    selectedDeleteChat: {
        chatId: '',
        groupChat: false,
    }
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
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload;
        },
        setUploadingLoader: (state, action) => {
            state.uploadingLoader = action.payload;
        },
        setIsDeleteMenu: (state, action) => {
            state.isDeleteMenu = action.payload;
        },
        setSelectedDeleteChat: (state, action) => {
            state.selectedDeleteChat = action.payload;
        },
    }
});

export default miscSlice;
export const { 
    setIsSearch,
    setIsNotification,
    setIsNewGroup,
    setIsAddMember,
    setIsProfile,
    setIsFileMenu,
    setUploadingLoader,
    setIsDeleteMenu,
    setSelectedDeleteChat,
} = miscSlice.actions;