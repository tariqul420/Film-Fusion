import PropTypes from "prop-types";
import { FaPlayCircle } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";

const MovieCart = ({ movie }) => {
    const { moviePoster, movieTitle, genres, duration, releaseYear, rating } = movie
    return (
        // <div className="max-w-sm rounded-lg shadow-lg bg-color-primary/50 p-4 flex flex-col gap-4 mb-12">
        //     <div className="relative w-full h-64 rounded-lg overflow-hidden">
        //         <img
        //             src={moviePoster}
        //             alt={movieTitle}
        //             className="w-full h-full object-cover rounded-lg"
        //         />
        //     </div>

        //     <div className="text-white">
        //         <h3 className="text-2xl font-bold">{movieTitle}</h3>
        //         <p className="text-sm text-gray-400 mt-2">
        //             <span className="font-medium">Genre: </span>
        //             {genres}
        //         </p>

        //         <p className="text-sm text-gray-400 mt-1">
        //             <span className="font-medium">Duration: </span>
        //             {duration} min
        //         </p>

        //         <p className="text-sm text-gray-400 mt-1">
        //             <span className="font-medium">Release Year: </span>
        //             {releaseYear}
        //         </p>

        //         <p className="text-sm text-gray-400 mt-1">
        //             <span className="font-medium">Rating: </span>
        //             {rating} / 10
        //         </p>
        //     </div>

        //     <button
        //         onClick={() => alert(`Details for ${movieTitle}`)}
        //         className="flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        //     >
        //         <MdInfoOutline className="text-lg" />
        //         See Details
        //     </button>
        // </div>

        <div
            className="w-full sm:w-[80%] lg:w-full h-[473px] relative overflow-hidden group cursor-pointer rounded-md">

            {/*  image  */}
            <img
                src={moviePoster}
                alt="animated_card"
                className="w-full h-full object-cover rounded-lg group-hover:scale-[1.1] transition-all duration-700" />

            {/*  text  */}
            <div
                className="absolute top-[55%] transform group-hover:translate-y-[-50%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-center justify-center flex-col">
                <button>
                    <FaPlayCircle size={50} color="#3B82F6" />
                </button>
                <h1 className="text-2xl font-bold mt-3">{movieTitle}</h1>
                <p className="text-sm text-gray-400 mt-2">
                    <span className="font-medium">Genre: </span>
                    {genres}
                </p>
            </div>

            <div
                className="w-full opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 transition-all duration-500 bg-gradient-to-b from-[rgb(0,0,0,0.001)] to-[rgb(0,0,0)] h-[100%] absolute bottom-0 left-0 right-0"></div>
        </div>
    );
};

MovieCart.propTypes = {
    movie: PropTypes.object.isRequired
}

export default MovieCart;
