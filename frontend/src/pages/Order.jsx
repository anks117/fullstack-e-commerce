import { useParams } from "react-router-dom"
import { useGetOrderDetailsQuery, useOrderPayMutation } from '../redux/api/orderApiSlice'
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Order = () => {
  const {orderId}=useParams();
  const {data:orderDetails, refetch:refetchOrderDetails} =useGetOrderDetailsQuery(orderId);
  const [orderPayApiCall]=useOrderPayMutation()

  const [date,setDate]=useState('');
  const [time,setTime]=useState('');
  

  
  const convertTime=()=>{
    const dateTimeString=orderDetails?.createdAt
    const date=new Date(dateTimeString);
    const day=date.getDate();
    const month=date.getMonth();
    const year=date.getFullYear();

    //extract time
    const hrs=date.getHours();
    let min=date.getMinutes();
    min=min<10?'0'+min:min

    setDate(`${day.toString()}-${month.toString()}-${year.toString()}`);
    setTime(`${hrs.toString()}:${min.toString()}`)
  }

  const handlePay=async()=>{
    try {
        await orderPayApiCall(orderId).unwrap();
        toast.success("Payment Done !");
    } catch (error) {
        toast.error('unable to pay')
    }
  }

  useEffect(()=>{
    refetchOrderDetails()
    convertTime()
  },[orderDetails?.isDeliverd,orderDetails?.isPaid])

  return (
    <div className="flex items-center justify-center min-w-fit">
      <ToastContainer />
      <div className="py-14 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl text-white lg:text-4xl font-semibold leading-7 lg:leading-9 ">Order #{orderId.slice(-6)}</h1>
                <p className="text-base text-gray-300 font-medium leading-6">{date} at {time} </p>
            </div> 
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-stone-900  px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl text-pink-600 font-semibold leading-6 xl:leading-5">Ordered Items</p>
                        {orderDetails?.orderItems && orderDetails?.orderItems?.map((oi)=>{
                          return(
                            <div key={oi._id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img className="w-full hidden md:block" src={oi.image} alt={oi.name} />
                                <img className="w-full md:hidden" src={oi.image} alt={oi.name} />
                            </div>
                            <div className="border-b border-pink-600 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl text-white xl:text-2xl font-semibold leading-6">
                                      {oi.name}</h3>
                                    
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                    <p className="text-base text-white xl:text-lg leading-6">&#8377;{oi.price}</p>
                                    <p className="text-base text-white xl:text-lg leading-6 ">{oi.quantity}</p>
                                    <p className="text-base text-white xl:text-lg font-semibold leading-6 ">&#8377;{oi.price*oi.quantity}</p>
                                </div>
                            </div>
                        </div>
                          )
                        })}
                        
                    </div>

                    <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-stone-900 space-y-6">
                            <h3 className="text-xl text-pink-600 font-semibold leading-5">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between w-full">
                                    <p className="text-base text-white leading-4 ">Subtotal</p>
                                    <p className="text-base text-gray-300 leading-4">&#8377;{orderDetails?.itemPrice}</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base text-white leading-4 ">Tax</p>
                                    <p className="text-base text-gray-300 leading-4 ">&#8377;{orderDetails?.taxPrice} (15%)</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base text-white leading-4 ">Shipping</p>
                                    <p className="text-base  leading-4 text-gray-300">&#8377;{orderDetails?.shippingPrice}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base text-white font-semibold leading-4 ">Total</p>
                                <p className="text-base text-gray-300 font-semibold leading-4 ">&#8377;{orderDetails?.totalPrice}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-stone-900  space-y-6">
                            
                            <div className="flex justify-between items-start w-full">
                                <div className="flex justify-center items-center space-x-4">
                                
                                    <div className="w-8 h-8">

                                    
                                        <img className="w-full h-full" alt="logo" src= {orderDetails?.isDeliverd?"https://img.icons8.com/?size=100&id=u1h3CkWT9Fdm&format=png&color=40C057" :"https://img.icons8.com/?size=100&id=u1h3CkWT9Fdm&format=png&color=FFFFFF" } />
                                    </div>
                                    <div className="flex flex-col justify-start items-center">
                                        
                                        <p className={`text-lg leading-6 ${orderDetails?.isDeliverd? "text-green-500":"text-red-500"}  font-semibold`}>
                                            {orderDetails?.isDeliverd?"Delivered":"Not Delivered yet"}<br /></p>
                                    </div>
                                </div>
                                
                            </div>
                            {orderDetails?.isPaid?
                                <div className="flex justify-between items-start w-full">
                                <div className="flex justify-center items-center space-x-4">
                                
                                    <div className="w-8 h-8">

                                    
                                        <img className="w-full h-full" alt="logo" src= "https://img.icons8.com/?size=100&id=gWpFZsHoozrx&format=png&color=40C057" />
                                    </div>
                                    <div className="flex flex-col justify-start items-center">
                                        
                                        <p className={`text-lg leading-6 text-green-500  font-semibold`}>
                                            Paid<br /></p>
                                    </div>
                                </div>
                                
                                </div> :
                                <div className="w-full flex justify-center items-center">
                                <button 
                                onClick={handlePay}
                                className=" bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-800 py-5 w-96 md:w-full text-base font-medium leading-4 text-white">Pay now</button>
                                </div>}
                            
                        </div>
                    </div>
                </div>

                <div className=" bg-stone-900 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                    <h3 className="text-xl  font-semibold leading-5 text-pink-600">Customer</h3>
                    <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                
                                <div className="flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base text-white font-semibold leading-4 text-left">{orderDetails?.user.username}</p>
                                    
                                </div>
                            </div>
    
                            <div className="flex justify-center text-white md:justify-start items-center space-x-2 py-4 border-b border-gray-200 w-full">
                                <img className="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg" alt="email" />
                                <img className="hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg" alt="email" />
                                <p className=" text-sm leading-5 ">{orderDetails?.user.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base text-white font-semibold leading-4 text-center md:text-left ">Shipping Address</p>
                                    <p className="w-48 lg:w-full text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 ">
                                      {orderDetails?.shippingAddress?.address +","+orderDetails?.shippingAddress?.city}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    
      </div>
    
  )
}

export default Order