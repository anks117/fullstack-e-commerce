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
import Favourite from './pages/Favourite'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'


function App() {
  

  return (
    <BrowserRouter>
    <div className="flex">

      <div className='md:w-60'>
        <Navigation />
      </div>
      
      
      <div className="flex-1 p-4">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/productdetail/:productId' element={<ProductDetail />} />

          {/* Protected routes  */}
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/favourite' element={<Favourite />}/>
            <Route path='/cart' element={<CartPage /> }/>
          </Route>

          {/* admin routes */}
          <Route element={<AdminRoute />}>
            <Route path='/admin/userlist' element={<Userlist />} />
            <Route path='/admin/category' element={<Categorylist />} />
            <Route path='/admin/productlist' element={<Productlist />} />
          </Route>
        </Routes>
      </div>
    </div>
  </BrowserRouter>
  )
}

export default App
