import { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useAddFavMutation, useDeleteFavMutation, useFetchFavQuery } from "../redux/api/favouriteApiSlice";

const ProductCard = ({ tpId, tpName, tpDescription, tpImage, tpPrice }) => {
  const [isFav, setIsFav] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo._id;
  const productId = tpId;

  const { data: favData, isLoading, isError } = useFetchFavQuery(userId);

  useEffect(() => {

    if (favData) {
      console.log(favData);
      const favProductIds = favData.map(fav => fav._id);
      setIsFav(favProductIds.includes(productId));
    }
  }, [favData, productId]);

  const [addFavApiCall] = useAddFavMutation();
  const [removeFavApiCall] = useDeleteFavMutation();

  const handleRemoveFav = async (userId, productId) => {
    try {
      await removeFavApiCall({ userId, productId }).unwrap();
      setIsFav(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddFav = async (userId, productId) => {
    try {
      await addFavApiCall({ userId, productId }).unwrap();
      setIsFav(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative flex flex-col text-gray-100 hover:cursor-pointer hover:shadow-lg bg-clip-border rounded-xl w-72 mb-7">
      <div className={`relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-80`}>
        <img
          src={tpImage}
          alt={tpName}
          className="object-cover w-full h-full"
        />

        {isFav ?
          <FaHeart
            onClick={() => handleRemoveFav(userId, productId)}
            className="absolute text-white top-2 right-2"
            size={25}
          />
          :
          <CiHeart
            onClick={() => handleAddFav(userId, productId)}
            className="absolute text-white top-2 right-2"
            size={25}
          />
        }
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            {tpName}
          </p>
          <p className="block font-sans rounded-3xl p-3 bg-pink-500 text-base antialiased font-medium leading-relaxed text-gray-100">
            ₹{tpPrice}
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 hover:text-gray-200 opacity-75">
          {tpDescription.slice(0, 80) + '...'}
        </p>
      </div>
      <div className="p-6 pt-0">
        <button
          className="align-middle bg-pink-700 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-pink-950 hover:shadow-pink-950 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          type="button">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard;
