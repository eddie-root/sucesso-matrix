import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'


const App = () => {
  
  const isAdminPath = useLocation().pathname.includes('admin')

  return (
    <div className='min-h-screen text-deafault text-gray-700 bg-white'>

      {isAdminPath ? null : <Navbar />}

      <Toaster />
      
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='contact' element={<Contact />} />  
        </Routes>
      </div>

      {!isAdminPath && <Footer />}
      
    </div>
  )
}

export default App
