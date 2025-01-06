import { Link, NavLink } from "react-router-dom";
import AuthBtn from "./AuthBtn";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Profile from "./Profile";
import { CiMenuFries } from "react-icons/ci";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const { user } = useContext(AuthContext)
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [dashboardOpen, setDashboardOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-[1000] backdrop-blur-3xl py-4 w-full mx-auto my-6">
            <div className="lg:w-10/12 w-11/12 mx-auto flex items-center justify-between">
                <div>
                    <Link to='/'>
                        <h2 className="font-bold text-4xl font-Montserrat">Film Fusion</h2>
                    </Link>
                </div>

                <div className="relative">
                    <ul className="items-center gap-[20px] text-[1rem] font-semibold lg:flex hidden">
                        <li className="navBarLink">
                            <NavLink to='/'>Home</NavLink>
                        </li>
                        <li className="navBarLink">
                            <NavLink to='/all-movies'>All Movies</NavLink>
                        </li>
                        <li className="navBarLink">
                            <NavLink to='/reviews-celebrities'>Reviews & Celebrities</NavLink>
                        </li>
                        <li className="navBarLink">
                            <NavLink to='/contact-us'>Contact Us</NavLink>
                        </li>
                        {user && (
                            <li
                                className="cursor-pointer navBarLink"
                                onClick={() => setDashboardOpen(!dashboardOpen)}
                            >
                                Dashboard
                            </li>
                        )}
                    </ul>
                    {dashboardOpen && (
                        <div
                            className="flex flex-col space-y-2 font-semibold bg-white dark:bg-gray-800 p-4 rounded-md absolute right-0 top-8 shadow-lg"
                        >
                            <NavLink
                                to='/add-movie'
                                className='navBarLink'
                                onClick={() => setDashboardOpen(false)}
                            >
                                Add Movie
                            </NavLink>
                            <NavLink
                                to='/my-favorites'
                                className='navBarLink'
                                onClick={() => setDashboardOpen(false)}
                            >
                                My Favorites
                            </NavLink>
                            <NavLink
                                to='/add-upcoming'
                                className='navBarLink'
                                onClick={() => setDashboardOpen(false)}
                            >
                                Add Upcoming
                            </NavLink>
                        </div>
                    )}
                </div>

                <div className="items-center gap-[15px] flex">
                    <ThemeToggle />
                    {
                        user ? <Profile /> : <AuthBtn />
                    }

                    <CiMenuFries className="text-[1.8rem] mr-1 text-color-text dark:text-white cursor-pointer lg:hidden flex"
                        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
                </div>

                <aside
                    className={`${mobileSidebarOpen ? "translate-y-0 opacity-100 z-[2000]" : "translate-y-[-200px] opacity-0 z-[-1]"
                        } lg:hidden bg-gray-200 dark:bg-gray-700 boxShadow p-4 text-center absolute top-[65px] right-0 w-full md:w-4/12 rounded-md transition-all duration-300 flex items-center justify-center`}
                >
                    <ul className="flex flex-col space-y-4 text-[1rem] font-semibold items-center justify-center">
                        <li>
                            <NavLink to="/" className="navBarLink" onClick={() => setMobileSidebarOpen(false)}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/all-movies" className="navBarLink" onClick={() => setMobileSidebarOpen(false)}>
                                All Movies
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reviews-celebrities" className="navBarLink" onClick={() => setMobileSidebarOpen(false)}>
                                Reviews & Celebrities
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact-us" className="navBarLink" onClick={() => setMobileSidebarOpen(false)}>
                                Contact Us
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <button
                                    className="cursor-pointer navBarLink w-full text-left z-[1000]"
                                    onClick={() => {
                                        setDashboardOpen(!dashboardOpen);
                                        setMobileSidebarOpen(false);
                                    }}
                                >
                                    Dashboard
                                </button>
                            </li>
                        )}
                        {dashboardOpen && (
                            <div className="flex flex-col space-y-2 bg-white dark:bg-gray-800 p-4 rounded-md">
                                <NavLink to="/add-movie" className="navBarLink" onClick={() => setMobileSidebarOpen(false)}>
                                    Add Movie
                                </NavLink>
                                <NavLink to="/my-favorites" className="navBarLink" onClick={() => setMobileSidebarOpen(false)}>
                                    My Favorites
                                </NavLink>
                                <NavLink to="/add-upcoming" className="navBarLink" onClick={() => setMobileSidebarOpen(false)}>
                                    Add Upcoming
                                </NavLink>
                            </div>
                        )}
                    </ul>
                </aside>
            </div>
        </nav>
    );
};

export default Navbar;