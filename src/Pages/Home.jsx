import { Link, useLoaderData } from "react-router-dom";
import Banner from "../Components/Home/Banner";
import MovieCart from "../Components/Others/MovieCart";
import Upcoming from "../Components/Home/Upcoming";
import { useState } from "react";

const Home = () => {
    const { allMovieData, upcomingData } = useLoaderData()
    const [upcoming, setUpcoming] = useState(upcomingData)

    return (
        <section>
            <Banner />

            <div className="w-10/12 mx-auto mb-20">
                <h2 className="text-6xl font-bold text-center">Featured Movies</h2>

                {
                    allMovieData.length === 0 ? (
                        <div
                            className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl bg-gray-700 mt-12">
                            <img src="https://i.ibb.co/cgfgxGH/Illustrations.png" alt="empty/image" className="w-full sm:w-[200px]" />

                            <h1 className="text-[3rem] mt-6 font-[500]">Result Not Found</h1>

                            <p className="text-[0.9rem] text-gray-300">Whoops ... this information is not available for a moment</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
                            {
                                allMovieData.map(movie => <MovieCart key={movie._id} movie={movie} />)
                            }
                        </div>
                    )
                }

                <Link to='all-movies'>
                    <button className="border-2 px-5 py-2 rounded-full border-solid border-color-accent font-semibold text-lg bg-color-accent mt-12 block mx-auto">
                        See All Movies
                    </button>
                </Link>
            </div>


            <div className="w-10/12 mx-auto mb-20">
                <h2 className="text-6xl font-bold text-center">Upcoming Movies</h2>
                {
                    upcomingData.length == 0 ? (
                        <div
                            className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl bg-gray-700 mt-12">
                            <img src="https://i.ibb.co/cgfgxGH/Illustrations.png" alt="empty/image" className="w-full sm:w-[200px]" />

                            <h1 className="text-[3rem] mt-6 font-[500]">Result Not Found</h1>

                            <p className="text-[0.9rem] text-gray-300">Whoops ... this information is not available for a moment</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
                            {
                                upcoming.map(movie => <Upcoming key={movie._id} movie={movie} upcoming={upcoming} setUpcoming={setUpcoming} />)
                            }
                        </div>
                    )
                }
            </div>

            <div className="w-11/12 mx-auto mb-20">
                <h2 className="text-6xl font-bold text-center">Movie Categories</h2>
            </div>
        </section>
    );
};

export default Home;