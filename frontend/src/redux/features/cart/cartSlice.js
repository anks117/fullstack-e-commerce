import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cartList:[],
    totalCartItems:0,
    totalCartPrice:0
}

export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        
        setCartProducts:(state,action)=>{
            state.cartList=action.payload,
            state.totalCartItems=state.cartList.length,
            state.totalCartPrice=state.cartList.reduce((acc,item)=>item.quantity*item.product.price+acc,0)
        }
    }
})

export const {setCartProducts}=cartSlice.actions
export default cartSlice.reducer