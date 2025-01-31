import PropTypes from "prop-types";
import Swal from "sweetalert2";

const Upcoming = ({ movie, setUpcoming, upcoming }) => {
    const { _id, moviePoster, movieName, releaseDate, description } = movie

    const handelUpcomingDelete = (id) => {
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
                fetch(`https://film-fusion-0.vercel.app/upcomingMovies/${id}`, {
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
                        const remaining = upcoming.filter(movie => movie._id !== id)
                        setUpcoming(remaining)
                    }))
            }
        })
    }
    return (
        <div
            className="w-full shadow-md hover:scale-[1.05] transition-all h-[350px] duration-300 overflow-hidden rounded-md relative cursor-pointer group dark:bg-gray-700 bg-white">
            <img
                src={moviePoster}
                alt={movieName}
                className="w-full h-[53%] object-cover group-hover:opacity-40 group-hover:h-full transition-all duration-300 ease-out" />

            <div className="absolute bottom-0 left-0 py-[10px]  px-[10px] w-full">
                <h3 className="text-[1.4rem] font-bold uppercase">{movieName?.length > 16 ? `${movieName.slice(0, 16)}...` : movieName}</h3>
                <p>{releaseDate}</p>
                <p>{description?.length > 50 ? `${description.slice(0, 50)}...` : description}</p>

                <div>
                    <button
                        onClick={() => handelUpcomingDelete(_id)}
                        className="border-2 border-solid border-color-accent px-3 py-1 rounded-full mt-1 font-bold hover:bg-color-accent dark:text-color-text-d transition-all duration-300 ease-out">Delete Upcoming</button>
                </div>
            </div>
        </div>
    );
};
Upcoming.propTypes = {
    movie: PropTypes.object,
    upcoming: PropTypes.array,
    setUpcoming: PropTypes.func
}
export default Upcoming;