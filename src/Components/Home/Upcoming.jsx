import PropTypes from "prop-types";

const Upcoming = ({ movie }) => {
    const { moviePoster, movieName, releaseDate, description } = movie
    return (
        <div
            className="w-full sm:w-[80%] lg:w-full shadow-md h-[470px] hover:scale-[1.05] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group bg-gray-700">
            <img
                src={moviePoster}
                alt={movieName}
                className="w-full h-[60%] object-cover group-hover:opacity-40 group-hover:h-full transition-all duration-300 ease-out" />

            <div className="absolute bottom-0 left-0 py-[20px]  px-[20px] w-full">
                <h3 className="text-[1.4rem] font-bold">{movieName}</h3>
                <p>{releaseDate}</p>
                <p>{description}</p>

                <div>
                    <button
                        className="border-2 border-solid border-color-accent px-4 py-2 rounded-full mt-3 font-bold hover:bg-color-accent text-color-text transition-all duration-300 ease-out">Delete Upcoming</button>
                </div>
            </div>
        </div>
    );
};
Upcoming.propTypes = {
    movie: PropTypes.object
}
export default Upcoming;