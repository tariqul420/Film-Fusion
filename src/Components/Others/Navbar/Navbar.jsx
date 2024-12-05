import { Link, NavLink } from "react-router-dom";
import AuthBtn from "./AuthBtn";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Profile from "./Profile";

const Navbar = () => {
    const { user } = useContext(AuthContext)

    return (
        <nav className="flex items-center justify-between relative boxShadow rounded-full px-[10px] py-[8px] w-11/12 mx-auto my-6">
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
                </ul>
            </div>

            <div>
                {
                    user ? <Profile /> : <AuthBtn />
                }
            </div>
        </nav>
    );
};

export default Navbar;