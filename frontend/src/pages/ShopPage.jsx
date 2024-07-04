import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import FilterComponent from "../components/FilterComponent";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCategoryQuery } from "../redux/api/categoryApiSlice";
import { useFetchBrandbyCategoryMutation, useFetchFilterdProductsMutation, useFetchInitialDataQuery } from "../redux/api/productApiSlice";
import { setBrands, setCategory, setChecked, setCheckedBrands, setProducts, setRadio } from "../redux/features/shop/shopSlice";
import ProductCard from "../components/ProductCard";

const ShopPage = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [page,setPage]=useState(1);

    const dispatch = useDispatch();
    const { category, radio, products, checked, brands, checkedBrands } = useSelector((state) => state.shop);
    

    const { data: allCategory } = useGetAllCategoryQuery();
    const [filterdProductApiCall] = useFetchFilterdProductsMutation();
    const {data}=useFetchInitialDataQuery();
    
    const[fetchBrandsbyCategoryApiCall]=useFetchBrandbyCategoryMutation();

   
    const fetchInitialData=()=>{
        if(data?.allProducts) {
            dispatch(setProducts(data?.allProducts));
        }
        if(data?.allBrands) {
            dispatch(setBrands(data?.allBrands));
        }
        if (allCategory) {
            dispatch(setCategory(allCategory));
        }
    }

    

    const applyFilter = async () => {
        try {
           const filterProducts = await filterdProductApiCall({ checked,checkedBrands, radio }).unwrap();
           dispatch(setProducts(filterProducts));
           console.log(filterProducts)
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleCheckedCategory =async (value,id) => {
        const updatedChecked= value?[...checked,id]:checked.filter((ch)=>ch!==id);
        dispatch(setChecked(updatedChecked));

        try {
            const updatedBrandandProductList=await fetchBrandsbyCategoryApiCall({checked:updatedChecked}).unwrap();
            dispatch(setBrands(updatedBrandandProductList?.filteredBrandbyCategory));
            dispatch(setProducts(updatedBrandandProductList?.filteredProductsByCategory))
            console.log(updatedBrandandProductList);
        } catch (error) {
            console.log({error:error});
        }

    };

    const handleBrandsCheckbox = (value,name) => {
        const updatedBrand =value?[...checkedBrands, name]: checkedBrands.filter((br) => br !== name)
        dispatch(setCheckedBrands(updatedBrand));
    };

    const handlePriceRadio = (min, max) => {
        dispatch(setRadio([min, max]));
    };

    const hanldePagination=(selectedPage)=>{
        if(selectedPage >=1 && selectedPage <=Math.ceil(products?.length/9) && selectedPage !==page) 
            setPage(selectedPage);
    }

    useEffect(()=>{
        fetchInitialData()
    },[data?.allProducts,data?.allBrands,allCategory,page])

    

    return (
        <div className="relative">
            <div className="flex justify-center">
                ShopPage
            </div>
            <div  className="flex justify-center flex-wrap">
            {products && products?.slice(page*9-9,9*page).map((tp)=>{
                return(
                    <div key={tp._id}>
                        <ProductCard tp={tp}/>
                    </div>
                )
            })}

                <div className="absolute top-7 right-5">
                    {showFilter ?
                        <MdCancel size={30} className="cursor-pointer text-pink-600 hover:text-pink-700" onClick={() => setShowFilter(false)} /> :
                        <FaFilter size={25} className="cursor-pointer text-pink-600 hover:text-pink-700" onClick={() => setShowFilter(true)} />
                    }
                </div>
            </div>
            
            <div className="absolute top-16 right-4">
                <FilterComponent showFilter={showFilter}
                    category={category}
                    handleBrandsCheckbox={handleBrandsCheckbox}
                    handleCheckedCategory={handleCheckedCategory}
                    handlePriceRadio={handlePriceRadio}
                    brands={brands}
                    applyFilter={applyFilter}
                />
            </div>
            <div className="flex justify-center">
            <nav aria-label="Page navigation">
                <ul className="flex items-center -space-x-px h-8 text-sm">
                    <li>
                    <button onClick={()=>hanldePagination(page-1)} 
                    className={`${page >1?"":"hidden"} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" d="M5 1 1 5l4 4"/>
                        </svg>
                    </button>
                    </li>

                    {products && [...Array(Math.ceil(products?.length/9))].map((_,i)=>{
                        return (
                            <li key={i}>
                                <button 
                                onClick={()=>hanldePagination(i+1)}
                                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-200 hover:bg-pink-300 hover:text-white ${page === i+1?"bg-pink-600 text-white":""}`}>{i+1}</button>
                            </li>
                        )
                    })}
                    
                   
                    <li>
                    <button 
                    onClick={()=>hanldePagination(page+1)}
                    className={ `${page <Math.ceil(products?.length/9)?"":"hidden"} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" d="m1 9 4-4-4-4"/>
                        </svg>
                    </button>
                    </li>
                    
                </ul>
            </nav>
            </div>
        </div>
    )
}

export default ShopPage;
