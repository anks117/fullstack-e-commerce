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
        }),
        fetchNewProduct:builder.query({
            query:()=>({
                url:`${PRODUCT_URL}/new`
            })
        }),
        fetchTopProduct:builder.query({
            query:()=>({
                url:`${PRODUCT_URL}/top`
            })
        }),
        fetchSingleProduct:builder.query({
            query:(productid)=>({
                url:`${PRODUCT_URL}/${productid}`
            })
        })
    })
})

export const {
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useFetchAllProductsQuery,
    useFetchNewProductQuery,
    useFetchTopProductQuery,
    useFetchSingleProductQuery
}=productApiSlice