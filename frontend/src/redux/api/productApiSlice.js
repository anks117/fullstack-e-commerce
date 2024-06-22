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
        addProductReview: builder.mutation({
            query: ({ productid, review }) => ({
              url: `${PRODUCT_URL}/${productid}/review`,
              method: "POST",
              body:review,
            }),
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
        }),
        fetchRelatedProducts:builder.query({
            query:(categoryId)=>({
                url:`${PRODUCT_URL}/?categoryId=${categoryId}`
            })
        }),
        fetchFilterdProducts:builder.mutation({
            query:({checked,checkedBrands,radio})=>({
                url:`${PRODUCT_URL}/filterproducts`,
                method:"POST",
                body:({checked,checkedBrands,radio}),
            })
        }),
        fetchInitialData:builder.query({
            query:()=>({
                url:`${PRODUCT_URL}/initialdata`
            }),
        }),

        fetchBrandbyCategory:builder.mutation({
            query:(checked)=>({
                url:`${PRODUCT_URL}/getbrands`,
                method:"POST",
                body:checked,
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
    useFetchSingleProductQuery,
    useFetchRelatedProductsQuery,
    useAddProductReviewMutation,
    useFetchFilterdProductsMutation,
    useFetchInitialDataQuery,
    useFetchBrandbyCategoryMutation
}=productApiSlice