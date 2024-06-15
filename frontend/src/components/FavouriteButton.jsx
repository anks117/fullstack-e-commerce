import { CiHeart } from "react-icons/ci"
import { FaHeart } from "react-icons/fa"
CiHeart
FaHeart
const FavouriteButton = ({setIsFav,isFav,addThisFavProduct,removeThisFavProduct}) => {
    const handleAddFavProd=()=>{
        addThisFavProduct();
        setIsFav(true);
    }

    const handleRemoveFavProd=()=>{
        removeThisFavProduct();
        setIsFav(false);
    }

  return (
    <div>
        {isFav?
             <button 
             onClick={handleRemoveFavProd}
             className="flex justify-center w-full mt-8 px-3 py-3 border border-pink-600 hover:border-pink-800 text-white text-sm font-semibold rounded-md">
                 <FaHeart size={20} className="text-pink-700 " />
                 <span className="ml-2">Favourite</span>
             </button>
             :
            <button 
            onClick={handleAddFavProd}
            className=" flex justify-center w-full mt-8 px-3 py-3 border border-pink-600 hover:border-pink-800 text-white text-sm font-semibold rounded-md">
                <CiHeart size={20}/>
                <span className="ml-2">Favourite</span>
            </button>  
           
        }
        
    </div>
    
  )
}

export default FavouriteButton