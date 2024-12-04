import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import MovieCart from "../Components/Others/MovieCart";

const MyFavorites = () => {
    const { user } = useContext(AuthContext)
    const [favorite, setFavorite] = useState([])

    const email = user?.email

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
            <div className="grid grid-cols-3 gap-8 mt-20">
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