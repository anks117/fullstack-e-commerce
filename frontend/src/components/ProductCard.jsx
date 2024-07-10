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
    <div className="sm:max-w-96 max-w-60 md:max-w-xs mx-auto rounded overflow-hidden transition-all duration-500  hover:shadow-pink-300 shadow-md hover:shadow-lg">
    <div className="relative">
      <Link to={`/productdetail/${tp._id}`}>
        <img className="w-full md:h-48" src={tp.image} alt={tp.name}/>
      </Link>
        {isFav ? (
          <FaHeart
            onClick={handleRemoveFav}
            className="absolute cursor-pointer text-pink-600 top-2 right-2"
            size={25}
          />
        ) : (
          <CiHeart
            onClick={handleAddFav}
            className="absolute cursor-pointer text-pink-600 top-2 right-2"
            size={25}
          />
        )}
    </div>
    <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{tp.name.slice(0,15)}</h3>
        <p className="text-gray-600 text-sm mb-4">
        {tp.description.slice(0, 60) + '...'}
        </p>
        <div className="flex items-center justify-between">
            <span className="font-bold text-sm md:text-lg">&#8377;{tp.price}</span>
            {isCartProd?
            <Link to={'/cart'} className="bg-pink-500 hover:bg-pink-600  text-white font-bold py-2 px-2 md:px-4 rounded">
            Go to cart
          </Link>
          :
          <button
              onClick={handleAddToCart}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-2 md:px-4 rounded">
            Add to cart
          </button>
            }
            
        </div>
    </div>
    </div>
  );
};

export default ProductCard;



