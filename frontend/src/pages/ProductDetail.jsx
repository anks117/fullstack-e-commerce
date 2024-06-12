
import { useParams } from 'react-router-dom'
import { useFetchSingleProductQuery } from '../redux/api/productApiSlice';
import Loader from '../components/Loader';

const ProductDetail = () => {
  const {productId}=useParams();
  

 
  const {data:productDetail}=useFetchSingleProductQuery(productId);
  
  let descriptionArray;
  if(productDetail){
    descriptionArray=productDetail.description.split("\n");
  }
  

  if(!productDetail){
    return <Loader />
  }

  return (
    
    <div>
      <div className="font-sans">
          <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
              <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">

                  <div className="w-full lg:sticky top-0 sm:flex gap-2">
                      
                      <img src={productDetail.image} alt="Product" className="h-96 rounded-md object-cover" />
                  </div>

                  <div>
                      <h2 className="text-2xl font-bold text-gray-100">{productDetail.name} | {productDetail.category.name}</h2>
                      <div className="flex flex-wrap gap-4 mt-4">
                          <p className="text-gray-100 text-xl font-bold">₹ {productDetail.price}</p>
                          <p className="text-gray-400 text-xl"><strike>{productDetail.price + 1000}</strike> <span className="text-sm ml-1.5">Tax included </span></p>
                      </div>

                      <div className="flex space-x-2 mt-4">
                          <svg className="w-5 fill-yellow-400" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                          <svg className="w-5 fill-yellow-400" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                          <svg className="w-5 fill-yellow-400" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                          <svg className="w-5 fill-yellow-400" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                          <svg className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                      </div>

                    

                      <button type="button" className="w-full mt-8 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold rounded-md">Add to cart</button>

                      <div className="mt-8">
                          <h3 className="text-xl font-bold text-gray-100">About the item</h3>
                          <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-100">
                            {descriptionArray.map((des,idx)=>{
                                return(
                                    <li key={idx}>{des}</li>
                                )
                            })}
                              
                             
                          </ul>
                      </div>

                      <div className="mt-8">
                          <h3 className="text-xl font-bold text-gray-100">Reviews({productDetail.reviews.length})</h3>
                          <button type="button" className="w-full mt-8 px-6 py-2.5 border border-pink-500 bg-transparent hover:border-pink-700 text-gray-100 text-sm font-semibold rounded-md">Read all reviews</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default ProductDetail