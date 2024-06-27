
import { ORDER_URL } from '../constants'
import {apiSlice} from './apiSlice'

 const orderApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createOrder:builder.mutation({
            query:({orderItems,shippingAddress,totalPrice,grandTotalPrice,taxPrice,shippingPrice})=>({
                url:`${ORDER_URL}`,
                method:"POST",
                body:({orderItems,shippingAddress,totalPrice,grandTotalPrice,taxPrice,shippingPrice})
            }),
        }),
        getMyOrder:builder.query({
            query:()=>({
                url:`${ORDER_URL}/mine`,
            })
        }),
        getAllOrders:builder.query({
            query:()=>({
                url:`${ORDER_URL}/allorders`
            })
        }),
        getTotalSales:builder.query({
            query:()=>({
                url:`${ORDER_URL}/totalsales`
            })
        }),
        getTotalOrders:builder.query({
            query:()=>({
                url:`${ORDER_URL}/totalOrders`
            })
        }),
        getTotalSalesByDate:builder.query({
            query:()=>({
                url:`${ORDER_URL}/total-sales-by-date`
            })
        }),
        getOrderDetails:builder.query({
            query:(orderId)=>({
                url:`${ORDER_URL}/${orderId}`
            })
        }),
        orderPay:builder.mutation({
            query:(orderId)=>({
                url:`${ORDER_URL}/${orderId}/pay`,
                method:"PUT"
            })
        }),
        orderDeliver:builder.mutation({
            query:(orderId)=>({
                url:`${ORDER_URL}/${orderId}/deliver`,
                method:"PUT"
            })
        })
    })
 })

 export const {useCreateOrderMutation, useGetAllOrdersQuery, useGetMyOrderQuery, useGetOrderDetailsQuery, useGetTotalOrdersQuery, useGetTotalSalesByDateQuery, useGetTotalSalesQuery, useOrderDeliverMutation, useOrderPayMutation}=orderApiSlice