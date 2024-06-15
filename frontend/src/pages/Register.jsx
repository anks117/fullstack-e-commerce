import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify";
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
    <div className=" bg-center min-h-screen flex items-center justify-center " style={{ backgroundImage: 'url("https://images.pexels.com/photos/11396009/pexels-photo-11396009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}>
      <div className="absolute bg-black opacity-50 backdrop-filter backdrop-blur-lg"></div>
        
    <div className=' flex justify-center'>
        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 rounded-lg mr-[4rem] mt-[5rem] p-6 ">
            <h1 className='text-2xl font-semibold mb-4'>
                Sign-up
            </h1>

            <form onSubmit={handleSubmit} className='container w-[20rem]'>
            <div className='my-[2rem]'>
                    <label htmlFor="name" className='block text-sm font-medium text-white'>
                        First Name
                    </label>
                    <input type="text" placeholder='name' className='mt-1 p-2 border rounded w-full' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className='my-[2rem]'>
                    <label htmlFor="email" className='block text-sm font-medium text-white'>
                        Email
                    </label>
                    <input type="email" placeholder='email' className='mt-1 p-2 border rounded w-full' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='my-[2rem]'>
                    <label htmlFor="password" className='block text-sm font-medium text-white'>
                        Password
                    </label>
                    <input type="password" placeholder='password' className='mt-1 p-2 border rounded w-full'
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <button  disabled={isLoading}
              type="submit"
              className="bg-pink-700 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
                     {isLoading ? "Registering..." : "Register"}
                </button>
                {isLoading && <Loader />}
            </form>

            <div className="mt-4">
            <p className="text-white">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-pink-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>


    </div>
    </div>
  )
}

export default Register