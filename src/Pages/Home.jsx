import { Link } from "react-router-dom";
import Banner from "../Components/Home/Banner";
import MovieCart from "../Components/Others/MovieCart";
import Upcoming from "../Components/Home/Upcoming";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { ScaleLoader } from "react-spinners";

const Home = () => {
    // const { topMovieData, upcomingData, allMoviesData } = useLoaderData()
    const [loading, setLoading] = useState(true)

    const [topMovieData, setTopMovieData] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [allMoviesData, setAllMoviesData] = useState([])

    const [romanceData, setRomanceData] = useState([]);
    const [actionData, setActionData] = useState([]);
    const [dramaData, setDramaData] = useState([]);
    const [comedyData, setComedyData] = useState([]);
    const [horrorData, setHorrorData] = useState([]);
    const [thrillerData, setThrillerData] = useState([]);
    const [mysteryData, setMysteryData] = useState([]);
    const [crimeData, setCrimeData] = useState([]);

    useEffect(() => {
        document.title = 'Film Fusion';
    }, []);


    useEffect(() => {
        fetch('https://film-fusion-0.vercel.app/topMovies')
            .then(res => res.json())
            .then(data => {
                setTopMovieData(data)
                setLoading(false)
            })

        fetch('https://film-fusion-0.vercel.app/upcomingMovies')
            .then(res => res.json())
            .then(data => {
                setUpcoming(data)
                setLoading(false)
            })

        fetch('https://film-fusion-0.vercel.app/movies')
            .then(res => res.json())
            .then(data => {
                setAllMoviesData(data)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (allMoviesData) {
            setRomanceData(allMoviesData.filter(movie => {
                for (let i = 0; i < movie.genres.length; i++) {
                    if (movie.genres[i].name === "Romance") {
                        return movie;
                    }
                }
            }));

            setActionData(allMoviesData.filter(movie => {
                for (let i = 0; i < movie.genres.length; i++) {
                    if (movie.genres[i].name === "Action") {
                        return movie;
                    }
                }
            }));

            setDramaData(allMoviesData.filter(movie => {
                for (let i = 0; i < movie.genres.length; i++) {
                    if (movie.genres[i].name === "Drama") {
                        return movie;
                    }
                }
            }));

            setComedyData(allMoviesData.filter(movie => {
                for (let i = 0; i < movie.genres.length; i++) {
                    if (movie.genres[i].name === "Comedy") {
                        return movie;
                    }
                }
            }));

            setHorrorData(allMoviesData.filter(movie => {
                for (let i = 0; i < movie.genres.length; i++) {
                    if (movie.genres[i].name === "Horror") {
                        return movie;
                    }
                }
            }));

            setThrillerData(allMoviesData.filter(movie => {
                for (let i = 0; i < movie.genres.length; i++) {
                    if (movie.genres[i].name === "Thriller") {
                        return movie;
                    }
                }
            }));

            setMysteryData(allMoviesData.filter(movie => {
                for (let i = 0; i < movie.genres.length; i++) {
                    if (movie.genres[i].name === "Mystery") {
                        return movie;
                    }
                }
            }));

            setCrimeData(allMoviesData.filter(movie => {
                for (let i = 0; i < movie.genres.length; i++) {
                    if (movie.genres[i].name === "Crime") {
                        return movie;
                    }
                }
            }));
        }
    }, [allMoviesData])

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

    if (loading) {
        return (
            <div className="min-w-screen flex items-center justify-center my-12">
                <ScaleLoader height={60} margin={2} width={5} color="#3B82F6" />
            </div>
        );
    }

    return (
        <section>
            <Banner />

            <div className="w-10/12 mx-auto mb-20">
                <h2 className="text-6xl font-bold text-center">Featured Movies</h2>

                {
                    topMovieData.length === 0 ? (
                        <div
                            className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl dark:bg-gray-700 bg-white shadow-md mt-12">
                            <img src="https://i.ibb.co/cgfgxGH/Illustrations.png" alt="empty/image" className="w-full sm:w-[200px]" />

                            <h1 className="text-[3rem] mt-6 font-[500]">Result Not Found</h1>

                            <p className="text-[0.9rem] dark:text-gray-300 text-gray-600">Whoops ... this information is not available for a moment</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
                            {
                                topMovieData.map(movie => <MovieCart key={movie._id} movie={movie} />)
                            }
                        </div>
                    )
                }

                <Link to='all-movies'>
                    <button className="border-2 px-5 py-2 rounded-full border-solid border-color-accent font-semibold text-lg text-color-primary bg-color-accent mt-12 block mx-auto">
                        See All Movies
                    </button>
                </Link>
            </div>


            <div className="w-10/12 mx-auto mb-20">
                <h2 className="text-6xl font-bold text-center">Upcoming Movies</h2>
                {
                    upcoming.length == 0 ? (
                        <div
                            className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl dark:bg-gray-700 bg-white shadow-md mt-12">
                            <img src="https://i.ibb.co/cgfgxGH/Illustrations.png" alt="empty/image" className="w-full sm:w-[200px]" />

                            <h1 className="text-[3rem] mt-6 font-[500]">Result Not Found</h1>

                            <p className="text-[0.9rem] dark:text-gray-300 text-gray-600">Whoops ... this information is not available for a moment</p>
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
                    romanceData.length > 2 && (
                        <div>
                            <h3 className="text-5xl font-semibold my-6 border-l-4 border-solid border-color-accent pl-4">Romance</h3>
                            <div className="slider-container mx-auto">
                                <Slider {...settings}>
                                    {romanceData.map((movie) => (
                                        <div key={movie._id} className="px-2">
                                            <MovieCart movie={movie} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )
                }

                {
                    actionData.length > 2 && (
                        <div className="mt-12">
                            <h3 className="text-5xl font-semibold my-6 border-l-4 border-solid border-color-accent pl-4">Action</h3>
                            <div className="slider-container mx-auto">
                                <Slider {...settings}>
                                    {actionData.map((movie) => (
                                        <div key={movie._id} className="px-2">
                                            <MovieCart movie={movie} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )
                }

                {
                    dramaData.length > 2 && (
                        <div className="mt-12">
                            <h3 className="text-5xl font-semibold my-6 border-l-4 border-solid border-color-accent pl-4">Drama</h3>
                            <div className="slider-container mx-auto">
                                <Slider {...settings}>
                                    {dramaData.map((movie) => (
                                        <div key={movie._id} className="px-2">
                                            <MovieCart movie={movie} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )
                }

                {
                    comedyData.length > 2 && (
                        <div className="mt-12">
                            <h3 className="text-5xl font-semibold my-6 border-l-4 border-solid border-color-accent pl-4">Comedy</h3>
                            <div className="slider-container mx-auto">
                                <Slider {...settings}>
                                    {comedyData.map((movie) => (
                                        <div key={movie._id} className="px-2">
                                            <MovieCart movie={movie} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )
                }

                {
                    horrorData.length > 2 && (
                        <div className="mt-12">
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

                {
                    thrillerData.length > 2 && (
                        <div className="mt-12">
                            <h3 className="text-5xl font-semibold my-6 border-l-4 border-solid border-color-accent pl-4">Thriller</h3>
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

                {
                    mysteryData.length > 2 && (
                        <div className="mt-12">
                            <h3 className="text-5xl font-semibold my-6 border-l-4 border-solid border-color-accent pl-4">Mystery</h3>
                            <div className="slider-container mx-auto">
                                <Slider {...settings}>
                                    {mysteryData.map((movie) => (
                                        <div key={movie._id} className="px-2">
                                            <MovieCart movie={movie} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )
                }

                {
                    crimeData.length > 2 && (
                        <div className="mt-12">
                            <h3 className="text-5xl font-semibold my-6 border-l-4 border-solid border-color-accent pl-4">Crime</h3>
                            <div className="slider-container mx-auto">
                                <Slider {...settings}>
                                    {crimeData.map((movie) => (
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