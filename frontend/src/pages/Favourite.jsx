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
        <h1 className='text-lg md:text-2xl'> Favourite Products({totalFavourites})</h1>
        <hr className='w-44 md:w-1/4 border-1 border-solid border-pink-700'/>
      </div>

      {totalFavourites >0?
        <div className="mt-12 flex justify-center space-y-5 md:space-y-0 flex-wrap">
        {
          favouriteList && favouriteList.map((prod)=>{
            return(
              <div key={prod._id} className="sm:max-w-96 max-w-60 md:max-w-xs mx-auto rounded overflow-hidden transition-all  hover:shadow-pink-300 shadow-md hover:shadow-lg">
                <div className="relative">
                  <Link to={`/productdetail/${prod._id}`}>
                    <img className="w-full md:h-48" src={prod.image} alt={prod.name}/>
                  </Link>
                  <svg 
                  onClick={()=>handleRemove(userId, prod)}
                  width="64px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1 right-0 hover:fill-red-700 cursor-pointer"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#d71919"></path> </g></svg>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">{prod.name.slice(0,15)}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                    {prod.description.slice(0, 60) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-sm md:text-lg">&#8377;{prod.price}</span>
                        
                      <button 
                      onClick={()=>handleMoveToCart(userId,prod)} 
                      className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-2 md:px-4 rounded">
                        Add to cart
                      </button>
                        
                        
                    </div>
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