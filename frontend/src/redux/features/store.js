import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../api/apiSlice";
import authReducer from '../features/auth/authSlice'
import favouriteReducer from '../features/favourite/favouriteSlice'
import cartReducer from '../features/cart/cartSlice'

const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        favourite:favouriteReducer,
        cart:cartReducer
    },

    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
});

setupListeners(store.dispatch);
export default store