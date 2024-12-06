import { Link, NavLink } from "react-router-dom";
import AuthBtn from "./AuthBtn";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Profile from "./Profile";
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {
    const { user } = useContext(AuthContext)
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between relative boxShadow rounded-full px-[10px] py-[8px] wfu w-11/12 mx-auto my-6">
            <div>
                <Link to='/'>
                    <h2 className="font-bold text-4xl font-Montserrat">Film Fusion</h2>
                </Link>
            </div>
            <div>
                <ul className="items-center gap-[20px] text-[1rem] font-semibold lg:flex hidden">
                    <li className="navBarLink">
                        <NavLink to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li className="navBarLink">
                        <NavLink to='/all-movies'>
                            All Movies
                        </NavLink>
                    </li>
                    <li className="navBarLink">
                        <NavLink to='/add-movie'>
                            Add Movie
                        </NavLink>
                    </li>
                    <li className="navBarLink">
                        <NavLink to='/my-favorites'>
                            My Favorites
                        </NavLink>
                    </li>
                    <li className="navBarLink">
                        <NavLink to='/add-upcoming'>
                            Add Upcoming
                        </NavLink>
                    </li>
                    <li className="navBarLink">
                        <NavLink to='/reviews-celebrities'>
                            Reviews & Celebrities
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="items-center gap-[15px] flex">
                {
                    user ? <Profile /> : <AuthBtn />
                }

                <CiMenuFries className="text-[1.8rem] mr-1 text-color-text cursor-pointer lg:hidden flex"
                    onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
            </div>

            <aside
                className={` ${mobileSidebarOpen ? "translate-y-0 opacity-100 z-[2000]" : "translate-y-[-200px] opacity-0 z-[-1]"} lg:hidden bg-white boxShadow p-4 text-center absolute top-[65px] right-0 w-full md:w-4/12 rounded-md transition-all duration-300`}>
                <div className="relative mb-5">
                </div>
                <ul className="items-center gap-[20px] text-[1rem] text-[#3E2723] lg:flex">
                    <li className="navBarLink">
                        <NavLink to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li className="navBarLink">
                        <NavLink to='/all-movies'>
                            All Movies
                        </NavLink>
                    </li>
                    <li className="navBarLink">
                        <NavLink to='/add-movie'>
                            Add Movie
                        </NavLink>
                    </li>
                    <li className="navBarLink">
                        <NavLink to='/my-favorites'>
                            My Favorites
                        </NavLink>
                    </li>
                    <li className="navBarLink">
                        <NavLink to='/add-upcoming'>
                            Add Upcoming
                        </NavLink>
                    </li>
                </ul>
            </aside>
        </nav>
    );
};

export default Navbar;