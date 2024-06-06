import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import AdminRoute from './pages/admin/AdminRoute'
import Userlist from './pages/admin/Userlist'
import Navigation from './components/Navigation'
import Categorylist from './pages/admin/Categorylist'
import Productlist from './pages/admin/Productlist'


function App() {
  

  return (
    <BrowserRouter>

    <div>

    <Navigation />
    <Routes>
      
      
      
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />} />
     

      {/* Protected routes  */}
      <Route element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />}/>
      </Route>

      {/* admin routes */}
      <Route  element={<AdminRoute />}>
        <Route path='/admin/userlist' element={<Userlist />}/>
        <Route path='/admin/category' element={<Categorylist />}/>
        <Route path='/admin/productlist' element={<Productlist />} />
      </Route>

      
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
