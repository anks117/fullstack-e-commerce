import { useEffect } from "react";
import { useDeleteUsersMutation, useGetUserDetailsQuery, useGetUsersQuery } from "../../redux/api/userApiSlice"
import Loader from "../../components/Loader";
import { FaCheck, FaTrash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";


const Userlist = () => {

  const [deleteUsers]=useDeleteUsersMutation();
  const {data:users,refetch,isLoading,error} =useGetUsersQuery();


  const deleteHandler=async(userId)=>{
    if(window.confirm("Are you sure? you want to delete the user")){

      try {
        await deleteUsers(userId);
      } catch (error) {
        toast.error(error.data.message || error.error)
      }
    }
    
  }

  useEffect(()=>{
    refetch();
  },[refetch])
  return (
    <div className="pl-[5rem] flex justify-center">
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 flex justify-center">
        Users
      </h1>
      <br />
      {isLoading ?<Loader />:(
        <div className="felx flex-col md:flex-row">
          {/* Admin menu */}
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Id</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Admin</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user)=>{
                return(
                  <tr key={user._id}>
                  <td className="px-4 py-2 text-left">{user._id}</td>
                  <td className="px-4 py-2 text-left">{user.username}</td>
                  <td className="px-4 py-2 text-left">{user.email}</td>
                  <td className="px-4 py-2 text-left">{user.isAdmin?<FaCheck style={{color:'green'}}/>:<RxCross1 style={{color:"red"}}/> } </td>
                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button onClick={()=>deleteHandler(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold rounded">
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
                )
                
              })}
            </tbody>

          </table>

        </div>
      )}
    </div>
    </div>
  )
}

export default Userlist