import { Link} from 'react-router-dom'
import { useAddCartProductMutation, useDeleteCartProductMutation, useFetchCartProductsQuery } from '../redux/api/cartApiSlice'
import { useEffect } from 'react';
import { setCartProducts } from '../redux/features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const CartPage = () => {

  const dispatch=useDispatch();
  const userInfo=JSON.parse(localStorage.getItem('userInfo'))
  const userid=userInfo._id

  // cartApiSlice
  const {data:cartProducts, refetch:refetchCartProducts}=useFetchCartProductsQuery(userid);
  const [addCartProductApiCall]=useAddCartProductMutation()
  const [deleteCartProductionApiCall]=useDeleteCartProductMutation()

  // redux state
  const cartList=useSelector((state)=>state.cart.cartList)
  const totalCartPrice=useSelector((state)=>state.cart.totalCartPrice);
  const totalCartItems=useSelector((state)=>state.cart.totalCartItems);

  const handleAddCart=async(productid)=>{
    try {
        await addCartProductApiCall({userid,productid}).unwrap();
        refetchCartProducts();
    } catch (error) {
      toast.error("unable to add more ")
    }
  }

  const handleDeleteCart=async(cpid)=>{
    try {
        await deleteCartProductionApiCall(cpid).unwrap();
        refetchCartProducts();
    } catch (error) {
      toast.error('unbale to remove')
    }
  }

  useEffect(()=>{
    if(cartProducts){
      dispatch(setCartProducts(cartProducts));
    }
  },[cartProducts])

  return (
    <div>
      <ToastContainer />
        <section className=" py-8 antialiased md:py-16">
          <div className="max-w-screen-md ">
            <h2 className="text-xl font-semibold text-pink-600 dark:text-white sm:text-2xl">Shopping Cart</h2>

            <div className="mt-6 sm:mt-8 md:gap-4 lg:flex lg:items-start xl:gap-4">
              {totalCartItems>0?
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartList && cartList.map((cl)=>{
                  return(
                    <div key={cl._id} 
                    className="rounded-lg border border-pink-600 p-4 shadow-sm  md:p-6">

                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <div className="w-20 shrink-0 md:order-1">
                          <img className="h-20 w-20 dark:hidden" src={cl.product.image} alt={cl.product.name} />
                          
                        </div>

                        <label  className="sr-only">Choose quantity:</label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button 
                            onClick={()=>handleDeleteCart(cl._id)}
                            type="button"  
                            data-input-counter-decrement="counter-input-5" 
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-pink-700 bg-pink-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300">
                              <svg className="h-2.5 w-2.5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor"  d="M1 1h16" />
                              </svg>
                            </button>

                            <input type="text" id="counter-input-5" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-100 focus:outline-none focus:ring-0 " placeholder="" onChange={cl.quantity} value={cl.quantity} required />

                            <button 
                            onClick={()=>handleAddCart(cl.product._id)}
                            type="button"  
                            data-input-counter-increment="counter-input-5" 
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-pink-700 bg-pink-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300">

                              <svg className="h-2.5 w-2.5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" d="M9 1v16M1 9h16" />
                              </svg>

                            </button>

                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-100 ">₹⁫⁫⁫⁫⁫⁫⁫⁫{cl.quantity*cl.product.price}</p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <Link to={`/productdetail/${cl.product._id}`} className="text-base font-medium text-white hover:underline">
                            {cl.product.name}</Link>

                          
                        </div>
                      </div>
                </div>
                  )
                })}
              
                
              </div>
              
            </div>
            :
            <div className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'>
              <h1 className='text-white text-2xl'>Your cart is empty!</h1>
            </div> }
              

              <div className=" mt-6 min-w-64 flex-1 space-y-3 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm sm:p-6">
                  <p className="text-xl font-semibold text-pink-600">Order summary</p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-300 ">Original price</dt>
                        <dd className="text-base font-medium text-gray-100">₹⁫{totalCartPrice}</dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-300">Store Pickup</dt>
                        <dd className="text-base font-medium text-gray-100 ">₹{totalCartPrice>0 && '99⁫⁫'}</dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-300">Tax</dt>
                        <dd className="text-base font-medium text-gray-100">₹⁫⁫⁫⁫⁫⁫⁫⁫ {totalCartItems*100}</dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-300">Total</dt>
                      <dd className="text-base font-bold text-gray-100">₹⁫⁫⁫⁫⁫⁫⁫⁫ {totalCartPrice>0? totalCartPrice+99+totalCartItems*100:'0'}</dd>
                    </dl>
                  </div>

                  <a href="#" className="flex w-full items-center justify-center rounded-lg bg-pink-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-pink-300 ">Proceed to Checkout</a>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                    <Link to={'/shop'} className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                      Continue Shopping
                      <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor"  d="M19 12H5m14 0-4 4m4-4-4-4" />
                      </svg>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default CartPage