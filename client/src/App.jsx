import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useLocation } from 'react-router-dom'
import UIContext from './context/UIContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import AdminLogin from './components/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Product from './pages/Product'
import ProductDetails from './pages/ProductDetails'
import AdminLayout from './pages/admin/AdminLayout'
import AddProduct from './pages/Admin/AddProduct'
import ProductList from './pages/Admin/ProductList'
import AddClient from './pages/admin/AddClient'
import ListClient from './pages/admin/ListClient'
import ListOrder from './pages/admin/ListOrder'

const App = () => {
  
  const isAdminPath = useLocation().pathname.includes('admin')
  const { showUserLogin } = useContext(UIContext)
  
  return (
    <div className='min-h-screen text-deafault text-gray-700 bg-white'>

      {isAdminPath ? null : <Navbar />}
      { showUserLogin ? <Login /> : null }

      <Toaster />
      
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='contact' element={<Contact />} />
          <Route path='products' element={<Product />} />
          <Route path='products/:cod' element={<ProductDetails />} />
          <Route path='/admin/login' element={<AdminLogin />} />;
          <Route path='/admin' element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AddProduct />} />;
            <Route path='product-list' element={<ProductList />} />;
            <Route path='add-client' element={<AddClient />} />;
            <Route path='list-Client' element={<ListClient />} />;
            <Route path='list-orders' element={<ListOrder />} />;

          </Route>
        </Routes>
      </div>

      {!isAdminPath && <Footer />}
      
    </div>
  )
}

export default App
