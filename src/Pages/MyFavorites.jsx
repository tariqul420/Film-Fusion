import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ScaleLoader } from "react-spinners";
import TableRow from "../Components/MyFavorite/TableRow";
import Swal from "sweetalert2";

const MyFavorites = () => {
    const { user } = useContext(AuthContext);
    const [favorite, setFavorite] = useState([]);
    const [loading, setLoading] = useState(true);
    const email = user?.email;

    useEffect(() => {
        document.title = "My Favorite | Film Fusion";
    }, []);

    useEffect(() => {
        fetch(`https://film-fusion-0.vercel.app/favorite?favorite=${email}`)
            .then((res) => res.json())
            .then((data) => {
                setFavorite(data);
                setLoading(false);
            });
    }, [email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You Permanent delete this movie on My Favorite List",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete"
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
    };

    if (loading) {
        return (
            <div className="min-w-screen flex items-center justify-center my-12">
                <ScaleLoader height={60} margin={2} width={5} color="#3B82F6" />
            </div>
        );
    }

    return (
        <div className="w-10/12 mx-auto mb-12 mt-2">
            <h2 className="text-6xl font-bold text-center">My Favorites</h2>

            {favorite?.length === 0 && (
                <div className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl dark:bg-gray-700 bg-white shadow-md mt-12">
                    <img
                        src="https://i.ibb.co/6nSHrGp/Favorite-illustration.png"
                        alt="empty/image"
                        className="w-full sm:w-[200px]"
                    />
                    <h1 className="text-[3rem] mt-3 font-[500]">No Favorites</h1>
                    <p className="text-[0.9rem] dark:text-gray-300 text-gray-600">
                        You can add an item to your favorites by clicking “Add favorites
                        button”
                    </p>
                </div>
            )}

            {favorite?.length > 0 && (
                <div className="overflow-x-auto mt-12">
                    <table className="table-auto w-full text-left border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Poster</th>
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Title</th>
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Release Year</th>
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Duration</th>
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Genres</th>
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Rating</th>
                                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Add rows dynamically */}
                            {favorite?.map((movie) => (
                                <TableRow key={movie._id} movieDetails={movie} handelDelete={handleDelete} />
                            ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
};

export default MyFavorites;
