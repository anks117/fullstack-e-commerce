import { useState } from "react"


const FilterComponent = ({showFilter, 
    category,
    handlePriceRadio,
    handleBrandsCheckbox,
    brands,
    handleCheckedCategory,
    applyFilter}) => {


        const [selectedRadio,setSelectedRadio]=useState('');

        const handleRadioCheck=(min,max)=>{
            setSelectedRadio({min,max})
            handlePriceRadio(min,max)
        }

        const handleReset=()=>{
            window.location.reload();
        }
    
  return (
    <div>
        <div className="z-50 flex items-center justify-center p-4 ">

            {/* <!-- Dropdown menu --> */}
            <div className={`z-10 ${!showFilter && 'hidden'}  w-56 p-3 bg-stone-900 rounded-lg shadow max-h-96 overflow-y-auto`}>
                <h6 className="mb-3 text-sm font-medium text-pink-700"> 
                Filter by Category
                </h6>
                <ul className="space-y-2 mb-4 text-sm" aria-labelledby="dropdownDefault">
                {category && category?.map((c)=>{
                    return(
                        <li key={c._id} className="cursor-pointer flex items-center">
                    <input type="checkbox" 
                    value={c._id}
                    onChange={(e)=>handleCheckedCategory(e.target.checked,c._id)}
                    className="w-4 h-4 border-gray-300 rounded text-white focus:ring-pink-500 focus:ring-2" />

                    <label className="ml-2 text-sm font-medium text-gray-100">
                    {c.name}
                    </label>
                </li>
                    )
                })}
                </ul>
                <h6 className="mb-3 text-sm font-medium text-pink-700">
                    Filter by Brand
                </h6>
                <ul className="space-y-2  mb-4 text-sm" aria-labelledby="dropdownDefault">
                {brands && brands?.map((brand,idx)=>{
                    return(
                        <li key={idx} className="cursor-pointer flex items-center">
                    <input type="checkbox" onChange={(e)=>handleBrandsCheckbox(e.target.checked,brand)}
                    className="w-4 h-4 border-gray-300 rounded text-white focus:ring-pink-500 focus:ring-2" />

                    <label className="ml-2 text-sm font-medium text-gray-100">
                    {brand}
                    </label>
                </li>
                    )
                })}
                </ul>

                <h6 className="mb-3 text-sm font-medium text-pink-700">
                    Filter by Price
                </h6>
                <ul className="space-y-2  mb-4 text-sm" aria-labelledby="dropdownDefault">
                
                    <li className="cursor-pointer flex items-center">
                        <input type="radio" 
                        checked={selectedRadio && selectedRadio.min===0 && selectedRadio.max===1000}
                        onChange={()=>handleRadioCheck(0,1000)}
                        className="w-4 h-4 border-gray-300 rounded text-white focus:ring-pink-500 focus:ring-2" />

                        <label className="ml-2 text-sm font-medium text-gray-100">
                        ₹0 - ₹1000
                        </label>
                    </li>
                    <li className="cursor-pointer flex items-center">
                        <input type="radio" 
                        checked={selectedRadio && selectedRadio.min===1000 && selectedRadio.max===10000}
                        onChange={()=>handleRadioCheck(1000,10000)}
                        className="w-4 h-4 border-gray-300 rounded text-white focus:ring-pink-500 focus:ring-2" />

                        <label className="ml-2 text-sm font-medium text-gray-100">
                        ₹1000 - ₹10000
                        </label>
                    </li>
                    <li className="cursor-pointer flex items-center">
                        <input type="radio" 
                        checked={selectedRadio && selectedRadio.min===10000 && selectedRadio.max===50000}
                        onChange={()=>handleRadioCheck(10000,50000)}
                        className="w-4 h-4 border-gray-300 rounded text-white focus:ring-pink-500 focus:ring-2" />

                        <label className="ml-2 text-sm font-medium text-gray-100">
                        ₹10000-₹50000
                        </label>
                    </li>
                    <li className="cursor-pointer flex items-center">
                        <input type="radio" 
                        checked={selectedRadio && selectedRadio.min===50000 && selectedRadio.max===100000}
                        onChange={()=>handleRadioCheck(50000,100000)}
                        className="w-4 h-4 border-gray-300 rounded text-white focus:ring-pink-500 focus:ring-2" />

                        <label className="ml-2 text-sm font-medium text-gray-100">
                        ₹50000-₹100000
                        </label>
                    </li>
                    <li className="cursor-pointer flex items-center">
                        <input type="radio" 
                        checked={selectedRadio && selectedRadio.min===100000 && selectedRadio.max===200000}
                        onChange={()=>handleRadioCheck(100000,200000)}
                        className="w-4 h-4 border-gray-300 rounded text-white focus:ring-pink-500 focus:ring-2" />

                        <label className="ml-2 text-sm font-medium text-gray-100">
                        ₹1000000-₹200000
                        </label>
                    </li>
                </ul>
                <div className="flex justify-between mb-4">
                    <button 
                    onClick={applyFilter}
                    className="bg-pink-600 rounded-md hover:bg-pink-700 text-white p-1 px-2 shadow-sm focus:border-pink-500">
                        Apply
                    </button>
                    <button
                    onClick={handleReset} 
                    className="bg-gray-500 rounded-md hover:bg-gray-700 text-white p-1 px-2 shadow-sm">
                        Reset
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FilterComponent