
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAddProductReviewMutation, useFetchRelatedProductsQuery, useFetchSingleProductQuery } from '../redux/api/productApiSlice';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import ReviewModal from '../components/ReviewModal';
import { ToastContainer, toast } from 'react-toastify'
import FavouriteButton from '../components/FavouriteButton';
import { useDispatch } from 'react-redux';
import { useAddFavMutation, useDeleteFavMutation, useFetchFavQuery } from '../redux/api/favouriteApiSlice';
import { addFavProduct, removeFavProduct, setFavList } from '../redux/features/favourite/favouriteSlice';
import { useAddCartProductMutation, useFetchCartProductsQuery } from '../redux/api/cartApiSlice';
import { setCartProducts } from '../redux/features/cart/cartSlice';

const ProductDetail = () => {

  const [isFav,setIsFav]=useState(false);
  const [isCartProd,setIsCartProd]=useState(false);

  const [showReviews,setShowReviews]=useState(false);
  
  const [rating,setRating]=useState('');
  const [comment,setComment]=useState('');
  const [showReviewModal,setShowReviewModal]=useState(false);

  
  const dispatch=useDispatch();
  
  const {productId}=useParams();

  const navigate=useNavigate();

  const userInfo=JSON.parse(localStorage.getItem('userInfo'));
  const userId=userInfo?._id

  //productApiSlice
  const {data:productDetail, refetch:refetchSingleProductDetail}=useFetchSingleProductQuery(productId);
  const [addReviewProdApiCall]=useAddProductReviewMutation();
  

  //favApiSlice
  const [addFavApiCall]=useAddFavMutation()
  const [deleteFavApiCall]=useDeleteFavMutation();
  const {data:favData,refetch:refetchFavProduct}=useFetchFavQuery(userId)

  //cartApiSlice
  const userid=userId
  const {data:cartProducts, refetch:refetchCartProducts}=useFetchCartProductsQuery(userid);
  const [addToCartApiCall]=useAddCartProductMutation()

  let categoryId;
  let descriptionArray;
  if(productDetail){
    descriptionArray=productDetail.description.split("\n");
    categoryId=productDetail.category._id;
  }
  const {data:relatedProducts, refetch:refetchRelatedProducts}=useFetchRelatedProductsQuery(categoryId);
 
  

  const addReviewProd = async () => {

    const review = {
      rating,
      comment,
    };
    
    try {

      await addReviewProdApiCall({ productid:productId, review }).unwrap();
      toast.success("Review added");
      setShowReviewModal(false);
      refetchSingleProductDetail();
     
    } catch (error) {
      toast.error(error?.data?.message || error?.data?.msg);
    }
  };

  const addThisFavProduct=async()=>{
    try {
      if(userInfo){
        await addFavApiCall({userId,productId}).unwrap();
        dispatch(addFavProduct(productDetail));
        refetchFavProduct();
        setIsFav(true);
      }else{
        navigate('/login')
      }

    } catch (error) {
      toast.error('error in adding fav')
    }
  }

  const removeThisFavProduct=async()=>{
    try {
      await deleteFavApiCall({userId,productId}).unwrap();
      dispatch(removeFavProduct(productId));
      refetchFavProduct();
      setIsFav(false);
    } catch (error) {
      toast.error('error in removing product')
    }
  }
  
  const handleAddToCart=async()=>{
    const productid=productId;
    try {
      if(userInfo){
        await addToCartApiCall({userid,productid}).unwrap();
        refetchCartProducts()
        setIsCartProd(true); 
      }else{
        navigate('/login');
      }
      
    } catch (error) {
      toast.error('unable to add this product')
    }
  }

  const handleIsVisibleReviewModal=()=>{
    if(userInfo){
      setShowReviewModal(true)
    }else{
      navigate('/login');
    }
    
  }
  
  useEffect(()=>{
      refetchRelatedProducts();
      

    if(favData){
      dispatch(setFavList(favData));
      setIsFav(favData.some((fd)=>fd._id===productId))
    }
    if(cartProducts){
      dispatch(setCartProducts(cartProducts));
      setIsCartProd(cartProducts.some((cp)=>cp.product._id===productId))
    }
   
  },[favData,productId,cartProducts]);

  if(!productDetail){
    return <Loader />
  }

  return (
    
    <div className="font-sans mt-11 md:px-8">
      <ToastContainer />
  <div className="md:max-w-5xl max-w-64 mx-auto">
    <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
      <div className="w-64 md:w-full lg:sticky top-0 sm:flex justify-center lg:justify-start gap-2">
        <img src={productDetail.image} alt="Product" className="h-96 min-w-full rounded-md object-cover" />
      </div>
      <div>
        <h2 className="text-lg md:text-2xl font-bold text-gray-100">
          {productDetail.name} | {productDetail.category.name}
        </h2>
        <div className="flex flex-wrap gap-4 mt-4">
          <p className="text-gray-100 md:text-xl font-bold">₹ {productDetail.price}</p>
          <p className="text-gray-400 md:text-xl">
            <strike>{productDetail.price + 1000}</strike>
            <span className="text-sm ml-1.5">Tax included</span>
          </p>
        </div>
        <div className="flex space-x-2 mt-4">
          <span className="text-base md:text-lg text-gray-200">{Math.round(productDetail.rating * 10) / 10}</span>
          <svg className="w-5 fill-yellow-400" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
          </svg>
          <div className="text-lg text-gray-200">| {productDetail.reviews.length}</div>
        </div>

        <div className='grid grid-cols-4 gap-4'>

        {isCartProd?
        <Link to={'/cart'}
        className="col-span-3 flex justify-center mt-8 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold rounded-md">
          <button
          type='button'
          >
            Go to cart
          </button>
        </Link>
        :
        <button
          onClick={handleAddToCart}
        type="button"
        className=" col-span-3 mt-8 md:px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold rounded-md"
      >
        Add to cart
      </button>}

        <div className='col-span-1'>
        
        <FavouriteButton 
        setIsFav={setIsFav} 
        isFav={isFav}
        addThisFavProduct={addThisFavProduct}
        removeThisFavProduct={removeThisFavProduct}/>
        </div>

        </div>

        <div className="mt-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-100">About the item</h3>
          <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-100">
            {descriptionArray.map((des, idx) => (
              <li key={idx}>{des}</li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <div className='flex justify-between'>
          <h3 className="text-base md:text-xl font-bold text-gray-100">Reviews({productDetail.reviews.length})</h3>

          <button className='p-1 text-sm md:text-base rounded-md bg-pink-600 text-white shadow-sm'
          onClick={handleIsVisibleReviewModal}>
            Add review
          </button>
          </div>

         {showReviewModal && 
         <ReviewModal
         setShowReviewModal={setShowReviewModal}
         rating={rating}
         setRating={setRating}
         comment={comment}
         setComment={setComment}
         showReviewModal={showReviewModal}
         addReviewProd={addReviewProd} />}
          
          <button
            onClick={() => setShowReviews(!showReviews)}
            type="button"
            className="w-full mt-8 px-6 py-2.5 border border-pink-500 bg-transparent hover:border-pink-700 text-gray-100 text-sm font-semibold rounded-md"
          >
            {showReviews ? "Hide Reviews" : "Read all reviews"}
          </button>
        </div>
        {showReviews && (
          <div className="mt-8 h-40 overflow-y-scroll backdrop-filter backdrop-blur-lg border border-gray-300 rounded-md">
            <ul className="mt-2 ml-2">
              {productDetail.reviews.map((rev) => (
                <li key={rev._id} className="mt-2">
                  <div className="flex align-middle">
                    <div className="w-5 h-5 rounded-full flex justify-center bg-slate-600 text-gray-300">
                      {rev.name[0]}
                    </div>
                    <span className="ml-2 text-sm text-white">{rev.name}</span>
                  </div>
                  <div className="ml-7 text-xs text-gray-600">
                    Rating:- <span className="text-white">{rev.rating}/5</span>
                  </div>
                  <div className="ml-7 mt-1 text-white text-xs">{rev.comment}</div>
                  <div className="mt-2 flex justify-center">
                    <hr className="justify-center border-gray-600 w-5/6" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    <div className="m-auto py-4 md:px-4 ">
      <div className="flex flex-col justify-start pb-4 md:p-4">
        <h1 className="text-lg md:text-2xl">Related Products</h1>
        <hr className="w-44 md:w-1/3 border-1 border-solid border-pink-700" />
      </div>
      <div className="md:w-full flex overflow-x-scroll ">
        {!relatedProducts ? (
          <Loader />
        ) : (
          relatedProducts.map((rp) => (
              <div key={rp._id} className=" min-w-60 md:min-w-72  rounded overflow-hidden transition-all  hover:shadow-pink-300 shadow-md hover:shadow-lg mx-5 mb-3">
                <div className="relative">
                  <Link to={`/productdetail/${rp._id}`}>
                    <img className="w-full h-32 md:h-48" src={rp.image} alt={rp.name}/>
                  </Link>
                    
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">{rp.name.slice(0,15)}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                    {rp.description.slice(0, 20) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className='w-12 p-1 bg-gray-400 flex justify-between rounded-2xl'>
                        <span className="text-sm md:text-base text-gray-200">{Math.round(rp.rating * 10) / 10}</span>
                        <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                      </div>
                        <span className="font-bold text-sm md:text-lg">&#8377;{rp.price}</span>
                        
                    </div>
                </div>
              </div>
            
          ))
        )}
      </div>
    </div>
  </div>
</div>

  )
}

export default ProductDetail