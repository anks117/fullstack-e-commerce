import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import { useSignupMutation } from "../redux/api/userApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import Loader from "../components/Loader";



const Register = () => {

    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [signup,{isLoading}]=useSignupMutation()
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res=await signup({username,email,password}).unwrap()
            dispatch(setCredentials({...res}));
            toast.success('signed-up successfully')
            navigate('/');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

  return (
    <div className="bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://images.pexels.com/photos/11396009/pexels-photo-11396009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}}>
      <ToastContainer />
    <div className="h-screen flex justify-center items-center">
        <div className="bg-white bg-opacity-10 backdrop-blur-md mx-4 p-8 rounded-md shadow-md w-full md:w-1/2 lg:w-1/3">
            <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block font-semibold text-gray-100 mb-2" >
                        Username
                    </label>
                    <input
                      onChange={(e)=>setUsername(e.target.value)}
                      value={username}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="text" placeholder="Enter your name" />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-100 mb-2" >
                        Email Address
                    </label>
                    <input
                      onChange={(e)=>setEmail(e.target.value)}
                      value={email}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" placeholder="Enter your email address" />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold text-gray-100 mb-2">
                        Password
                    </label>
                    <input
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="Enter your password" />
                    <span className="text-gray-600 hover:text-gray-800">Already have an account? <Link to={'/login'} className='text-pink-600'>Login</Link></span>
                </div>
                <div className="mb-6">
                  {isLoading?<Loader/>:<button
                        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Login
                    </button>}
                    
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default Register