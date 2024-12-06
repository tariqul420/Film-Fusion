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
                element: <Home />,
                loader: async () => {
                    const allMoviesJson = await fetch('https://film-fusion-0.vercel.app/topMovies')
                    const allMovieData = await allMoviesJson.json()

                    const upcomingJson = await fetch('https://film-fusion-0.vercel.app/upcomingMovies')
                    const upcomingData = await upcomingJson.json()

                    const romanceRes = await fetch('https://film-fusion-0.vercel.app/moviesGenres?genres=Romance')
                    const romanceData = await romanceRes.json()

                    const actionRes = await fetch('https://film-fusion-0.vercel.app/moviesGenres?genres=Action')
                    const actionData = await actionRes.json()

                    const dramaRes = await fetch('https://film-fusion-0.vercel.app/moviesGenres?genres=Drama')
                    const dramaData = await dramaRes.json()

                    const comedyRes = await fetch('https://film-fusion-0.vercel.app/moviesGenres?genres=Comedy')
                    const comedyData = await comedyRes.json()

                    const horrorRes = await fetch('https://film-fusion-0.vercel.app/moviesGenres?genres=Horror')
                    const horrorData = await horrorRes.json()

                    const thrillerRes = await fetch('https://film-fusion-0.vercel.app/moviesGenres?genres=Thriller')
                    const thrillerData = await thrillerRes.json()

                    const mysteryRes = await fetch('https://film-fusion-0.vercel.app/moviesGenres?genres=Mystery')
                    const mysteryData = await mysteryRes.json()

                    const crimeRes = await fetch('https://film-fusion-0.vercel.app/moviesGenres?genres=Crime')
                    const crimeData = await crimeRes.json()

                    return { allMovieData, upcomingData, romanceData, actionData, dramaData, comedyData, horrorData, thrillerData, mysteryData, crimeData }
                }
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
                element: <ReviewsCelebrities />,
                loader: async () => {
                    const reviews = await fetch('/UserReviews.json')
                    const reviewsData = await reviews.json()

                    const celebrities = await fetch('/celebrities.json')
                    const celebritiesData = await celebrities.json()

                    return { reviewsData, celebritiesData }
                }
            }
        ]
    }
])

export default router