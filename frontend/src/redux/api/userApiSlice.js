import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/signin`,
                method:"POST",
                body:data
            })
        }),
        signup:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/signup`,
                method:'POST',
                body:data,
            }),
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USER_URL}/logout`,
                method:'POST'
            }),
        }),
        profile:builder.mutation({
            query:(data) => ({
              url: `${USER_URL}/profile`,
              method: 'PUT',
              body: data,
              
            }),
        }),
        getUsers:builder.query({
            query:()=>({
                url:`${USER_URL}/getallusers`,
                providesTags:['User'],
                keepUnusedDataFor:5,
            }),
        }),
        deleteUsers:builder.mutation({
            query:(userId)=>({
                url:`${USER_URL}/${userId}`,
                method:"DELETE",
            })
        }),
        getUserDetails:builder.query({
            query:(id)=>({
                url:`${USER_URL}/${id}`,
                keepUnusedDataFor:5,
            })
        }),
        getTotalUsers:builder.query({
            query:()=>({
                url:`${USER_URL}/total-users`
            })
        })
    })
})

export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useSignupMutation, 
    useProfileMutation, 
    useDeleteUsersMutation, 
    useGetUsersQuery, 
    useGetUserDetailsQuery,
    useGetTotalUsersQuery }=userApiSlice