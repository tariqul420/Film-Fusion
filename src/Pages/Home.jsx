import { useLoaderData } from "react-router-dom";
import Banner from "../Components/Home/Banner";
import MovieCart from "../Components/Others/MovieCart";

const Home = () => {
    const moviesData = useLoaderData()

    return (
        <div>
            <Banner />

            <div className="w-10/12 mx-auto mb-20">
                <h2 className="text-6xl font-bold text-center">Featured Movies</h2>

                <div className="grid grid-cols-3 gap-8 mt-20">
                    {
                        moviesData.map(movie => <MovieCart key={movie._id} movie={movie} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;