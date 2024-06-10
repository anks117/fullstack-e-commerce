
const ProductCard = ({tpName, tpDescription, tpImage, tpPrice,height}) => {

  return (
    <div className="relative flex flex-col text-gray-100  hover:cursor-pointer hover:shadow-lg bg-clip-border rounded-xl w-72 mb-7">
  <div className={`relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-${height}`}>
    <img
      src={tpImage}
      alt={tpName} className="object-cover w-full h-full" />
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
      {tpDescription.slice(0,80)+'...'}
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

export default ProductCard