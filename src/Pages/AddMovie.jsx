import { useContext, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const AddMovie = () => {
    const genresList = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Adventure", "Romance", "Thriller"];
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [movieProser, setMoviePoster] = useState('')
    const [movieTitle, setMovieTitle] = useState('')
    const [duration, setDuration] = useState('')
    const [releasedYear, setReleasedYear] = useState('')
    const [rating, setRating] = useState('')
    const [summary, setSummary] = useState('')
    const [genres, setGenres] = useState('')
    const { user } = useContext(AuthContext)

    const movieUrl = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');

    const handleGenreClick = (genre) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((item) => item !== genre) : [...prev, genre]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const moviePoster = form.MoviePoster.value;
        const movieTitle = form.MovieTitle.value;
        const duration = Number(form.Duration.value);
        const releaseYear = Number(form.ReleaseYear.value);
        const rating = Number(form.Rating.value);
        const summary = form.Summary.value;

        setMoviePoster('');
        setMovieTitle('');
        setDuration('');
        setReleasedYear('');
        setRating('');
        setSummary('');
        setGenres('');

        if (!moviePoster.trim()) {
            setMoviePoster("Movie Poster is required");
            return false;
        } else if (!movieUrl.test(moviePoster)) {
            setMoviePoster("Invalid Movie Poster URL");
            return false;
        }

        if (!movieTitle) {
            setMovieTitle('Movie Title is required.');
            return;
        } else if (movieTitle.length <= 2) {
            setMovieTitle('Must have at least 2 characters');
            return;
        }

        if (!duration) {
            setDuration('Movie Duration is required.');
            return;
        } else if (duration < 60) {
            setDuration('Duration must be greater than 60 minutes');
            return;
        }

        if (!releaseYear) {
            setReleasedYear('Release Year is required.');
            return;
        } else if (isNaN(releaseYear)) {
            setReleasedYear('Release Year must be a valid number.')
            return
        }

        if (!rating) {
            setRating('Rating is required.');
            return;
        } else if (isNaN(rating)) {
            setRating('Rating must be a valid number.')
            return
        } else if (rating < 1 || rating > 10) {
            setRating('Rating must be between 1 and 10.');
            return;
        }

        if (!summary) {
            setSummary('Summary is required.');
            return;
        } else if (summary > 10) {
            setSummary('Summary must be 10 characters')
            return
        }

        if (selectedGenres.length < 2) {
            setGenres('Genres is required.')
            return
        } else if (selectedGenres.length < 2 || selectedGenres.length > 3) {
            setGenres('Max selected genres 3')
            return
        }

        const email = user.email

        const newMovie = {
            moviePoster,
            movieTitle,
            duration,
            releaseYear,
            rating,
            summary,
            email,
            genres: selectedGenres,
        };

        console.log(newMovie);

        // Post the movie data
        fetch('https://film-fusion-0.vercel.app/movies', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    toast.success('Successful add movie')
                } else {
                    toast.error('Failed to add movie')
                }
            })


        form.reset()
        setSelectedGenres([])
    };

    return (
        <section className="w-full h-auto flex items-center justify-center sm:py-12 p-6 bg-[#1F2937]">
            <div className="w-full sm:w-[900px] sm:max-w-[1000px] bg-gray-700 shadow-md backdrop-blur-3xl rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5">
                <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
                    <h3 className="text-[1.8rem] font-[700] text-center text-white">
                        Add Movie
                    </h3>

                    <div className="flex items-center justify-between gap-4 w-full mt-5 sm:flex-row flex-col">
                        <div className="w-full relative">
                            <input
                                type="text"
                                name="MoviePoster"
                                placeholder="Movie Poster Url"
                                className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />

                            {
                                movieProser && (
                                    <p className="text-[0.9rem] mt-1">
                                        <span className="text-red-500 flex items-center gap-[5px]">
                                            <MdErrorOutline className="text-[1.1rem]" />
                                            {movieProser}
                                        </span>
                                    </p>
                                )
                            }
                        </div>
                        <div className="w-full relative">
                            <input
                                type="text"
                                name="MovieTitle"
                                placeholder="Movie Title"
                                className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />
                            {
                                movieTitle && (
                                    <p className="text-[0.9rem] mt-1">
                                        <span className="text-red-500 flex items-center gap-[5px]">
                                            <MdErrorOutline className="text-[1.1rem]" />
                                            {movieTitle}
                                        </span>
                                    </p>
                                )
                            }
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 w-full mt-5 sm:flex-row flex-col">
                        <div className="w-full relative">
                            <input
                                type="text"
                                name="Duration"
                                placeholder="Duration (in minutes)"
                                className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />
                            {
                                duration && (
                                    <p className="text-[0.9rem] mt-1">
                                        <span className="text-red-500 flex items-center gap-[5px]">
                                            <MdErrorOutline className="text-[1.1rem]" />
                                            {duration}
                                        </span>
                                    </p>
                                )
                            }
                        </div>
                        <div className="w-full relative">
                            <select
                                name="ReleaseYear"
                                className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full">
                                <option value="--Select Year--">--Select Year--</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                            </select>
                            {
                                releasedYear && (
                                    <p className="text-[0.9rem] mt-1">
                                        <span className="text-red-500 flex items-center gap-[5px]">
                                            <MdErrorOutline className="text-[1.1rem]" />
                                            {releasedYear}
                                        </span>
                                    </p>
                                )
                            }
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 w-full mt-5 sm:flex-row flex-col">
                        <div className="w-full relative ">
                            <input
                                type="text"
                                name="Rating"
                                placeholder="Rating (1-10)"
                                className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />
                            {rating && (
                                <p className="text-[0.9rem] mt-1">
                                    <span className="text-red-500 flex items-center gap-[5px]">
                                        <MdErrorOutline className="text-[1.1rem]" />
                                        {rating}
                                    </span>
                                </p>
                            )}
                        </div>
                        <div className="w-full relative">
                            <input
                                type="text"
                                name="Summary"
                                placeholder="Summary"
                                className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />
                            {summary && (
                                <p className="text-[0.9rem] mt-1">
                                    <span className="text-red-500 flex items-center gap-[5px]">
                                        <MdErrorOutline className="text-[1.1rem]" />
                                        {summary}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Genre Selection */}
                    <div className="w-full">
                        <label className="block mb-3 text-sm font-medium text-white">
                            Select Genres:
                        </label>

                        <div className="flex flex-wrap gap-3">
                            {genresList.map((genre, index) => (
                                <label
                                    key={index}
                                    onClick={() => handleGenreClick(genre)}
                                    className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer transition ${selectedGenres.includes(genre)
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-600 text-white hover:bg-gray-500"
                                        }`}
                                >
                                    {genre}
                                </label>
                            ))}

                            {genres && (
                                <p className="text-[0.9rem] mt-1">
                                    <span className="text-red-500 flex items-center gap-[5px]">
                                        <MdErrorOutline className="text-[1.1rem]" />
                                        {genres}
                                    </span>
                                </p>
                            )}
                        </div>

                    </div>


                    <div className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-[#3B82F6] text-white border-none font-bold outline-none rounded-lg mt-3"
                        >
                            Add Movie
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddMovie;
