
const ReviewModal = ({
    showReviewModal,
    setShowReviewModal,
    setComment,
    setRating,
    rating,
    comment,
    addReviewProd}) => {

    const addReview=(e)=>{
        e.preventDefault();
        addReviewProd();
        console.log("clicked")
    }
  return (
        <div id="crud-modal"  
    aria-hidden={!showReviewModal} 
    className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center">
        <div className="relative p-4 w-full max-w-md max-h-full">

            {/* <!-- Modal content --> */}
            <div className="relative bg-zinc-900
            rounded-lg shadow dark:bg-gray-700">

                {/* <!-- Modal header --> */}

                <div className="bg-pink-600 flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-100 dark:text-white">
                        Review this Product
                    </h3>
                    <button 
                    onClick={()=>setShowReviewModal(false)}
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
                onSubmit={addReview}
                className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label  className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Rating <span className="text-sm text-gray-300">(out of 5)</span></label>

                            <input 
                            value={rating}
                            onChange={(e)=>setRating(e.target.value)}
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="rate out of 5" required />

                        </div>

                    
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-100 dark:text-white">Your Review</label>

                            <textarea
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)} 
                            
                            rows="4" 
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500" placeholder="Write product description here"></textarea>      
                                        
                        </div>
                    </div>
                    <button 
                    type="submit" 
                    className="text-white inline-flex items-center bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" ></path></svg>
                        Add review
                    </button>
                </form>
            </div>
        </div>
        </div> 
  )
}

export default ReviewModal