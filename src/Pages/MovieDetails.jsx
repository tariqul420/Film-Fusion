import { useContext, useEffect } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdFavorite, MdOutlineTimer } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";

const MovieDetails = () => {
    const detailsMovie = useLoaderData()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const totalStars = 5

    useEffect(() => {
        document.title = 'Movie Details | Film Fusion';
    }, [])

    const { _id, moviePoster, movieTitle, duration, releaseYear, rating, summary, genres } = detailsMovie

    const handelDeleteMovie = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Permanent delete this movie!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete"
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
        movieId: _id,
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
                    navigate('/my-favorites')
                }
            })
    }

    return (
        <div>
            <div>
                <img className="w-full object-cover h-[230px]" src="https://i.ibb.co.com/VCm8rS8/img.jpg" alt="" />
            </div>

            <div className="w-9/12 max-sm:w-11/12 mx-auto dark:bg-gray-700 bg-white shadow-md p-8 rounded-xl my-12 flex flex-col gap-4 lg:flex-row">
                <div className="lg:w-[30%] flex flex-col items-center justify-start">
                    <img className="rounded-lg w-full" src={moviePoster} alt={movieTitle} />

                    <div className="flex gap-4 mt-12 max-sm:my-5 flex-wrap">
                        <button
                            onClick={handelDeleteMovie}
                            className="w-[40px] flex items-center justify-center h-[40px] rounded-full bg-red-500 text-white text-2xl">
                            <RiDeleteBinFill />
                        </button>

                        <button
                            onClick={handelAddFavorite}
                            className="w-[40px] flex items-center justify-center h-[40px] rounded-full bg-green-500 text-white text-2xl">
                            <MdFavorite />
                        </button>
                        <button
                            onClick={() => navigate(`/update-movie/${_id}`)}
                            className="w-[40px] flex items-center justify-center h-[40px] rounded-full bg-color-accent-d text-white text-2xl">
                            <FaPenToSquare />
                        </button>
                    </div>
                </div>
                <div className="border-2 border-solid border-color-accent"></div>
                <div className="flex-grow lg:w-[70%]">
                    <div
                        className="flex items-center justify-between w-full">
                        <span className="font-semibold">{releaseYear}</span>

                        <div className="flex gap-2 flex-wrap items-start my-3 max-sm:hidden">
                            {
                                genres?.map((genres, i) => <p
                                    className="dark:bg-gray-500 bg-color-accent-d/30 dark:text-gray-200 px-2 py-0 rounded-[6px] font-medium"
                                    key={i}>
                                    {genres.name}
                                </p>)
                            }
                        </div>
                        <div className="flex items-center gap-[5px]">
                            <MdOutlineTimer className="text-[1.1rem]" />
                            <p className="text-[1rem] font-semibold">{duration} min</p>
                        </div>
                    </div>

                    <h1 className="font-bold text-5xl mt-8 uppercase">{movieTitle}</h1>

                    <div className="flex items-center gap-2 mt-2">
                        {[...Array(totalStars)]?.map((_, index) => {
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

                    <pre
                        style={{ whiteSpace: 'pre-wrap' }}
                        className="mt-4">{summary}</pre>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;