import { useEffect, useState } from "react";
import {  useCreateProductMutation, useDeleteProductMutation, useFetchAllProductsQuery, useUpdateProductMutation } from "../../redux/api/productApiSlice";
import { FiPlusCircle } from "react-icons/fi";
import CreateModal from "../../components/CreateModal";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApiSlice";
import { ToastContainer, toast } from "react-toastify";
import EditModal from "../../components/EditModal";


const Productlist = () => {
    const { data: allProducts, refetch: refetchAllProducts } = useFetchAllProductsQuery();
    
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [deleteApiCall] = useDeleteProductMutation();
    const [updateApiCall] = useUpdateProductMutation();

    const {data:categories}=useGetAllCategoryQuery(); 
    const [createProductApiCall] = useCreateProductMutation();


    // creating product.......................................
    const[name,setName]=useState('');
    const[brand,setBrand]=useState('');
    const[price,setPrice]=useState('');
    const[description,setDescription]=useState('');
    const[quantity,setQunatity]=useState('');
    const[category,setCategory]=useState('');
    const[stock,setStock]=useState('');
    const[image,setImage]=useState('');

    // updating product.......................................
    const[updateName,setUpdateName]=useState('');
    const[updateBrand,setUpdateBrand]=useState('');
    const[updatePrice,setUpdatePrice]=useState('');
    const[updateDescription,setUpdateDescription]=useState('');
    const[updateQuantity,setUpdateQunatity]=useState('');
    const[updateCategory,setUpdateCategory]=useState('');
    const[updateStock,setUpdateStock]=useState('');
    const[updateImage,setUpdateImage]=useState('');

    const[productId,setProductId]=useState('')

    const updateProduct=async(id)=>{
        
        switch (true) {
            case (!updateName):
                toast.error("name is missing")
                return;
            case (!updateBrand):
                toast.error("brand is missing")
                return;
            case (!updatePrice):
                toast.error("price is missing")
                return;
            case (!updateDescription):
                toast.error("description is missing")
                return;
            case(!updateStock):
                toast.error("sotck is missing")
                return;
            case(!updateImage):
                toast.error("image is missing")
                return;
            case (!updateCategory):
                toast.error("category is missing")
                return;
            case (!updateQuantity):
                toast.error("quantity is missing")
                return;
        }

        const updatedProduct={
            name:updateName,
            brand:updateBrand,
            category:updateCategory,
            description:updateDescription,
            image:updateImage,
            price:updatePrice,
            quantity:updateQuantity,
            countInStock:updateStock
        }

        try {
            await updateApiCall({productid:id,updatedProduct}).unwrap();
            toast.success("Product updated ");
            setUpdateBrand('');
            setUpdateCategory('');
            setUpdateDescription('');
            setUpdateStock('');
            setUpdateName('');
            setUpdatePrice('');
            setUpdateQunatity('');
            setUpdateImage('');
            setShowEditModal(false);
            refetchAllProducts();

        } catch (error) {
            toast.error("updation failed")
        }
    }

    const addProduct=async(e)=>{
        e.preventDefault();
        switch (true) {
            case (!name):
                toast.error("name is missing")
                return;
            case (!brand):
                toast.error("brand is missing")
                return;
            case (!price):
                toast.error("price is missing")
                return;
            case (!description):
                toast.error("description is missing")
                return;
            case(!stock):
                toast.error("sotck is missing")
                return;
            case(!image):
                toast.error("image is missing")
                return;
            case (!category):
                toast.error("category is missing")
                return;
            case (!quantity):
                toast.error("quantity is missing")
                return;
        }
        try {
            await createProductApiCall({
                name:name,
                brand:brand,
                quantity:quantity,
                price:price,
                description:description,
                category:category,
                image:image,
                countInStock:stock}).unwrap()
            toast.success("Product created");
            setBrand('');
            setCategory('');
            setDescription('');
            setStock('');
            setName('');
            setPrice('');
            setQunatity('');
            setImage('');
            setShowCreateModal(false);
            refetchAllProducts();

        } catch (error) {
            toast.error(error)
        }

    }

    const handleDelete=async(productid)=>{
        try {
            await deleteApiCall(productid).unwrap();
            toast.warning('Product deleted successfully');
            refetchAllProducts();
            setUpdateBrand('');
            setUpdateCategory('');
            setUpdateDescription('');
            setUpdateStock('');
            setUpdateName('');
            setUpdatePrice('');
            setUpdateQunatity('');
            setUpdateImage('');
            setShowEditModal(false);

        } catch (error) {
            toast.error("Deletion failed")
        }
    }

    const handletoggleCreateModal=()=>{
      console.log('handletoggleCreateModal clicked');
      setShowCreateModal(true);
      setShowEditModal(false);
    }


    const handleToggleEditModal=(product)=>{
        console.log(product.category._id)
        setShowEditModal(true);
        setShowCreateModal(false);
        setUpdateBrand(product.brand);
        setUpdateCategory(product.category._id);
        setUpdateDescription(product.description);
        setUpdateStock(product.countInStock);
        setUpdateName(product.name);
        setUpdatePrice(product.price);
        setUpdateQunatity(product.quantity);
        setUpdateImage(product.image);
        setProductId(product._id);

    }

    useEffect(() => {
        refetchAllProducts();
    }, []);

    return (
        <div>
            <ToastContainer />
            <div className="p-4  relative">
                <div className="flex justify-between items-center m-4">
                    <h1 className="text-2xl font-semibold flex justify-center">
                        Product list
                    </h1>
                    <button
                        onClick={handletoggleCreateModal}
                        className="p-2 m-4 bg-green-700 text-white rounded"
                    >
                        <div className="flex justify-around align-middle"><FiPlusCircle className="mt-1"/> New</div>
                        
                    </button>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-100 ">
                        <thead className="text-xs text-pink-600 uppercase ">
                            <tr>
                                <th scope="col" className="px-6 py-3">Product</th>
                                <th scope="col" className="px-6 py-3">Brand</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProducts?.length > 0 && allProducts.map((product) => (
                                <tr key={product._id} className=" border-b  hover:bg-pink-500 ">
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-100 whitespace-nowrap">
                                       <img className="w-10 h-10 object-cover" src={product.image} alt={product.name} />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{product.name}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{product.brand}</td>
                                    <td className="px-6 py-4">{product.category?.name}</td>
                                    <td className="px-6 py-4">{product.price}</td>
                                    <td className="px-6 py-4">{product.countInStock}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleToggleEditModal(product)}
                                            className="font-medium text-blue-600  hover:cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
                <CreateModal 
                showCreateModal={showCreateModal} 
                setShowCreateModal={setShowCreateModal} 
                categories={categories || []}
                addProduct={addProduct}
                name={name}
                setName={setName}
                brand={brand}
                setBrand={setBrand}
                quantity={quantity}
                setQunatity={setQunatity}
                price={price}
                setPrice={setPrice}
                image={image}
                setImage={setImage}
                description={description}
                setDescription={setDescription}
                stock={stock}
                setStock={setStock}
                category={category}
                setCategory={setCategory}
                />

                <EditModal
                categories={categories}
                updateProduct={updateProduct}
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                updateName={updateName}
                setUpdateName={setUpdateName}
                updateBrand={updateBrand}
                setUpdateBrand={setUpdateBrand} 
                updateCategory={updateCategory}
                setUpdateCategory={setUpdateCategory}
                updatePrice={updatePrice}
                setUpdatePrice={setUpdatePrice}
                updateImage={updateImage}
                setUpdateImage={setUpdateImage}
                updateStock={updateStock}
                setUpdateStock={setUpdateStock}
                updateQuantity={updateQuantity}
                setUpdateQuantity={setUpdateQunatity}
                updateDescription={updateDescription}
                setUpdateDescription={setUpdateDescription}
                productId={productId}
                handleDelete={handleDelete}
                 />
                
            </div>
        </div>
    );
}

export default Productlist;
