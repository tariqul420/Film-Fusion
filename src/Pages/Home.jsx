import { useLoaderData } from "react-router-dom";
import Banner from "../Components/Home/Banner";
import MovieCart from "../Components/Others/MovieCart";
import { useState } from "react";

const Home = () => {
    const moviesData = useLoaderData()
    const [movies, setMovies] = useState(moviesData)

    return (
        <div>
            <Banner />

            <div className="w-11/12 mx-auto">
                <h2 className="text-6xl font-bold text-center">Featured Movies</h2>

                <div className="grid grid-cols-3 gap-8 mt-20">
                    {
                        movies.map(movie => <MovieCart key={movie._id} movie={movie} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;