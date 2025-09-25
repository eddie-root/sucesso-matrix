import React from 'react'
import { categories } from '../assets/assets'
import { Link } from 'react-router-dom'

const Categories = () => {

  return (
    <div className='mt-10'>
      <p className='text-2xl md:text-3xl font-medium'> Categories</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-7 mt-6 gap-6'>
        {categories.map((category, index)=> {
            return (
                <Link key={index} className='flex flex-col items-center gap-2' >
                    <img src={category.image} alt={category.text} className='w-24 h-24 object-cover rounded-full' />
                    <p className='text-center'>{category.text}</p>
                </Link>
            )
        })}
      </div>
    </div>
  )
}

export default Categories
