import { useEffect, useState } from "react";
import MovieCart from "../Components/Others/MovieCart";
import { useLoaderData } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const AllMovies = () => {
    const allMovie = useLoaderData()
    const [movie, setMovie] = useState(allMovie)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch(`https://film-fusion-0.vercel.app/movies?movie=${search}`)
            .then(res => res.json())
            .then(data => {
                setMovie(data)
            })
    }, [search])

    return (
        <div className="w-10/12 mx-auto my-12">
            <div className='w-full relative flex-1'>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type='text'
                    placeholder='Search movie'
                    className='border border-[#e5eaf2] py-3 pl-4 pr-[65px] outline-none w-full rounded-md bg-gray-700 font-semibold' />

                <span
                    className='bg-gray-300 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 group'><IoSearch
                        className='text-[1.3rem]  group-hover:text-gray-200' /></span>
            </div>

            <h2 className="font-bold text-6xl text-center mt-12">All Movies</h2>

            <div className="grid grid-cols-3 gap-8 mt-20">
                {
                    movie.map(movie => <MovieCart key={movie._id} movie={movie} />)
                }
            </div>
        </div>
    );
};

export default AllMovies;