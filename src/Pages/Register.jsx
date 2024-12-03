import { useContext, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";


const Register = () => {
    const navigate = useNavigate()
    const [active, setActive] = useState(false);
    const { socialAuth, createUser, updateUserProfile } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();

    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [strongPassword, setStrongPassword] = useState(" ");
    const [confirmPass, setConfirmPass] = useState("")
    const [signal, setSignal] = useState(" ");
    const [passMatch, setPassMatch] = useState("");

    const handleStrongPasswordChecker = (e) => {
        const password = e.target.value;
        setStrongPassword(password);

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasUpperCase) {
            setSignal("Password must contain at least one uppercase letter.");
        } else if (!hasLowerCase) {
            setSignal("Password must contain at least one lowercase letter.");
        } else if (!hasNumber) {
            setSignal("Password must contain at least one number.");
        } else if (!hasSymbol) {
            setSignal("Password must contain at least one special character.");
        } else if (password.length < 8) {
            setSignal("Password must be at least 8 characters long.")
        } else {
            setSignal("Password is strong!");
        }
    };

    const handelPasswordCheck = (e) => {
        const password = e.target.value
        setConfirmPass(password)
        if (strongPassword !== confirmPass) {
            setPassMatch("Password do not match!")
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();

        const fullName = e.target.fullName.value;
        const photoUrl = e.target.photoUrl.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPass = e.target.confirmPassword.value;

        if (signal !== "Password is strong!") {
            setSignal("Password is not strong enough.")
            return;
        }

        if (password !== confirmPass) {
            setPassMatch("Passwords don't match.");
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUserProfile({ displayName: fullName, photoURL: photoUrl })
                    .then(() => {
                        toast.success("Register Successful.")
                    })
                    .catch(() => {
                        toast.error("Not update Your Profile.")
                    })
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    navigate("/login")
                    return toast.error("User already exists!");
                }
            });

        navigate("/")
    };

    return (
        <>
            <section className="w-full h-auto flex items-center justify-center sm:py-12 p-6 bg-[#1F2937]">
                <div className="w-full sm:w-[900px] sm:max-w-[1000px] bg-gray-700 shadow-md backdrop-blur-3xl rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5">
                    <form onSubmit={handleRegister} className="w-full flex flex-col gap-5">
                        <h3 className="text-[1.8rem] font-[700] text-[#1F2937] text-center">
                            Register
                        </h3>
                        <div className="flex items-center justify-between gap-4 w-full mt-5 sm:flex-row flex-col">
                            <input
                                required
                                type="text"
                                name="fullName"
                                placeholder="Full  name"
                                className="py-3 text-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />
                            <input
                                required
                                type="text"
                                name="photoUrl"
                                placeholder="Photo URL"
                                className="py-3 text-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                            />
                        </div>

                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="py-3 text-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                        />

                        <div className="w-full flex items-center gap-4 justify-between sm:flex-row flex-col">
                            {/* Password */}
                            <div className="w-full relative">
                                <input
                                    required
                                    type={isEyeOpen ? "text" : "password"}
                                    name="password"
                                    onChange={handleStrongPasswordChecker}
                                    placeholder="Password"
                                    className="py-3 text-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                                />

                                {strongPassword !== " " && signal !== "Password is strong!" && (
                                    <p className="text-[0.9rem] mt-1">
                                        <span className="text-red-500 flex items-center gap-[5px]">
                                            <MdErrorOutline className="text-[1.1rem]" />
                                            {signal}
                                        </span>
                                    </p>
                                )}

                                {isEyeOpen ? (
                                    <BsEyeSlash
                                        className="absolute top-4 right-4 text-[1.2rem] text-[#777777] cursor-pointer"
                                        onClick={() => setIsEyeOpen(false)}
                                    />
                                ) : (
                                    <BsEye
                                        className="absolute top-4 right-4 text-[1.2rem] text-[#777777] cursor-pointer"
                                        onClick={() => setIsEyeOpen(true)}
                                    />
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="w-full relative">
                                <input
                                    required
                                    type={active ? "text" : "password"}
                                    onChange={handelPasswordCheck}
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    className="py-3 text-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                                />

                                {confirmPass !== "" && confirmPass !== strongPassword && (
                                    <p className="text-[0.9rem] mt-1">
                                        <span className="text-red-500 flex items-center gap-[5px]">
                                            <MdErrorOutline className="text-[1.1rem]" />
                                            {passMatch}
                                        </span>
                                    </p>
                                )}

                                {active ? (
                                    <BsEyeSlash
                                        className="absolute top-4 right-4 text-[1.2rem] text-[#777777] cursor-pointer"
                                        onClick={() => setActive(false)}
                                    />
                                ) : (
                                    <BsEye
                                        className="absolute top-4 right-4 text-[1.2rem] text-[#777777] cursor-pointer"
                                        onClick={() => setActive(true)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-[#3B82F6] text-white border-none font-bold outline-none rounded-lg mt-3"
                            >
                                Register
                            </button>
                        </div>
                        <div className="flex items-center justify-center w-full gap-1">
                            <span className="text-[1rem] text-gray-600 font-[500]">
                                Already have an account?{" "}
                            </span>
                            <span>
                                <Link to={"/login"} className="text-[1rem] text-[#3B82F6] font-[500]">
                                    Login
                                </Link>
                            </span>
                        </div>
                    </form>

                    <div className="w-full my-1 flex items-center justify-center gap-3">
                        <hr className="w-[45%] bg-gray-400 h-[2px]" />
                        <p>or</p>
                        <hr className="w-[45%] bg-gray-400 h-[2px]" />
                    </div>

                    <button
                        onClick={() => { socialAuth(googleProvider), navigate('/') }}
                        className="flex items-center justify-center py-2 px-4 gap-4 border border-gray-300 rounded-lg w-full text-[1rem] font-[500] text-gray-600"
                    >
                        <FcGoogle className="text-[2rem]" />
                        Sign Up with Google
                    </button>
                </div>
            </section>
        </>
    );
};

export default Register;
