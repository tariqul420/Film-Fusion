
import { useContext, useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [active, setActive] = useState(false);
    const { signInUser, socialAuth, setEmail } = useContext(AuthContext)
    console.log(location);

    useEffect(() => {
        document.title = 'Login | Film Fusion';
    }, [])

    const googleProvider = new GoogleAuthProvider();

    const handelSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location.state ? location.state : '/')
            })
            .catch((error) => {
                if (error.code === "auth/invalid-credential") {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Invalid email or password",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handelReset = () => {
        navigate("/login/forgot-password")
    }

    const handelGoogle = (googleProvider) => {
        socialAuth(googleProvider)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location.state ? location.state : '/')
            })
            .catch((error) => {
                if (error.code === "auth/invalid-credential") {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Invalid email or password",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    }

    return (
        <>
            {
                location.pathname === '/login' ? (
                    <section className="w-full h-auto flex items-center justify-center sm:py-12 p-6">
                        <div className="w-full lg:w-[40%] md:w-[60%] dark:bg-gray-700 bg-white rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5 shadow-md">
                            <form onSubmit={handelSignIn} className="w-full flex flex-col gap-5">
                                <h3 className="text-[1.8rem] font-[700] text-center">
                                    Login
                                </h3>

                                <div className="w-full relative">
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="py-3 px-4 border focus:outline-blue-500 border-gray-300 rounded-lg dark:bg-color-primary-d w-full"
                                    />
                                </div>

                                <div className="w-full relative">
                                    <input
                                        type={active ? "text" : "password"}
                                        placeholder="Password"
                                        required
                                        name="password"
                                        className="py-3 px-4 border focus:outline-blue-500 border-gray-300 rounded-lg w-full dark:bg-color-primary-d"
                                    />
                                    {active ? (
                                        <BsEyeSlash
                                            className=" absolute top-[30%] right-[5%] text-[1.2rem] text-gray-500 cursor-pointer"
                                            onClick={() => setActive(false)}
                                        />
                                    ) : (
                                        <BsEye
                                            className=" absolute top-[30%] right-[5%] text-[1.2rem] text-gray-500 cursor-pointer"
                                            onClick={() => setActive(true)}
                                        />
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <span className="text-[1rem] text-color-primary2 font-[500]">Remember Me</span>
                                    </label>
                                    <p onClick={handelReset} className="text-[1rem] text-color-primary2 font-[500] cursor-pointer">
                                        Forget password
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-color-accent font-bold border-none outline-none rounded-lg mt-3">
                                    Login
                                </button>
                            </form>

                            <div className="flex items-center justify-center w-full gap-1">
                                <span className="text-[1rem] dark:text-gray-400 font-[500]">
                                    Don&apos;t have an account?{" "}
                                </span>
                                <span>
                                    <Link to={"/register"} className="text-[1rem] text-color-primary2 font-[500]">
                                        Register
                                    </Link>
                                </span>
                            </div>

                            <div className="w-full my-1 flex items-center justify-center gap-3">
                                <hr className="w-[45%] bg-gray-400 h-[2px]" />
                                <p>or</p>
                                <hr className="w-[45%] bg-gray-400 h-[2px]" />
                            </div>

                            <button onClick={() => handelGoogle(googleProvider)} className="flex items-center justify-center py-2 px-4 gap-4 border border-gray-300 rounded-lg w-full text-[1rem] font-medium">
                                <FcGoogle className="text-[2rem]" />
                                Sign In with Google
                            </button>
                        </div>
                    </section>
                ) : (
                    <Outlet />)
            }
        </>
    );
};

export default Login;
