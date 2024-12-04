import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import AllMovies from "../Pages/AllMovies";
import AddMovie from "../Pages/AddMovie";
import MyFavorites from "../Pages/MyFavorites";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Private from "./Private";
import Error from "../Components/Others/Error";
import MovieDetails from "../Pages/MovieDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: () => fetch('https://film-fusion-0.vercel.app/topMovies')
            },
            {
                path: '/all-movies',
                element: <AllMovies />,
                loader: () => fetch('https://film-fusion-0.vercel.app/movies')
            },
            {
                path: '/add-movie',
                element:
                    <Private>
                        <AddMovie />
                    </Private>
            },
            {
                path: 'my-favorites',
                element:
                    <Private>
                        <MyFavorites />
                    </Private>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/movie-details/:id',
                element:
                    <Private>
                        <MovieDetails />
                    </Private>,
                loader: ({ params }) => fetch(`https://film-fusion-0.vercel.app/movies/${params.id}`)
            }
        ]
    }
])

export default router