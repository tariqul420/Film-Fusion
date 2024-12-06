import { useEffect, useState } from "react";
import MovieCart from "../Components/Others/MovieCart";
import { useLoaderData } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { ScaleLoader } from "react-spinners";

const AllMovies = () => {
    const allMovie = useLoaderData()
    const [movie, setMovie] = useState(allMovie)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = 'All Movie | Film Fusion';
        if (movie) setLoading(false)

        fetch(`https://film-fusion-0.vercel.app/movies?movie=${search}`)
            .then(res => res.json())
            .then(data => {
                setMovie(data)
            })
    }, [movie, search])

    if (loading) {
        return (
            <div className="min-w-screen flex items-center justify-center my-12">
                <ScaleLoader height={60} margin={2} width={5} color="#3B82F6" />
            </div>
        );
    }

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

            <h2 className="font-bold max-sm:text-5xl text-6xl text-center mt-12">All Movies</h2>


            {
                movie.length === 0 ? (
                    <div
                        className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl bg-gray-700 mt-12">
                        <img src="https://i.ibb.co/cgfgxGH/Illustrations.png" alt="empty/image" className="w-full sm:w-[200px]" />

                        <h1 className="text-[3rem] mt-6 font-[500]">Result Not Found</h1>

                        <p className="text-[0.9rem] text-gray-300">Whoops ... this information is not available for a moment</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
                        {
                            movie.map(movie => <MovieCart key={movie._id} movie={movie} />)
                        }
                    </div>
                )
            }
        </div>
    );
};

export default AllMovies;