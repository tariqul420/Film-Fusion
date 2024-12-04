import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import AllMovies from "../Pages/AllMovies";
import AddMovie from "../Pages/AddMovie";
import MyFavorites from "../Pages/MyFavorites";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Private from "./Private";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'all-movies',
                element: <AllMovies />
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
            }
        ]
    }
])

export default router