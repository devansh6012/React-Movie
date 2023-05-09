import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='px-8 flex space-x-8 items-center py-4'>
        <Link to='/' className='text-blue-400 font-bold text-xl md:text-3xl'>Movies</Link>
        <Link to='favourites' className='text-blue-400 font-bold text-xl md:text-3xl'>Favourites</Link>
    </div>
  )
}

export default Navbar