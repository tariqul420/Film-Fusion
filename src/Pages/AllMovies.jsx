import MovieCart from "../Components/Others/MovieCart";
import { useLoaderData } from "react-router-dom";

const AllMovies = () => {
    const allMovie = useLoaderData()
    console.log(allMovie);

    return (
        <div className="w-10/12 mx-auto my-12">
            <h2 className="font-bold text-6xl text-center">All Movies</h2>

            <div className="grid grid-cols-3 gap-8 mt-20">
                {
                    allMovie.map(movie => <MovieCart key={movie._id} movie={movie} />)
                }
            </div>
        </div>
    );
};

export default AllMovies;