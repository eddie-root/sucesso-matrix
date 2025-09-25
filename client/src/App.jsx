import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'


const App = () => {
  

  return (
    <div className='min-h-screen text-deafault text-gray-700 bg-white'>

      <Navbar /> 
      
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='contact' element={<Contact />} />       
        </Routes>
      </div>

      <Footer />
      
    </div>
  )
}

export default App
