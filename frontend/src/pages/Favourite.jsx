import { useDispatch, useSelector } from "react-redux"
import { useDeleteFavMutation, useFetchFavQuery } from "../redux/api/favouriteApiSlice"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import { setFavList} from "../redux/features/favourite/favouriteSlice"
import { useEffect } from "react"
import { useAddCartProductMutation, useFetchCartProductsQuery } from "../redux/api/cartApiSlice"
import { setCartProducts } from "../redux/features/cart/cartSlice"


const Favourite = () => {

  const userInfo=JSON.parse(localStorage.getItem('userInfo'))
  const userId=userInfo._id
  const dispatch=useDispatch(); 

  const [removeFavApiCall]=useDeleteFavMutation()
  const {data:favList, refetch:refetchFavQuery}=useFetchFavQuery(userId);
  const totalFavourites=useSelector((state)=>state.favourite.totalFavourites);
  const favouriteList=useSelector((state)=>state.favourite.favouriteList)
  
  const [addToCartApiCall]=useAddCartProductMutation();
  const userid=userId
  const {data:cartProducts,refetch:refetchCartProducts}=useFetchCartProductsQuery(userid)

  

  const handleRemove=async(userId,prod)=>{
    try {
      await removeFavApiCall({userId,productId:prod._id}).unwrap();
      toast.warning("Removed from favourite list")
      refetchFavQuery();
    } catch (error) {
      toast.error("error in removing");
    }
  }

  const handleMoveToCart=async(userid,prod)=>{
    const productid=prod._id
    try {
      await addToCartApiCall({userid,productid}).unwrap();
      await removeFavApiCall({userId:userid,productId:prod._id}).unwrap();
      toast.success('Moved to cart');
      refetchCartProducts();
      refetchFavQuery();
      console.log('move to cart clicked')

    } catch (error) {
      toast.error('error in moving to cart');
    }
  }

  useEffect(()=>{
    if(favList){
      dispatch(setFavList(favList));
      console.log(favList)
    }
    if(cartProducts){
      dispatch(setCartProducts(cartProducts))
      console.log(cartProducts);
    }
      
  },[favList,cartProducts])

 
   
    
  



  return (
    <div>
      <ToastContainer />
    <div className="max-w-full m-auto py-4 px-4 relative">

      <div className='flex flex-col justify-start p-4'>
        <h1 className='text-2xl'> Favourite Products({totalFavourites})</h1>
        <hr className='w-1/3 border-1 border-solid border-pink-700'/>
      </div>

      {totalFavourites >0?
        <div className="flex flex-row flex-wrap justify-evenly">
        {
          favouriteList && favouriteList.map((prod)=>{
            return(
              <div key={prod._id} 
              className="relative flex flex-col text-gray-100 hover:cursor-pointer hover:shadow-lg bg-clip-border rounded-xl w-80 mb-7">

              <div className={`relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-48`}>
              <Link to={`/productdetail/${prod._id}`}>
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="object-cover w-full h-full"
                />
                </Link>
        
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {prod.name}
                  </p>
                  <p className="block font-sans rounded-3xl p-3 bg-pink-500 text-base antialiased font-medium leading-relaxed text-gray-100">
                    ₹{prod.price}
                  </p>
                </div>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 hover:text-gray-200 opacity-75">
                  {prod.description.slice(0, 80) + '...'}
                </p>
              </div>
              <div className="flex justify-around p-6 pt-0">

              <button
                onClick={()=>handleRemove(userId,prod)}
                  className="align-middle bg-red-700 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-2 rounded-lg shadow-red-950 hover:shadow-red-950 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-1/3 bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none"
                  type="button">
                  Remove
                </button>

                <button
                onClick={()=>handleMoveToCart(userId,prod)}
                  className="align-middle bg-pink-700 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-1 px-2 rounded-lg shadow-pink-950 hover:shadow-pink-950 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-auto bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  type="button">
                  Move to Cart
                </button>
              </div>
            </div>
            )
          })
        }
        
      </div>
      :
      <div className="py-11 bg-stone-900 rounded-lg  w-full h-60 flex align-middle justify-center">
        <h1 className="text-gray-100 text-2xl">Your Favourite list is Empty!</h1>
      </div>
        }

      
      
    </div>
    </div>
  )
}

export default Favourite