import { Link, useLoaderData } from "react-router-dom";
import Banner from "../Components/Home/Banner";
import MovieCart from "../Components/Others/MovieCart";
import Upcoming from "../Components/Home/Upcoming";
import { useState } from "react";
import Slider from "react-slick";

const Home = () => {
    const { allMovieData, upcomingData, horrorData } = useLoaderData()
    const [upcoming, setUpcoming] = useState(upcomingData)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        centerMode: true,
        centerPadding: "0px",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

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

            <div className="w-10/12 mx-auto mb-20">
                <h2 className="text-6xl font-bold text-center">Movie Categories</h2>

                {
                    horrorData.length !== 0 && (
                        <div>
                            <h3 className="text-5xl font-semibold my-6 border-l-4 border-solid border-color-accent pl-4">Horror</h3>
                            <div className="slider-container mx-auto">
                                <Slider {...settings}>
                                    {horrorData.map((movie) => (
                                        <div key={movie._id} className="px-2">
                                            <MovieCart movie={movie} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )
                }

            </div>
        </section>
    );
};

export default Home;