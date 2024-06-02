
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AdminRoute = () => {

    const location=useLocation();
    const {userInfo}=useSelector(state=>state.auth);

  return userInfo && userInfo.isAdmin? (<Outlet />):<Navigate to="/login" state={{ from: location }} />;
  
}

export default AdminRoute