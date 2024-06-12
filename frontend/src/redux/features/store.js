import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../api/apiSlice";
import authReducer from '../features/auth/authSlice'
import favouriteReducer from '../features/favourite/favouriteSlice'

const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        favourite:favouriteReducer,
    },

    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
});

setupListeners(store.dispatch);
export default store