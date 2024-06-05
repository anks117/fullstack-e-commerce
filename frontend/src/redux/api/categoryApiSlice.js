import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createCategory:builder.mutation({
            query:(data)=>({
                url:`${CATEGORY_URL}`,
                method:"POST",
                body:data
            }),
            invalidatesTags: ['Category'],
        }),
        
        updateCategory: builder.mutation({
            query:({categoryId,updatedCategory})=>({
                url:`${CATEGORY_URL}/${categoryId}`,
                method:'PUT',
                body:updatedCategory,
            }),
            invalidatesTags: ['Category'],
        }),

        deleteCategory:builder.mutation({
            query:(categoryId)=>({
                url:`${CATEGORY_URL}/${categoryId}`,
                method:"DELETE"
            }),
            invalidatesTags: ['Category'],
        }),

        getAllCategory:builder.query({
            query:()=>({
                url:`${CATEGORY_URL}`,
                
            }),
            invalidatesTags: ['Category'],
        }),
    })
})

export const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAllCategoryQuery,
    useUpdateCategoryMutation
}=categoryApiSlice