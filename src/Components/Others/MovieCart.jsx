import PropTypes from "prop-types";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MovieCart = ({ movie, setFavorite, favorite }) => {
    const { _id, moviePoster, movieTitle, genres, duration, releaseYear, rating } = movie
    console.log(movie);

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const totalStars = 5

    const handelFavoriteDelete = (id) => {
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
                fetch(`https://film-fusion-0.vercel.app/favorite/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Successful delete movie",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        const remaining = favorite.filter(favorite => favorite._id !== id)
                        setFavorite(remaining)
                    })
            }
        })
    }

    return (
        <div
            className="w-full sm:w-[80%] lg:w-full shadow-md h-[470px] hover:scale-[1.05] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group bg-gray-700">

            {/*  icons  */}
            <div
                className="absolute top-0 left-0 opacity-100 z-[-1] group-hover:opacity-100 group-hover:z-[1] ease-out transition-all duration-300 flex items-center justify-between w-full p-[15px]">
                <span className="font-semibold">{releaseYear}</span>
                <div className="flex items-center gap-[5px]">
                    <MdOutlineTimer className="text-color-text text-[1.1rem]" />
                    <p className="text-[1rem] font-semibold">{duration} min</p>
                </div>
            </div>

            <img
                src={moviePoster}
                alt={movieTitle}
                className="w-full h-[60%] object-cover group-hover:opacity-40 group-hover:h-full transition-all duration-300 ease-out" />

            <div className="absolute bottom-0 left-0 py-[20px]  px-[20px] w-full">
                <h3 className="text-[1.4rem] font-bold">{movieTitle}</h3>
                <div className="flex gap-2 flex-wrap items-start my-1">
                    {
                        genres.map((genres, i) => <p
                            className="bg-gray-500 text-color-text/50 px-2 py-0 rounded-[6px] font-medium"
                            key={i}>
                            {genres.name}
                        </p>)
                    }
                </div>

                <div className="flex items-center gap-2">
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
                    <span className="ml-2 text-lg font-bold">{rating} / 10</span>
                </div>

                <div>
                    {
                        pathname === '/my-favorites' ? (
                            <button
                                onClick={() => handelFavoriteDelete(_id)}
                                className="border-2 border-solid border-color-accent px-4 py-2 rounded-full mt-3 font-bold hover:bg-color-accent text-color-text transition-all duration-300 ease-out">Delete Favorite</button>
                        ) : (<button
                            onClick={() => navigate(`/movie-details/${_id}`)}
                            className="border-2 border-solid border-color-accent px-4 py-2 rounded-full mt-3 font-bold hover:bg-color-accent text-color-text transition-all duration-300 ease-out">See Details</button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

MovieCart.propTypes = {
    movie: PropTypes.object.isRequired,
    favorite: PropTypes.array.isRequired,
    setFavorite: PropTypes.func.isRequired
}

export default MovieCart;
