import { useEffect } from "react";

const CreateModal = ({
    setShowCreateModal, 
    showCreateModal, 
    categories, 
    addProduct,
    name,
    setName,
    brand,
    setBrand,
    quantity,
    setQunatity,
    description,
    setDescription,
    price,
    setPrice,
    image,
    setImage,
    category,
    setCategory,
    stock,
    setStock
}) => {

    useEffect(() => {
        if (!Array.isArray(categories)) {
          categories = [];
        }
      }, [categories]);

    if(!showCreateModal){
        return null;
    }

  return (
    
    <div>

{/* <!-- Main modal --> */}
<div id="crud-modal"  
aria-hidden={!showCreateModal} 
className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center">
    <div className="relative p-4 w-full max-w-md max-h-full">

        {/* <!-- Modal content --> */}
        <div className="relative bg-zinc-900
         rounded-lg shadow dark:bg-gray-700">

            {/* <!-- Modal header --> */}

            <div className="bg-pink-600 flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-100 dark:text-white">
                    Create New Product
                </h3>
                <button 
                onClick={()=>setShowCreateModal(false)}
                type="button" 
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    
                </button>
            </div>


            {/* <!-- Modal body --> */}

            <form
            onSubmit={addProduct}
             className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label  className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Name</label>

                        <input 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        type="text" 
                        name="name" 
                        id="name" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />

                    </div>

                    
                    <div className="col-span-2">
                        <label  className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Brand</label>

                        <input 
                        value={brand}
                        onChange={(e)=>setBrand(e.target.value)}
                        type="text" 
                        name="name" 
                        id="name" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type brand name" required />

                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Stock</label>

                        <input
                        value={stock}
                        onChange={(e)=>setStock(e.target.value)}
                        type="number" 
                        name="brand" 
                        
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="Brand name" required />

                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Quantity</label>

                        <input
                        value={quantity}
                        onChange={(e)=>setQunatity(e.target.value)} 
                        type="number" 
                        name="price" 
                        id="price" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                        placeholder="100" required />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Price</label>
                        <input 
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                        type="number" 
                        name="price" 
                        id="price" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />

                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>

                        <select
                        onChange={(e)=>setCategory(e.target.value)}
                        placeholder="select category"  
                        className="bg-zinc-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5
                        ">
                            
                            {Array.isArray(categories) && categories.map((c)=>{
                                return(
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                )
                            })}
                            
                        </select>
                        
                    </div>

                    <div className="col-span-2">
                        <label  className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">image Url</label>

                        <input 
                        value={image}
                        onChange={(e)=>setImage(e.target.value)}
                        type="text"  
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type imageUrl" required />

                    </div>

                    <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Product Description</label>

                        <textarea
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)} 
                        id="description" 
                        rows="4" 
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>      
                                      
                    </div>
                </div>
                <button 
                type="submit" 
                className="text-white inline-flex items-center bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" ></path></svg>
                    Add new product
                </button>
            </form>
        </div>
    </div>
</div> 

    </div>
  )
}

export default CreateModal