import { createSlice } from "@reduxjs/toolkit";

const initialState={
    favouriteList:[],
    totalFavourites:0,
}

export const favouriteSlice=createSlice({
    name:'favourite',
    initialState,
    reducers:{
        addFavProduct:(state,action)=>{
            state.favouriteList.push(action.payload);
            state.totalFavourites=state.favouriteList.length;
        },
        removeFavProduct:(state,action)=>{
            state.favouriteList=state.favouriteList.filter(prod=>prod._id !==action.payload)
            state.totalFavourites=state.favouriteList.length
        },
        setFavList:(state,action)=>{
            state.favouriteList=action.payload;
            state.totalFavourites=state.favouriteList.length
        }

    }
})

export const {addFavProduct,removeFavProduct, setFavList}=favouriteSlice.actions;
export default favouriteSlice.reducer;