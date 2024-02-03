import React, { useEffect, useState } from 'react'
import Image from '../Banner.jpg'
import axios from 'axios'
import { Oval } from 'react-loader-spinner';
import Pagination from './Pagination';

const Movies = () => {

    const [movies,setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hover, setHover] = useState('');
    const [favourites, setFavourites] = useState([]);

    function goAhead() {
        setPage(page + 1);
    }

    function goBack() {
        if(page > 1){
            setPage(page - 1);
        }
    }

    useEffect(function(){
        let oldFav = localStorage.getItem("imdb")
        oldFav = JSON.parse(oldFav) || []
        setFavourites([...oldFav])
        
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=a16cf5e2890517a8795ae140aa296ecb&page=${page}`).then((res) => {
            setMovies(res.data.results);
        }
        )
    },[page])

    let add = (movie) => {
        let newArray = [...favourites, movie]
        setFavourites([...newArray]);
        localStorage.setItem("imdb", JSON.stringify(newArray))
    }

    let del = (movie) => {
        let newArray = favourites.filter((m) => m.id != movie.id)
        setFavourites([...newArray])
        localStorage.setItem("imdb", JSON.stringify(newArray))
    }


    return (
        <>
            <div className='mb-8 text-center'>
                <div className='mt-8 mb-8 font-bold text-2xl text-center'>Trending Movies</div>

                {movies.length == 0 ? 

                <div className='flex justify-center'>
                    <Oval
                    height="80"
                    width="80"
                    radius="9"
                    color="grey"
                    secondaryColor='grey'
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                    />
                </div>
                
                :

                
                <div className='flex flex-wrap justify-center'>

                    {
                        movies.map((movie) => (
                            <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] md:h-[30vh] md:w-[250px] h-[25vh] w-[150px] bg-center bg-cover flex items-end m-4 hover:scale-110 ease-out duration-300 relative`} onMouseEnter={() => setHover(movie.id)} onMouseLeave={() => setHover('')}>
                                {
                                    hover == movie.id && 
                                    <>
                                    {
                                        favourites.find((m) => m.id == movie.id) ? 
                                        <div className='absolute top-2 right-2 p-2 bg-gray-800 text-xl cursor-pointer' onClick={() => del(movie)}>❌</div>
                                        :
                                        <div className='absolute top-2 right-2 p-2 bg-gray-800 text-xl cursor-pointer' onClick={() => add(movie)}>👍</div>
                                    }
                                    </>
                                }
                                <div className='w-full bg-gray-900 text-white py-2 text-center font-bold'>{movie.title || movie.name}</div>
                            </div>
                        ))
                    }
            
                </div>

                }
            </div>

            <Pagination pageProp={page} goBack={goBack} goAhead={goAhead}/>
        </>
    )
}

export default Movies
