import PropTypes from "prop-types";
import { FaRegEye, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TableRow = ({ movieDetails, handelDelete }) => {
    const { _id, moviePoster, movieTitle, genres, duration, releaseYear, rating, movieId } = movieDetails
    const navigate = useNavigate()
    console.log(movieDetails);

    const totalStars = 5

    return (
        <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-900">
            {/* Movie Poster */}
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                <img
                    src={moviePoster}
                    alt={movieTitle}
                    className="w-16 h-16 object-cover rounded-md"
                />
            </td>

            {/* Movie Title */}
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                {movieTitle?.length > 16 ? `${movieTitle.slice(0, 16)}...` : movieTitle}
            </td>

            {/* Release Year */}
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                {releaseYear}
            </td>

            {/* Duration */}
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                {duration} min
            </td>

            {/* Genres */}
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                <div className="flex gap-1 flex-wrap">
                    {genres?.slice(0, 2)?.map((genre, i) => (
                        <span
                            className="dark:bg-gray-500 bg-[#d5f4fa] dark:text-gray-200 px-2 py-0 rounded-[6px] font-medium"
                            key={i}
                        >
                            {genre?.name}
                        </span>
                    ))}
                </div>
            </td>

            {/* Rating */}
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
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
            </td>

            {/* Actions */}
            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-2xl">
                <button
                    className="mr-2"
                    onClick={() => navigate(`/movie-details/${movieId}`)}>
                    <FaRegEye />
                </button>
                <button
                    onClick={() => handelDelete(_id)}
                >
                    <MdDelete />
                </button>
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    movieDetails: PropTypes.object,
    handelDelete: PropTypes.func,
}

export default TableRow;