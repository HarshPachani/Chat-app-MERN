import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isAdmin: null,
    loader: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload;
            state.loader = false;
        },
        userNotExists: (state, action) => {
            state.user = null;
            state.loader = false;
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(adminLogin.fulfilled, (state, action) => {
    //             state.isAdmin = true;
    //             toast.success(action.payload);
    //         })
    // }
});

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;