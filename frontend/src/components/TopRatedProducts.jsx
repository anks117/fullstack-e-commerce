import ProductCard from "./ProductCard"
import { FaRegCircleRight } from 'react-icons/fa6'


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
        <hr className='w-1/3 border-2 border-solid border-pink-700'/>
      </div>

      <div className="flex flex-row flex-wrap justify-evenly">
        {topProducts.map((tp)=>{
            return(
                <div key={tp._id}>
                    <ProductCard  
                    tpName={tp.name} 
                    tpImage={tp.image} 
                    tpPrice={tp.price} 
                    tpDescription={tp.description}
                    height={80}/>
                </div>
                
            )
        })}
        
      </div>
      
    </div>
  )
}

export default TopRatedProducts