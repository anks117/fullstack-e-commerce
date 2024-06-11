import { FAVOURITE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const favouriteApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        fetchFav:builder.query({
            query:(userId)=>({
                url:`${FAVOURITE_URL}/${userId}`
            })
        }),
        addFav:builder.mutation({
            query:({userId,productId})=>({
                url:`${FAVOURITE_URL}`,
                method:"POST",
                body:({userId,productId}),
            })
        }),
        deleteFav:builder.mutation({
            query:({userId,productId})=>({
                url:`${FAVOURITE_URL}`,
                method:"DELETE",
                body:({userId,productId})
            })
        })
    })
})

export const {useAddFavMutation,useDeleteFavMutation,useFetchFavQuery}= favouriteApiSlice