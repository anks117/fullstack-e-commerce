
const Modal = ({ showModal, updateName, selectedCategory, setUpdateName, setShowModal, deleteHandler, updateHandler }) => {
    if (!showModal) return null;
    
    return (
      <div id="popup-modal" 
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto bg-black bg-opacity-50">
        <div className="relative w-full max-w-md p-4">
          <div className="relative bg-gray-700 rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className=" p-4 md:p-5 text-center">
              <input
                type="text"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                className="mt-8 bg-zinc-900 border border-pink-700 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-700 block w-full p-2.5 dark:bg-pink-700 dark:border-pink-600 dark:placeholder-pink-400 dark:text-white focus:ring-pink-700 focus:border-pink-700"
                placeholder="Update category name"
                required
              />
              <div className="mt-4 flex justify-center space-x-3">
                <button
                  onClick={updateHandler}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteHandler(selectedCategory)}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-red-800 rounded-lg border border-red-500 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-red-500 dark:border-gray-600 dark:hover:text-white dark:hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Modal;
  