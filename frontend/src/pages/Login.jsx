import  { useState } from 'react'
import { useLoginMutation } from '../redux/api/userApiSlice';
import { useDispatch} from 'react-redux';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom'
import { setCredentials } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');

    const [login,{isLoading}] = useLoginMutation()
    
    const dispatch=useDispatch()
    const navigate=useNavigate();
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const res=await login({email,password}).unwrap()
            if(res){
              dispatch(setCredentials({...res}))
              toast.success('logged-in successfully')
              navigate('/');
            }else{
              toast.error('you dont have an account');
            }
            
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
                Sign-in
            </h1>

            <form onSubmit={handleSubmit} className='container w-[20rem]'>
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
                     {isLoading ? "Signing In..." : "Sign In"}
                </button>
                {isLoading && <Loader />}
            </form>

            <div className="mt-4">
            <p className="text-white">
              Dont have an account?{" "}
              <Link
                to={"/register"}
                className="text-pink-700 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
    </div>
    </div>
  
  )
}

export default Login