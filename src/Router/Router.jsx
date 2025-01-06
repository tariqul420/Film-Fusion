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
import MyProfile from "../Pages/MyProfile";
import UpdateProfile from "../Pages/UpdateProfile";
import UpdateMovie from "../Pages/UpdateMovie";
import AddUpcoming from "../Pages/AddUpcoming";
import ForgotPassword from "../Pages/ForgotPassword";
import ReviewsCelebrities from "../Pages/ReviewsCelebrities";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/all-movies',
                element: <AllMovies />,
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
                element: <Login />,
                children: [
                    {
                        path: '/login/forgot-password',
                        element: <ForgotPassword />
                    }
                ]
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
            },
            {
                path: '/my-profile',
                element:
                    <Private>
                        <MyProfile />
                    </Private>
            },
            {
                path: '/update-Profile',
                element:
                    <Private>
                        <UpdateProfile />
                    </Private>
            },
            {
                path: '/update-movie/:id',
                element:
                    <Private>
                        <UpdateMovie />
                    </Private>,
                loader: ({ params }) => fetch(`https://film-fusion-0.vercel.app/movies/${params.id}`)
            },
            {
                path: '/add-upcoming',
                element:
                    <Private>
                        <AddUpcoming />
                    </Private>
            },
            {
                path: '/reviews-celebrities',
                element: <ReviewsCelebrities />
            }
        ]
    }
])

export default router