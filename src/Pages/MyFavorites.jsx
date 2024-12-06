import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import MovieCart from "../Components/Others/MovieCart";

const MyFavorites = () => {
    const { user } = useContext(AuthContext)
    const [favorite, setFavorite] = useState([])
    const email = user?.email

    useEffect(() => {
        document.title = 'My Favorite | Film Fusion';
    }, [])

    useEffect(() => {
        fetch(`https://film-fusion-0.vercel.app/favorite?favorite=${email}`)
            .then(res => res.json())
            .then(data => {
                setFavorite(data)
            })
    }, [email])

    return (
        <div className="w-10/12 mx-auto my-12">
            <h2 className="text-6xl font-bold text-center">My Favorite</h2>

            {
                favorite.length === 0 && (
                    <div
                        className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl bg-gray-700 mt-12">
                        <img src="https://i.ibb.co/6nSHrGp/Favorite-illustration.png" alt="empty/image"
                            className="w-full sm:w-[200px]" />

                        <h1 className="text-[3rem] mt-3 font-[500]">No Favorites</h1>

                        <p className="text-[0.9rem] text-gray-300">You can add an item to your favorites by clicking “Add favorites button”</p>
                    </div>
                )
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
                {
                    favorite.map(movie => <MovieCart
                        key={movie._id}
                        movie={movie}
                        setFavorite={setFavorite}
                        favorite={favorite} />)
                }
            </div>
        </div>
    );
};

export default MyFavorites;