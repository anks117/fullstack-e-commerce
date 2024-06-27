import { CART_URL } from "../constants";
import { apiSlice } from "./apiSlice";

 const cartApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        fetchCartProducts:builder.query({
            query:(userid)=>({
                url:`${CART_URL}/${userid}`
            })
        }),
        addCartProduct:builder.mutation({
            query:({userid,productid})=>({
                url:`${CART_URL}`,
                method:"POST",
                body:({userid,productid}),
            }),
        }),
        deleteCartProduct:builder.mutation({
            query:(cpid)=>({
                url:`${CART_URL}/${cpid}`,
                method:"DELETE"
            })
        }),
        removeAllCartProducts:builder.mutation({
            query:()=>({
                url:`${CART_URL}`,
                method:"DELETE"
            })
        })
    })
})

export  const {useAddCartProductMutation,useDeleteCartProductMutation, useFetchCartProductsQuery, useRemoveAllCartProductsMutation}=cartApiSlice