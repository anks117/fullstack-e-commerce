import { useEffect } from "react";
import Header from "../components/Header"
import { useFetchNewProductQuery } from "../redux/api/productApiSlice"

const HomePage = () => {

  const {data:newProducts, refetch:refetchNewProducts}=useFetchNewProductQuery();

  
  useEffect(()=>{
    refetchNewProducts();
  },[newProducts])

  
  return (
      <div className="p-4">
        <Header newProducts={newProducts}/>
      </div>
    
  )
}

export default HomePage