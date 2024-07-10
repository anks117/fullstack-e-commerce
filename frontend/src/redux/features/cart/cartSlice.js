import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cartList:localStorage.getItem("cartList")?JSON.parse(localStorage.getItem("cartList")):[],

    shippingAddress:localStorage.getItem("shippingAddress")? JSON.parse(localStorage.getItem("shippingAddress")) :{},

    totalCartItems:localStorage.getItem('totalCartItems')?JSON.parse(localStorage.getItem('totalCartItems')) :0,

    totalCartPrice:localStorage.getItem('totalCartPrice')?JSON.parse(localStorage.getItem('totalCartPrice')) :0,

    shippingPrice:localStorage.getItem('shippingPrice')?JSON.parse(localStorage.getItem('shippingPrice')):0,

    taxPrice:localStorage.getItem('taxPrice')?JSON.parse(localStorage.getItem('taxPrice')):0,

    grandTotalPrice:localStorage.getItem('grandTotalPrice')?JSON.parse(localStorage.getItem('grandTotalPrice')):0,
}

export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        
        setCartProducts:(state,action)=>{
            state.cartList=action.payload,
            localStorage.setItem("cartList",JSON.stringify(action.payload))

            state.totalCartItems=state.cartList?.length || 0,
            localStorage.setItem("totalCartItems",JSON.stringify(state.totalCartItems))

            state.totalCartPrice=state.cartList?.reduce((acc,item)=>item.quantity*item.product.price+acc,0) || 0,
            localStorage.setItem("totalCartPrice",JSON.stringify(state.totalCartPrice))

            state.shippingPrice=state.totalCartPrice>2000?200:100 || 0,
            localStorage.setItem("shippingPrice",JSON.stringify(state.shippingPrice))

            state.taxPrice=(state.totalCartPrice*0.15).toFixed(2) || 0;
            localStorage.setItem("taxPrice",JSON.stringify(state.taxPrice))

            state.grandTotalPrice=Number(state.taxPrice)+Number(state.shippingPrice)+Number(state.totalCartPrice) || 0;
            localStorage.setItem("grandTotalPrice",JSON.stringify(state.grandTotalPrice))

           
        },

        setShippingAddress:(state,action)=>{
            state.shippingAddress=action.payload,
            localStorage.setItem("shippingAddress",JSON.stringify(action.payload))
        },

       
    }
})

export const {setCartProducts,setShippingAddress}=cartSlice.actions
export default cartSlice.reducer