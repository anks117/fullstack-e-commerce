import ProductCard from "./ProductCard"



const TopRatedProducts = ({topProducts}) => {

    if(!Array.isArray(topProducts) || topProducts.length===0){
        return (
            <div className="text-xl">
                No Top rated products available!
            </div>
        )
    }
  return (
    <div className="max-w-full m-auto py-4 px-4 relative">

      <div className='flex flex-col justify-start p-4'>
        <h1 className='text-2xl'> Special Products</h1>
        <hr className='w-1/3 border-1 border-solid border-pink-700'/>
      </div>

      <div className="flex flex-row flex-wrap justify-evenly">
        {topProducts.map((tp)=>{
            return(
                <div key={tp._id}>
                    <ProductCard  
                    tp={tp}
                    h={80}
                    />
                </div>
                
            )
        })}
        
      </div>
      
    </div>
  )
}

export default TopRatedProducts