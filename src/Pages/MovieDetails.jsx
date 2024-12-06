import { useContext } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const MovieDetails = () => {
    const detailsMovie = useLoaderData()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const totalStars = 5



    const { _id, moviePoster, movieTitle, duration, releaseYear, rating, summary, genres } = detailsMovie

    const handelDeleteMovie = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://film-fusion-0.vercel.app/movies/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then((data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            })
                        }
                        navigate('/all-movies')
                    }))
            }
        })
    }

    const email = user?.email

    const favoriteMovie = {
        moviePoster,
        movieTitle,
        duration,
        releaseYear,
        rating,
        summary,
        genres,
        email
    }

    const handelAddFavorite = () => {
        fetch('https://film-fusion-0.vercel.app/favorite', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(favoriteMovie)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Add to favorite successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <div>
                <img className="w-full object-cover h-[230px]" src="https://i.ibb.co.com/VCm8rS8/img.jpg" alt="" />
            </div>

            <div className="w-9/12 max-sm:w-11/12 mx-auto bg-gray-700 p-8 rounded-xl my-12 flex flex-col gap-4 lg:flex-row">
                <div className="lg:w-[30%]">
                    <img className="rounded-lg h-full w-full" src={moviePoster} alt={movieTitle} />
                </div>
                <div className="border-2 border-solid border-color-accent"></div>
                <div className="flex-grow lg:w-[70%]">
                    <div
                        className="flex items-center justify-between w-full">
                        <span className="font-semibold">{releaseYear}</span>

                        <div className="flex gap-2 flex-wrap items-start my-3 max-sm:hidden">
                            {
                                genres.map((genres, i) => <p
                                    className="bg-gray-500 text-color-text/50 px-2 py-0 rounded-[6px] font-medium"
                                    key={i}>
                                    {genres.name}
                                </p>)
                            }
                        </div>
                        <div className="flex items-center gap-[5px]">
                            <MdOutlineTimer className="text-color-text text-[1.1rem]" />
                            <p className="text-[1rem] font-semibold">{duration} min</p>
                        </div>
                    </div>

                    <h1 className="font-bold text-5xl mt-8 uppercase">{movieTitle}</h1>

                    <div className="flex items-center gap-2 mt-2">
                        {[...Array(totalStars)].map((_, index) => {
                            const starValue = index + 1;

                            return (
                                <span key={index}>
                                    {rating >= starValue ? (
                                        <FaStar className="text-yellow-500 text-xl" />
                                    ) : rating >= starValue - 0.5 ? (
                                        <FaStarHalfAlt className="text-yellow-500 text-xl" />
                                    ) : (
                                        <FaRegStar className="text-gray-400 text-xl" />
                                    )}
                                </span>
                            );
                        })}
                        <span className="ml-2 text-lg font-bold">{rating} / 5</span>
                    </div>

                    <p className="mt-4">{summary}</p>

                    <div className="flex max-sm:flex-col gap-4 mt-12">
                        <button
                            onClick={handelDeleteMovie}
                            className="border-2 px-5 py-2 rounded-full border-solid border-color-accent font-semibold text-lg bg-color-accent">
                            Delete Movie
                        </button>

                        <button
                            onClick={handelAddFavorite}
                            className="border-2 px-5 py-2 rounded-full border-solid border-color-accent font-semibold text-lg bg-color-accent shadow-md hover:text-color-text">
                            Add to Favorite
                        </button>
                        <button
                            onClick={() => navigate(`/update-movie/${_id}`)}
                            className="border-2 px-5 py-2 rounded-full border-solid border-color-accent font-semibold text-lg bg-color-accent shadow-md hover:text-color-text">
                            Update Movie
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;