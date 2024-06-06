import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createProduct:builder.mutation({
            query:(data)=>({
                url: `${PRODUCT_URL}`,
                method:"POST",
                body:data,
            })
        }),
        updateProduct:builder.mutation({
            query:({productid,updatedProduct})=>({
                url:`${PRODUCT_URL}/${productid}`,
                method:"PUT",
                body:updatedProduct,
            }),
        }),
        deleteProduct:builder.mutation({
            query:(productid)=>({
                url:`${PRODUCT_URL}/${productid}`,
                method:"DELETE",
            }),
        }),
        fetchAllProducts:builder.query({
            query:()=>({
                url:`${PRODUCT_URL}/allproducts`
            })
        })
    })
})

export const {
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useFetchAllProductsQuery
}=productApiSlice