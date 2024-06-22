import { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useAddFavMutation, useDeleteFavMutation, useFetchFavQuery } from "../redux/api/favouriteApiSlice";
import { useDispatch } from "react-redux";
import { setFavList } from "../redux/features/favourite/favouriteSlice";
import { Link, useNavigate } from 'react-router-dom';
import { useAddCartProductMutation, useFetchCartProductsQuery } from "../redux/api/cartApiSlice";
import { setCartProducts } from "../redux/features/cart/cartSlice";

const ProductCard = ({ tp }) => {
  const [isFav, setIsFav] = useState(false);
  const [isCartProd,setIsCartProd]=useState(false);
  const dispatch = useDispatch();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo?._id;
  const productId = tp._id;
 
  // favApiSlice
  const { data: favData, refetch: refetchFavQuery } = useFetchFavQuery(userId);
  const [addFavApiCall] = useAddFavMutation();
  const [removeFavApiCall] = useDeleteFavMutation();

  // cartApiSlice
  const userid=userId
  const {data:cartProduct, refetch:refetchCartProducts}=useFetchCartProductsQuery(userid);
  const [addToCartProduct]=useAddCartProductMutation();
  const navigate=useNavigate();

  useEffect(() => {
    if (favData) {
      dispatch(setFavList(favData));
      setIsFav(favData.some(fav => fav._id === productId));
    }
    if(cartProduct){
      dispatch(setCartProducts(cartProduct));
      setIsCartProd(cartProduct.some(cp=>cp.product._id===productId));
      console.log('cartproducts');
    }
    
  }, [favData, productId,cartProduct]);



  const handleRemoveFav = async () => {
    try {
      await removeFavApiCall({ userId, productId }).unwrap();
      
      refetchFavQuery()
      setIsFav(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFav = async () => {
    try {

      if(userInfo){
        await addFavApiCall({ userId, productId }).unwrap();
        refetchFavQuery();
        setIsFav(true);
      }else{
        navigate('/login')
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart=async()=>{
    const userid=userId;
    const productid=productId
    try {
      if(userInfo){
        await addToCartProduct({userid,productid}).unwrap();
        refetchCartProducts()
        setIsCartProd(true);
      }else{
        navigate('/login')
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative flex flex-col text-gray-100 hover:cursor-pointer hover:shadow-lg bg-clip-border rounded-xl w-72 mb-7">
      <div className={`relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl 
        h-80`}>
        <Link to={`/productdetail/${productId}`}>
          <img
            src={tp.image}
            alt={tp.name}
            className="object-cover w-full h-full"
          />
        </Link>
        {isFav ? (
          <FaHeart
            onClick={handleRemoveFav}
            className="absolute text-white top-2 right-2"
            size={25}
          />
        ) : (
          <CiHeart
            onClick={handleAddFav}
            className="absolute text-white top-2 right-2"
            size={25}
          />
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            {tp.name.slice(0,20)}
          </p>
          <p className="block font-sans rounded-3xl p-3 bg-pink-500 text-base antialiased font-medium leading-relaxed text-gray-100">
            ₹{tp.price}
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 hover:text-gray-200 opacity-75">
          {tp.description.slice(0, 80) + '...'}
        </p>
      </div>
      <div className="p-6 pt-0">
        {isCartProd?
        <Link to={'/cart'}>
          <button
          className="align-middle bg-pink-700 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-pink-950 hover:shadow-pink-950 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        type="button"
      >
        Go to Cart
      </button>
        </Link>:
        <button
        onClick={handleAddToCart}
        className="align-middle bg-pink-700 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-pink-950 hover:shadow-pink-950 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        type="button"
      >
        Add to Cart
      </button>}
        
      </div>
    </div>
  );
};

export default ProductCard;
