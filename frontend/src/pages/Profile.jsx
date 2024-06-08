import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { useProfileMutation } from "../redux/api/userApiSlice";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import { setCredentials } from "../redux/features/auth/authSlice";
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const { userInfo } = useSelector((state) => state.auth);
  
    const [profile, { isLoading: loadingUpdateProfile }] =
      useProfileMutation();
      
  
    useEffect(() => {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }, [userInfo]);
  
    const dispatch = useDispatch();
  
    const submitHandler = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error('password dont match!');
        
      } else {
         try {
            console.log("update button clicked");
            const res = await profile({
               _id: userInfo._id,
               username,
               email,
               password,
            }).unwrap();
            console.log("reached after updating");
            dispatch(setCredentials({ ...res }));
            toast.success("Profile updated successfully");
         } catch (err) {
            console.error('Update profile error:', err);  // Log the full error
            toast.error(err?.data?.message || err.error);
         }
      }
   };
   
  
    return (
        <div>
            <ToastContainer />
      <div className="container p-4 mt-[5rem] ">
        <div className="flex justify-center align-center">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
            {loadingUpdateProfile? <Loader />:
              <form onSubmit={submitHandler}>
                <div className="mb-4">
                  <label className="block text-white mb-2">Name</label>
                  <input
                  type="text"
                  placeholder="Enter name"
                  className="form-input p-4 rounded-sm w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
  
              <div className="mb-4">
                <label className="block text-white mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-input p-4 rounded-sm w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
  
              <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-input p-4 rounded-sm w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
  
              <div className="mb-4">
                <label className="block text-white mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="form-input p-4 rounded-sm w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
  
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-pink-700 text-white py-2 px-4 rounded hover:bg-pink-600"
                >
                  Update
                </button>
  
                <Link
                  to="/user-orders"
                  className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
                >
                  My Orders
                </Link>
              </div>
              
            </form>
            }
            
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default Profile;