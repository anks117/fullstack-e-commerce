import ProgressStep from "../components/ProgressStep"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCartProducts, setShippingAddress } from "../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../redux/api/orderApiSlice";
import { ToastContainer, toast } from 'react-toastify'
import { useRemoveAllCartProductsMutation } from "../redux/api/cartApiSlice";
const SummaryPage = () => {

  const cartList=JSON.parse(localStorage.getItem("cartList"));
  const shippingAddress=JSON.parse(localStorage.getItem("shippingAddress"));
  const totalCartPrice=JSON.parse(localStorage.getItem("totalCartPrice"));
  const shippingPrice=JSON.parse(localStorage.getItem("shippingPrice"));
  const taxPrice=JSON.parse(localStorage.getItem("taxPrice"));
  const grandTotalPrice=JSON.parse(localStorage.getItem("grandTotalPrice"));

  const userInfo=JSON.parse(localStorage.getItem('userInfo'));

  const [createOrderApiCall]=useCreateOrderMutation();

  const [removeAllCartProductsApiCall]=useRemoveAllCartProductsMutation()

  const dispatch=useDispatch();
  const navigate=useNavigate()

  const handleCancel=()=>{
    dispatch(setShippingAddress({}));
    navigate('/cart')
  }
  
  const handlePlaceOrder=async()=>{
    const orderItems=cartList;
    const totalPrice=totalCartPrice;

    try {
      const newOrder=await createOrderApiCall({orderItems,totalPrice,grandTotalPrice,taxPrice,shippingAddress,shippingPrice}).unwrap();
      const orderId=newOrder._id
      toast.success("Order Placed");
      await removeAllCartProductsApiCall().unwrap();
      dispatch(setShippingAddress({}));
      dispatch(setCartProducts([]));
      
      setTimeout(() => {
        navigate(`/order/${orderId}`)
      }, 3000);
      
    } catch (error) {
      toast.error("order failed");
  
    }
  }

  return (
    <div className="flex flex-col items-center justify-center lg:p-4">
      <ToastContainer/>
    <ProgressStep step1 step2 step3/>
    
    <div className="font-[sans-serif]  mt-28">
      <div className="max-lg:max-w-full mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 max-lg:order-1 md:p-6 !pr-0 max-w-4xl mx-auto w-60 md:w-full">
            

            <form className="lg:mt-16">
              <div>
                <h2 className="text-xl font-bold text-pink-600">Shipping info</h2>

                <div className="grid sm:grid-cols-2 gap-8 mt-8">
                  <div>
                    <input type="text"
                      value={userInfo.username}
                      className="px-2 pb-2 bg-stone-800 text-gray-100 w-full text-sm border-b border-gray-300 outline-none" readOnly/>
                  </div>
                  <div>
                    <input type="email"
                      value={userInfo.email}
                      className="px-2 pb-2 bg-stone-800 text-gray-100 w-full text-sm border-b border-gray-300 outline-none" readOnly/>
                  </div>
                  <div>
                    <input type="text"
                      value={shippingAddress.address}
                      className="px-2 pb-2 bg-stone-800 text-gray-100 w-full text-sm border-b border-gray-300 outline-none" readOnly/>
                  </div>
                  <div>
                    <input type="text"
                      value={shippingAddress.city}
                      className="px-2 pb-2 bg-stone-800 text-gray-100 w-full text-sm border-b border-gray-300 outline-none" readOnly/>
                  </div>
                  
                  <div>
                    <input type="number"
                      value={shippingAddress.postalCode}
                      className="px-2 pb-2 bg-stone-800 text-gray-100 w-full text-sm border-b border-gray-300 outline-none" readOnly/>
                  </div>

                  <div>
                    <input type="text"
                      value={shippingAddress.country}
                      className="px-2 pb-2 bg-stone-800 text-gray-100 w-full text-sm border-b border-gray-300 outline-none" readOnly/>
                  </div>
                </div>
              </div>

             

              <div className="flex flex-wrap gap-4 mt-8">
                <button type="button" 
                onClick={handleCancel}
                className="min-w-[150px] px-6 py-3.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">cancel</button>
                <button type="button" 
                onClick={handlePlaceOrder}
                className="min-w-[150px] px-6 py-3.5 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700">Place Order</button>
              </div>
            </form>
          </div>

          <div className="bg-zinc-900 max-w-64 sm:w-80 lg:h-screen lg:sticky lg:top-0">
            <div className="relative h-full">
              <div className="p-6 overflow-auto max-lg:max-h-[400px] lg:h-[calc(100vh-160px)] max-lg:mb-8">
                <h2 className="text-xl font-semibold text-pink-600 ">Order Summary</h2>

                <div className="space-y-8 mt-8">
                  {cartList?.map((cl)=>{
                    return(

                      <div key={cl._id} className="flex flex-col gap-4">
                        <div className="max-w-[140px]  shrink-0  rounded-lg">
                          <img src={cl.product.image} className="w-full object-cover" />
                        </div>

                        <div className="w-full">
                          <h3 className="text-base text-gray-100 font-bold">{cl.product.name}</h3>
                          <ul className="text-sm text-gray-300 space-y-2 mt-2">
                            
                            <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{cl.quantity}</span></li>
                            <li className="flex flex-wrap gap-4">Item Price <span className="ml-auto">&#8377;{cl.product.price * cl.quantity}</span></li>
                          </ul>
                        </div>
                  </div>
                    )
                  })}
                  

                  
                </div>
              </div>

              <div className="lg:absolute lg:left-0 lg:bottom-0 bg-zinc-800 w-full p-4 space-y-2">
              <h6 className="flex flex-wrap gap-4 text-base text-pink-600 ">Items Price <span className="ml-auto text-white">&#8377;{totalCartPrice}</span></h6>
              <h6 className="flex flex-wrap gap-4 text-base text-pink-600 ">Shipping Price <span className="ml-auto text-white">&#8377;{shippingPrice}</span></h6>
                <h6 className="flex flex-wrap gap-4 text-base text-pink-600 ">Tax <span className="ml-auto text-white">&#8377;{taxPrice}</span></h6>
                <h4 className="flex flex-wrap gap-4 text-base text-pink-600 ">Total <span className="ml-auto text-white">&#8377;{grandTotalPrice}</span></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </div>
  )
}

export default SummaryPage