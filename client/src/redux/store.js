import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/auth.js';
import chatSlice from './reducers/chat.js';
import miscSlice from './reducers/misc.js';
import api from './api/api.js';

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [miscSlice.name]: miscSlice.reducer,
        [chatSlice.name]: chatSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
})

export default store;