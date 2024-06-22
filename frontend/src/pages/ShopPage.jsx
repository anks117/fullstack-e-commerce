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

    useEffect(()=>{
        fetchInitialData()
    },[data?.allProducts,data?.allBrands,allCategory])



    return (
        <div className="relative">
            <div className="flex justify-center">
                ShopPage
            </div>
            <div  className="flex justify-center flex-wrap">
            {products && products?.map((tp)=>{
                return(
                    <div key={tp._id}>
                        <ProductCard tp={tp}/>
                    </div>
                )
            })}
            </div>
            <div className="absolute top-7 right-5">
                {showFilter ?
                    <MdCancel size={30} className="cursor-pointer text-pink-600 hover:text-pink-700" onClick={() => setShowFilter(false)} /> :
                    <FaFilter size={25} className="cursor-pointer text-pink-600 hover:text-pink-700" onClick={() => setShowFilter(true)} />
                }
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
        </div>
    )
}

export default ShopPage;
