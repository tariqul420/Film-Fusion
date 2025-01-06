import PropTypes from "prop-types";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MovieCart = ({ movie }) => {
    const { _id, moviePoster, movieTitle, genres, duration, releaseYear, rating } = movie
    console.log(genres);

    const navigate = useNavigate()

    const totalStars = 5


    return (
        <div
            className="w-full shadow-md hover:scale-[1.05] transition-all h-[350px] duration-300 overflow-hidden rounded-md relative cursor-pointer group dark:bg-gray-700 bg-white">

            {/*  icons  */}
            <div
                className="absolute top-0 left-0 opacity-100 z-[-1] group-hover:opacity-100 group-hover:z-[1] ease-out transition-all duration-300 flex items-center justify-between w-full p-[15px]">
                <span className="font-semibold">{releaseYear}</span>
                <div className="flex items-center gap-[5px]">
                    <MdOutlineTimer className="text-color-text dark:text-white text-[1.1rem]" />
                    <p className="text-[1rem] font-semibold">{duration} min</p>
                </div>
            </div>

            <img
                src={moviePoster}
                alt={movieTitle}
                className="w-full h-[60%] object-cover group-hover:opacity-40 group-hover:h-full transition-all duration-300 ease-out" />

            <div className="absolute bottom-0 left-0 py-[10px]  px-[10px] w-full">
                <h3 className="text-[1.2rem] font-bold uppercase"> {movieTitle?.length > 16 ? `${movieTitle.slice(0, 16)}...` : movieTitle}</h3>
                <div className="flex gap-2 flex-wrap items-start">
                    {
                        genres?.slice(0, 2)?.map((genres, i) => <p
                            className="dark:bg-gray-500 bg-[#d5f4fa] dark:text-gray-200 px-2 py-0 rounded-[6px] font-medium"
                            key={i}>
                            {genres?.name}
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
                    <span className="ml-2 text-lg font-bold">{rating} / 5</span>
                </div>

                <div>
                    <button
                        onClick={() => navigate(`/movie-details/${_id}`)}
                        className="border-2 border-solid border-color-accent px-2 py-1 rounded-full mt-1 font-bold hover:bg-color-accent dark:text-white hover:text-white transition-all duration-300 ease-out">See Details</button>
                </div>
            </div>
        </div>
    );
};

MovieCart.propTypes = {
    movie: PropTypes.object.isRequired,
    favorite: PropTypes.array,
    setFavorite: PropTypes.func
}

export default MovieCart;
