import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import {Link} from 'react-router-dom'

const Header = ({ newProducts }) => {
  const [currIndex, setCurrIndex] = useState(0);

  if (!Array.isArray(newProducts) || newProducts.length === 0) {
    return <div>No new products available</div>;
  }

  const prevSlide = () => {
    const isFirstSlide = currIndex === 0;
    const prevIndex = isFirstSlide ? newProducts.length - 1 : currIndex - 1;
    setCurrIndex(prevIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currIndex === newProducts.length - 1;
    const nextIndex = isLastSlide ? 0 : currIndex + 1;
    setCurrIndex(nextIndex);
  };

  return (
    <div className="max-w-full h-[30rem] m-auto py-4 px-4 relative group">
      <div className='flex flex-col justify-start p-4'>
        <h1 className='text-2xl'> Our New Products</h1>
        <hr className='w-1/3 border-2 border-solid border-pink-700'/>
      </div>
      
      <div
        style={{ backgroundImage: `url(${newProducts[currIndex].image})` }} 
        className='w-full h-full rounded-2xl bg-center bg-cover bg-no-repeat duration-500'
      >
        <div className='absolute fixed bottom-2 flex flex-col space-y-7 p-7'>
          <span className='text-xl text-white'>{newProducts[currIndex].name}</span>
          <span className='text-xl text-white'>{newProducts[currIndex].description.slice(0, 50)}...</span>
          <Link to={`/productdetail/${newProducts[currIndex]._id}`}>
            <button className="text-white inline-flex items-center bg-pink-600 hover:bg-pink-800 font-medium rounded-3xl text-sm px-5 py-2.5 text-center">
              See more
            </button>
          </Link>
        </div>
        
        {/* left-arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* right-arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
      </div>
    </div>
  );
};

export default Header;

