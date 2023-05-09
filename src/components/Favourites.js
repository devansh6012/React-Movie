import React, { useEffect, useState } from 'react'
// import Pagination from './Pagination'
import axios from 'axios';

const Favourites = () => {

  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation', 35: 'Comedy',
    80: 'Crime', 99: 'Documentary',
    18: 'Drama', 10751: 'Family',
    14: 'Fantasy', 36: 'History',
    27: 'Horror',
    10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller',
    10752: 'War',
    37: 'Western'
  }

  const [curGenre, setCurGenre] = useState('All Genres');
  const [favourites, setFavourites] = useState([]);
  const [genres, setGenres] = useState([])
  const [rating, setRating] = useState(0)
  const [popularity, setPopularity] = useState(0)
  const [search, setSearch] = useState("")

  useEffect(() => {
    let oldFav = localStorage.getItem("imdb")
    oldFav = JSON.parse(oldFav) || []
    setFavourites([...oldFav])

  }, [])

  useEffect(() => {
    let temp = favourites.map((movie) => genreids[movie.genre_ids[0]])
    temp = new Set(temp)
    setGenres(["All Genres", ...temp])
  }, [favourites])

  let del = (movie) => {
    let newArray = favourites.filter((m) => m.id != movie.id)
    setFavourites([...newArray])
    localStorage.setItem("imdb", JSON.stringify(newArray))
  }

  let filteredMovies = []

  filteredMovies = curGenre == "All Genres" ? favourites : favourites.filter((movie) => genreids[movie.genre_ids[0]] == curGenre)

  // Sorting rating
  if (rating == 1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average
    })
  } else if (rating == -1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average
    })
  }


  // Sorting Popularity
  if (popularity == 1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objA.popularity - objB.popularity
    })
  } else if (popularity == -1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objB.popularity - objA.popularity
    })
  }

  // Searching
  filteredMovies = filteredMovies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div className={'mt-4 px-2 flex justify-center flex-wrap space-x-2'}>
        {
          genres.map((genre) =>
            <button className={curGenre == genre ? 'm-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold' : 'm-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold'} onClick={() => setCurGenre(genre)}>
              {genre}
            </button>
          )
        }
      </div>

      <div className='text-center'>
        <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='border border-2 text-center p-1 m-2' />
      </div>


      <div className="flex flex-col m-4">
        <div className="-my-2 overflow-x-uto sm:-mx-6 lg:-mx-8">
          <div className="align-middle inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 min-w-full">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className='flex'>
                        <div className='mr-2 cursor-pointer' onClick={() => {
                          setPopularity(0)
                          setRating(-1)
                        }}>
                          <i className="fa-solid fa-sort-up" />
                        </div>
                        Rating
                        <div className='ml-2 cursor-pointer' onClick={() => {
                          setPopularity(0)
                          setRating(1)
                        }}>
                          <i className="fa-solid fa-sort-down" />
                        </div>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className='flex'>
                        <div className='mr-2 cursor-pointer'>
                          <i className="fa-solid fa-sort-up" onClick={() => {
                            setRating(0)
                            setPopularity(-1)
                          }} />
                        </div>
                        Popularity
                        <div className='ml-2 cursor-pointer' onClick={() => {
                          setRating(0)
                          setPopularity(1)
                        }}>
                          <i className="fa-solid fa-sort-down" />
                        </div>

                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remove</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {
                    filteredMovies.map((movie) => (

                      <tr key={movie.id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className='flex items-center'>
                            <div className='flex-shrink-0 md:h-[100px] md:w-[180px]'>
                              <img className='hidden md:block md:h-[100px] md:w-[180px]' src={`https://image.tmdb.org/t/p/original/t/p/original/${movie.poster_path}`} alt='' />
                            </div>
                            <div className='ml-4'>
                              <div className='text-sm font-medium text-gray-900 font-bold'>
                                {movie.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className='text-sm text-gray-900'>
                            {movie.vote_average.toFixed(2)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className='text-sm text-gray-900'>
                            {movie.popularity.toFixed(2)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                            {genreids[movie.genre_ids[0]]}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-center">
                          <button href="#" className='text-red-600 hover:text-red-900' onClick={() => del(movie)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='mt-4'>
        <Pagination />
      </div> */}
    </>
  )
}

export default Favourites