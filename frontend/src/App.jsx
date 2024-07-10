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
import ShopPage from './pages/ShopPage'
import ShippingPage from './pages/ShippingPage'
import SummaryPage from './pages/SummaryPage'
import Order from './pages/Order'
import Myorders from './pages/Myorders'
import OrderPage from './pages/admin/OrderPage'
import Dashboards from './pages/admin/Dashboards'


function App() {
  

  return (
    <BrowserRouter>
    <div className="flex">
      
        <Navigation />
      
      <div className="flex-1 justify-center md:px-8">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/productdetail/:productId' element={<ProductDetail />} />
          <Route path='/shop' element={<ShopPage />}/>

          {/* Protected routes  */}
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/favourite' element={<Favourite />}/>
            <Route path='/cart' element={<CartPage /> }/>
            <Route path='/shipping' element={<ShippingPage />} />
            <Route path='/summary' element={<SummaryPage />}/>
            <Route path='/order/:orderId' element={<Order />}/>
            <Route path='/user-orders' element={<Myorders />}/>
          </Route>

          {/* admin routes */}
          <Route element={<AdminRoute />}>
            <Route path='/admin/userlist' element={<Userlist />} />
            <Route path='/admin/category' element={<Categorylist />} />
            <Route path='/admin/productlist' element={<Productlist />} />
            <Route path='/admin/orderlist' element={<OrderPage />}/>
            <Route path='/admin/dashboard' element={<Dashboards />}/>
          </Route>
        </Routes>
      </div>
    </div>
  </BrowserRouter>
  )
}

export default App
