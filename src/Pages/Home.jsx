import { Link, useLoaderData } from "react-router-dom";
import Banner from "../Components/Home/Banner";
import MovieCart from "../Components/Others/MovieCart";
import Upcoming from "../Components/Home/Upcoming";

const Home = () => {
    const { allMovieData, upcomingData } = useLoaderData()

    return (
        <div>
            <Banner />

            <div className="w-10/12 mx-auto mb-20">
                <h2 className="text-6xl font-bold text-center">Featured Movies</h2>

                <div className="grid grid-cols-3 gap-8 mt-20">
                    {
                        allMovieData.map(movie => <MovieCart key={movie._id} movie={movie} />)
                    }
                </div>

                <Link to='all-movies'>
                    <button className="border-2 px-5 py-2 rounded-full border-solid border-color-accent font-semibold text-lg bg-color-accent mt-12 block mx-auto">
                        See All Movies
                    </button>
                </Link>
            </div>

            <div className="w-10/12 mx-auto mb-20">
                <h2 className="text-6xl font-bold text-center">Upcoming Movies</h2>

                <div className="grid grid-cols-3 gap-8 mt-20">
                    {
                        upcomingData.map(movie => <Upcoming key={movie._id} movie={movie} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;