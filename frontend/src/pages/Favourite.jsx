import { useDispatch, useSelector } from "react-redux"
import { useDeleteFavMutation, useFetchFavQuery } from "../redux/api/favouriteApiSlice"
import { useEffect } from "react"
import Loader from "../components/Loader"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import { removeFavProduct, setFavList } from "../redux/features/favourite/favouriteSlice"


const Favourite = () => {

  const userInfo=JSON.parse(localStorage.getItem('userInfo'))
  const userId=userInfo._id
  const [removeFavApiCall]=useDeleteFavMutation()
  const {data:favProdList, refetch:refetchFavQuery}=useFetchFavQuery(userId);
  const totalFavourites=useSelector((state)=>state.favourite.totalFavourites)
  const dispatch=useDispatch();

  useEffect(()=>{
    if(favProdList){
      dispatch(setFavList(favProdList));
    }
    refetchFavQuery()
  },[refetchFavQuery,favProdList])

  const handleRemove=async(userId,productId)=>{
    try {
      await removeFavApiCall({userId,productId}).unwrap();
      toast.warning("Removed from favourite list")
      dispatch(removeFavProduct(productId));
      refetchFavQuery();

      
    } catch (error) {
      console.error(error);
    }
  }

 

  if(!favProdList){
    return <Loader />
  }

  return (
    <div>
      <ToastContainer />
    <div className="max-w-full m-auto py-4 px-4 relative">

      <div className='flex flex-col justify-start p-4'>
        <h1 className='text-2xl'> Favourite Products({totalFavourites})</h1>
        <hr className='w-1/3 border-1 border-solid border-pink-700'/>
      </div>

      <div className="flex flex-row flex-wrap justify-evenly">
        {
          favProdList && favProdList.map((prod)=>{
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
                onClick={()=>handleRemove(userId,prod._id)}
                  className="align-middle bg-red-700 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-2 rounded-lg shadow-red-950 hover:shadow-red-950 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-1/3 bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none"
                  type="button">
                  Remove
                </button>

                <button
                  className="align-middle bg-pink-700 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-1 px-2 rounded-lg shadow-pink-950 hover:shadow-pink-950 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-auto bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  type="button">
                  Add to Cart
                </button>
              </div>
            </div>
            )
          })
        }
        
      </div>
      
    </div>
    </div>
  )
}

export default Favourite