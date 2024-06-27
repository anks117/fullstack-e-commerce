import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProgressStep from "../components/ProgressStep"
import { setShippingAddress } from "../redux/features/cart/cartSlice";



const ShippingPage = () => {

  const shippingAddress=useSelector((state)=>state.cart.shippingAddress);

  const [city,setCity]=useState(shippingAddress.city || "");
  const [address,setAddress]=useState(shippingAddress.address|| "");
  const [postalCode,setPostalCode]=useState(shippingAddress.postalCode|| "");
  const [country,setCountry]=useState(shippingAddress.country|| "");

  const dispatch=useDispatch();
  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const sa={
      address,
      city,
      postalCode,
      country
    }

    try {
      dispatch(setShippingAddress(sa));
      setAddress('');
      setCity('');
      setCountry('');
      setPostalCode('');
      navigate('/summary')
    } catch (error) {
      console.log(error);
    }
    

  }

  return (
    <div className="flex flex-col items-center justify-center lg:p-4">

      <ProgressStep step1 step2  />


      <div className="flex flex-col justify-center items-center w-full mt-28 space-y-4">
      <h1 className="text-pink-600">Shipping Address</h1>
    
      <form onSubmit={(e)=>handleSubmit(e)} className="w-4/5 lg:w-5/12">
        <div className="mb-5">
          <label  className="block mb-2 text-sm font-medium text-white">Address</label>
          <input type="text" 
          onChange={(e)=>setAddress(e.target.value)}
          className="bg-zinc-900 border border-gray-300 focus:outline-none focus:ring-pink-600  focus:border focus:border-pink-600 text-white text-sm rounded-lg  w-full p-2.5" placeholder="your address" required />
        </div>
        <div className="mb-5">
          <label  className="block mb-2 text-sm font-medium text-white">City</label>
          <input type="text"  
          onChange={(e)=>setCity(e.target.value)}
          className="bg-zinc-900 border border-gray-300 focus:outline-none focus:ring-pink-600  focus:border focus:border-pink-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="your city" required />
        </div>
        <div className="mb-5">
          <label  className="block mb-2 text-sm font-medium text-white">Postal code</label>
          <input type="text"  
          onChange={(e)=>setPostalCode(e.target.value)}
          className="bg-zinc-900 border border-gray-300 focus:outline-none focus:ring-pink-600  focus:border focus:border-pink-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Your Postal code" required />
        </div>
        <div className="mb-5">
          <label  className="block mb-2 text-sm font-medium text-white">Country</label>
          <input type="text" 
          onChange={(e)=>setCountry(e.target.value)}
           className="bg-zinc-900 border border-gray-300 focus:outline-none focus:ring-pink-600  focus:border focus:border-pink-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="your country" required />
        </div>
       
        <button type="submit" className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">continue</button>
      </form>

      </div>

        
        
    </div>
  )
}

export default ShippingPage