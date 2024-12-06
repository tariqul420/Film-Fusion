import { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import Swal from "sweetalert2";
import SelectGenre from "../Components/AddMovie/SelectGenre";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
    const [movieProserErr, setMoviePosterErr] = useState('')
    const [movieTitleErr, setMovieTitleErr] = useState('')
    const [durationErr, setDurationErr] = useState('')
    const [releasedYearErr, setReleasedYearErr] = useState('')
    const [ratingErr, setRatingErr] = useState('')
    const [summaryErr, setSummaryErr] = useState('')
    const [genresErr, setGenresErr] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [rating, setRating] = useState(0);
    const navigate = useNavigate()


    useEffect(() => {
        document.title = 'Add Movie | Film Fusion';
    }, [])

    const movieUrl = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const moviePoster = form.MoviePoster.value;
        const movieTitle = form.MovieTitle.value;
        const duration = Number(form.Duration.value);
        const releaseYear = Number(form.ReleaseYear.value);
        const summary = form.Summary.value;

        setMoviePosterErr('');
        setMovieTitleErr('');
        setDurationErr('');
        setReleasedYearErr('');
        setRatingErr('');
        setSummaryErr('');
        setGenresErr('');

        if (!moviePoster.trim()) {
            setMoviePosterErr("Movie Poster is required");
            return false;
        } else if (!movieUrl.test(moviePoster)) {
            setMoviePosterErr("Invalid Movie Poster URL");
            return false;
        }

        if (!movieTitle) {
            setMovieTitleErr('Movie Title is required.');
            return;
        } else if (movieTitle.length <= 2) {
            setMovieTitleErr('Must have at least 2 characters');
            return;
        }

        if (!duration) {
            setDurationErr('Movie Duration is required.');
            return;
        } else if (duration < 60) {
            setDurationErr('Duration must be greater than 60 minutes');
            return;
        }

        if (!releaseYear) {
            setReleasedYearErr('Release Year is required.');
            return;
        } else if (isNaN(releaseYear)) {
            setReleasedYearErr('Release Year must be a valid number.')
            return
        }

        if (!rating) {
            setRatingErr('Rating is required.');
            return;
        }

        if (!summary) {
            setSummaryErr('Summary is required.');
            return;
        } else if (summary > 10) {
            setSummaryErr('Summary must be 10 characters')
            return
        }

        if (selectedOptions.length < 1) {
            setGenresErr('Genres is required.')
            return
        } else if (selectedOptions.length < 1 || selectedOptions.length > 3) {
            setGenresErr('Max selected genres 3')
            return
        }

        const newMovie = {
            moviePoster,
            movieTitle,
            duration,
            releaseYear,
            rating,
            summary,
            genres: selectedOptions,
        };

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
                if (result.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successful add movie",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/all-movies')
                }
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed add movie",
                    showConfirmButton: false,
                    timer: 1500
                });
            })


        form.reset()
        setSelectedOptions([])
    };

    return (
        <section className="w-full h-auto flex items-center justify-center sm:py-12 p-6 dark:bg-[#1F2937]">
            <div className="w-full sm:w-[900px] sm:max-w-[1000px] dark:bg-gray-700 bg-gray-400 shadow-md backdrop-blur-3xl rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5">
                <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
                    <h3 className="text-[1.8rem] font-[700] text-center">
                        Add Movie
                    </h3>

                    <div className="flex items-center justify-between gap-4 w-full mt-5 sm:flex-row flex-col">
                        <div className="w-full relative">
                            <input
                                type="text"
                                name="MoviePoster"
                                placeholder="Movie Poster Url"
                                className="py-3 dark:bg-color-primary-d bg-gray-200 font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />

                            {
                                movieProserErr && (
                                    <p className="text-[0.9rem] mt-1">
                                        <span className="text-red-500 flex items-center gap-[5px]">
                                            <MdErrorOutline className="text-[1.1rem]" />
                                            {movieProserErr}
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
                                className="py-3 dark:bg-color-primary-d bg-gray-200 font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />
                            {
                                movieTitleErr && (
                                    <p className="text-[0.9rem] mt-1">
                                        <span className="text-red-500 flex items-center gap-[5px]">
                                            <MdErrorOutline className="text-[1.1rem]" />
                                            {movieTitleErr}
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
                                className="py-3 dark:bg-color-primary-d bg-gray-200 font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />
                            {
                                durationErr && (
                                    <p className="text-[0.9rem] mt-1">
                                        <span className="text-red-500 flex items-center gap-[5px]">
                                            <MdErrorOutline className="text-[1.1rem]" />
                                            {durationErr}
                                        </span>
                                    </p>
                                )
                            }
                        </div>
                        <div className="w-full relative">
                            <select
                                name="ReleaseYear"
                                className="py-3 dark:bg-color-primary-d bg-gray-200 font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full">
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
                                releasedYearErr && (
                                    <p className="text-[0.9rem] mt-1">
                                        <span className="text-red-500 flex items-center gap-[5px]">
                                            <MdErrorOutline className="text-[1.1rem]" />
                                            {releasedYearErr}
                                        </span>
                                    </p>
                                )
                            }
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 w-full mt-5 sm:flex-row flex-col">
                        <div className="w-full">
                            <div className="rating py-1 dark:bg-color-primary-d bg-gray-200 font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full">
                                <Rating
                                    fillColorArray={[
                                        '#f18845',
                                        '#f19745',
                                        '#f1b345',
                                        '#f1c245',
                                        '#f1d045',
                                        '#f1de45'
                                    ]}
                                    iconsCount={5}
                                    onClick={(rate) => setRating(rate / 1)}
                                    tooltipArray={[
                                        'Terrible',
                                        'Terrible+',
                                        'Bad',
                                        'Bad+',
                                        'Average',
                                        'Average+',
                                        'Great',
                                        'Great+',
                                        'Awesome',
                                        'Awesome+'
                                    ]}
                                    transition
                                />
                            </div>

                            {ratingErr && (
                                <p className="text-[0.9rem] mt-1">
                                    <span className="text-red-500 flex items-center gap-[5px]">
                                        <MdErrorOutline className="text-[1.1rem]" />
                                        {ratingErr}
                                    </span>
                                </p>
                            )}
                        </div>

                        <div className="w-full relative">
                            <SelectGenre
                                selectedOptions={selectedOptions}
                                setSelectedOptions={setSelectedOptions} />

                            {genresErr && (
                                <p className="text-[0.9rem] mt-1">
                                    <span className="text-red-500 flex items-center gap-[5px]">
                                        <MdErrorOutline className="text-[1.1rem]" />
                                        {genresErr}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="w-full">
                        <textarea
                            name="Summary"
                            placeholder="Please enter movie details..."
                            className="py-3 min-h-[200px] dark:bg-color-primary-d bg-gray-200 font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
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

export default AddMovie;
