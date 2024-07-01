import { useEffect, useState } from "react";
import { useGetAllCategoryQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../redux/api/categoryApiSlice";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../components/Modal";

const Categorylist = () => {
    const [name, setName] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [createCategoryApiCall] = useCreateCategoryMutation();
    const [deleteCategoryApiCall] = useDeleteCategoryMutation();
    const [updateCategoryApiCall] = useUpdateCategoryMutation();

    const { data: categories, refetch:refetchCategories } = useGetAllCategoryQuery();
   

    const deleteHandler = async (categoryId) => {
        console.log('Deleting category with ID:', categoryId._id); // Debug log
        try {
            await deleteCategoryApiCall( categoryId._id ).unwrap();
            toast.success('Category deleted successfully');
            setShowModal(false);
        } catch (error) {
            console.error('Delete error:', error); // Log the error
            toast.error('Deletion failed');
        }
    };

    const updateHandler = async () => {
        if (!updateName) {
            toast.error('Category name required');
            return;
        }

        try {
            await updateCategoryApiCall(
                { 
                    categoryId: selectedCategory._id, 
                    updatedCategory:{name: updateName} 
                }).unwrap();
            setUpdateName('');
            toast.success('Category name updated');
            setShowModal(false);
        } catch (error) {
            toast.error('Updation failed');
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('Category field required');
            return;
        }

        try {
            const res = await createCategoryApiCall({ name }).unwrap();
            setName('');
            toast.success(`${res.name} is added`);
        } catch (error) {
            toast.error('Creation failed');
        }
    };

    const handleCategoryClick = (category) => {
        setShowModal(true);
        setSelectedCategory(category);
        
    };

    useEffect(()=>{
        refetchCategories();
    },[deleteHandler,updateHandler,submitHandler])

    return (
        <div className="pl-[5rem] flex flex-col items-center">
            <ToastContainer />
            <div className="pt-4 w-full">
                <h1 className="text-2xl font-semibold mb-4 flex justify-center">
                    Category List
                </h1>

                <form onSubmit={submitHandler} className="max-w-sm mx-auto">
                    <div className="mt-[5rem] mb-5">
                        <label className="block mb-2 text-sm font-medium text-white dark:text-white">Category</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-zinc-900 border border-pink-700 text-white text-sm rounded-lg  focus:ring-pink-500  focus:border-pink-700 block w-full p-2.5"
                            placeholder="category name"
                            required
                        />
                    </div>
                    <button type="submit" className="text-white bg-pink-700 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                        Add Category
                    </button>
                </form>
                <br />
                <hr className="my-4 mx-80" />
            </div>
            <br />
            <div className="flex justify-center flex-wrap pt-4 w-full">
                {categories?.map((category) => (
                    <div className="mx-3" key={category._id}>
                        <button
                            onClick={() => handleCategoryClick(category)}
                            className="border border-pink-700 text-pink-700 py-2 px-2 rounded-lg hover:bg-pink-500 hover:text-white focus:outline-none"
                        >
                            {category.name}
                        </button>
                    </div>
                ))}
                <Modal
                    showModal={showModal}
                    selectedCategory={selectedCategory}
                    setShowModal={setShowModal}
                    setUpdateName={setUpdateName}
                    updateName={updateName}
                    deleteHandler={deleteHandler}
                    updateHandler={updateHandler}
                />
            </div>
        </div>
    );
};

export default Categorylist;
