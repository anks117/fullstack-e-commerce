import { useEffect } from "react";
import Header from "../components/Header"
import { useFetchNewProductQuery, useFetchTopProductQuery } from "../redux/api/productApiSlice"
import TopRatedProducts from "../components/TopRatedProducts";

const HomePage = () => {

  const {data:newProducts, refetch:refetchNewProducts}=useFetchNewProductQuery();
  const {data:topProducts, refetch:refetchTopProducts}=useFetchTopProductQuery();
  
  useEffect(()=>{
    refetchNewProducts();
    refetchTopProducts
  },[newProducts,topProducts])

  
  return (
      <div className=" space-y-16 p-4">
        <Header newProducts={newProducts}/>
        <TopRatedProducts topProducts={topProducts} />
      </div>
    
  )
}

export default HomePage