import { useGetAllOrdersQuery, useOrderDeliverMutation } from "../../redux/api/orderApiSlice"
import { ToastContainer, toast } from 'react-toastify'

const OrderPage = () => {

    const {data:allOrders, refetch:refetchAllOrders}=useGetAllOrdersQuery();

    const [deliveryApiCall]=useOrderDeliverMutation()

    const handleDelivery=async(orderId)=>{
        try {
            await deliveryApiCall(orderId).unwrap();
            toast.success('Order Delivered');
            refetchAllOrders();

        } catch (error) {
           toast.error('unable to deliver'); 
        }
    }

    
  return (
    <section className=" py-8 antialiased md:py-16">
        <ToastContainer />
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-pink-600 sm:text-2xl">All orders</h2>
            </div>

            <div className="mt-6 flow-root sm:mt-8">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {allOrders?.map((order)=>{
                        return (
                            <div key={order._id} className="flex flex-wrap items-center gap-y-4 py-6">

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                    <span className="hover:underline">#{order._id.slice(-6)}</span>
                                </dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{order.createdAt.slice(0,10)}</dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">&#8377;{order.totalPrice}</dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>

                                {order.isDeliverd? 

                                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-300 ">
                                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor"  d="M5 11.917 9.724 16.5 19 7.5" />
                                    </svg>
                                    Delivered
                                    </dd>
                                :
                                    <dd className="me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium  bg-yellow-900 text-yellow-300">
                                        <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor"  d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                        </svg>
                                        Not Delivered
                                    </dd>
                                }
                                
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Paid:</dt>
                                {order.isPaid? 
                                    <dd className="me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium bg-green-900 text-green-300">
                                        <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor"  d="M5 11.917 9.724 16.5 19 7.5" />
                                        </svg>
                                        Paid
                                    </dd>
                                :
                                    <dd className="me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium bg-yellow-900 text-yellow-300">
                                        Not Paid
                                    </dd>
                                }
                                
                                </dl>
                                
                                    {order.isDeliverd?
                                    <svg className="h-8 w-8 text-green-500 "  width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="7" cy="17" r="2" />  <circle cx="17" cy="17" r="2" />  <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />  <line x1="3" y1="9" x2="7" y2="9" /></svg>
                                    
                                    :

                                    <button onClick={()=>handleDelivery(order._id)} className="w-full inline-flex justify-center rounded-lg  border border-gray-200  px-3 py-2 text-sm font-medium text-gray-100 hover:bg-green-600 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-green-300 lg:w-auto">Deliver</button>
                                    }
                               
                                
                                    
                                
                            </div>
                                    )
                                })}

                
                </div>
            </div>

            </div>
        </div>
    </section>
  )
}

export default OrderPage