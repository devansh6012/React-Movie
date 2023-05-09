import React, { useEffect, useState } from 'react'
import Image from '../Banner.jpg'
import axios from 'axios'

const Banner = () => {

  const [movie,setMovie] = useState({});

  useEffect(function () {
    axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=a16cf5e2890517a8795ae140aa296ecb&page=1').then((res) =>
      setMovie(res.data.results[0])
    )
  },[])

  return (
    <>
      <div className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] h-[40vh] md:h-[60vh] bg-center bg-cover flex items-end`}>
        <div className='text-xl md:text-3xl text-white p-4 bg-gray-900 w-full flex justify-center bg-opacity-50'>{movie.title}</div>
      </div>
    </>
  )
}

export default Banner