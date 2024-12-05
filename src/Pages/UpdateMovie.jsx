import { MdErrorOutline } from "react-icons/md";
import SelectGenre from "../Components/AddMovie/SelectGenre";
import { useState } from "react";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const UpdateMovie = () => {
    const [movieProser, setMoviePoster] = useState('')
    const [movieTitleError, setMovieTitle] = useState('')
    const [durationError, setDuration] = useState('')
    const [releasedYear, setReleasedYear] = useState('')
    const [ratingError, setRating] = useState('')
    const [summaryErr, setSummary] = useState('')
    const [genresError, setGenres] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([]);
    const movieSingleData = useLoaderData()
    const [updateMovie, setUpdateMovie] = useState(movieSingleData)

    const { _id, moviePoster, movieTitle, duration, releaseYear, rating, genres, summary } = updateMovie

    const movieUrl = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');

    const handleUpdateMovie = (e) => {
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

        if (selectedOptions.length < 2) {
            setGenres('Genres is required.')
            return
        } else if (selectedOptions.length < 2 || selectedOptions.length > 3) {
            setGenres('Max selected genres 3')
            return
        }

        const updateMovie = {
            moviePoster,
            movieTitle,
            duration,
            releaseYear,
            rating,
            summary,
            genres: selectedOptions,
        };

        // Post the movie data
        fetch(`http://localhost:5000/movies/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updateMovie),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.modifiedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successful Update movie",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setUpdateMovie(updateMovie)
                }
            })
    };


    return (
        <section className="w-full h-auto flex items-center justify-center sm:py-12 p-6 bg-[#1F2937]">
            <div className="w-full sm:w-[900px] sm:max-w-[1000px] bg-gray-700 shadow-md backdrop-blur-3xl rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5">
                <form className="w-full flex flex-col gap-5" onSubmit={handleUpdateMovie}>
                    <h3 className="text-[1.8rem] font-[700] text-center text-white">
                        Update Movie: {movieTitle}
                    </h3>

                    <div className="flex items-center justify-between gap-4 w-full mt-5 sm:flex-row flex-col">
                        <div className="w-full relative">
                            <input
                                type="text"
                                defaultValue={moviePoster}
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
                                defaultValue={movieTitle}
                                placeholder="Movie Title"
                                className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />
                            {
                                movieTitleError && (
                                    <p className="text-[0.9rem] mt-1">
                                        <span className="text-red-500 flex items-center gap-[5px]">
                                            <MdErrorOutline className="text-[1.1rem]" />
                                            {movieTitleError}
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
                                defaultValue={duration}
                                placeholder="Duration (in minutes)"
                                className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />
                            {
                                durationError && (
                                    <p className="text-[0.9rem] mt-1">
                                        <span className="text-red-500 flex items-center gap-[5px]">
                                            <MdErrorOutline className="text-[1.1rem]" />
                                            {durationError}
                                        </span>
                                    </p>
                                )
                            }
                        </div>
                        <div className="w-full relative">
                            <select
                                name="ReleaseYear"
                                defaultValue={releaseYear}
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
                                defaultValue={rating}
                                placeholder="Rating (1-10)"
                                className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />
                            {ratingError && (
                                <p className="text-[0.9rem] mt-1">
                                    <span className="text-red-500 flex items-center gap-[5px]">
                                        <MdErrorOutline className="text-[1.1rem]" />
                                        {ratingError}
                                    </span>
                                </p>
                            )}
                        </div>
                        <div className="w-full relative">
                            <SelectGenre
                                selectedOptions={selectedOptions}
                                setSelectedOptions={setSelectedOptions}
                                genres={genres} />

                            {genresError && (
                                <p className="text-[0.9rem] mt-1">
                                    <span className="text-red-500 flex items-center gap-[5px]">
                                        <MdErrorOutline className="text-[1.1rem]" />
                                        {genresError}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="w-full">
                        <textarea
                            name="Summary"
                            defaultValue={summary}
                            placeholder="Please enter movie Summary / details"
                            className="py-3 min-h-[200px] bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                        />
                        {summaryErr && (
                            <p className="text-[0.9rem] mt-1">
                                <span className="text-red-500 flex items-center gap-[5px]">
                                    <MdErrorOutline className="text-[1.1rem]" />
                                    {summaryErr}
                                </span>
                            </p>
                        )}
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

export default UpdateMovie;