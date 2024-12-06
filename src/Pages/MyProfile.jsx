

import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
    const { user } = useContext(AuthContext)
    const { displayName, email, photoURL } = user
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'My Profile | Film Fusion';
    }, [])

    return (
        <div className="w-11/12 lg:w-9/12 mx-auto my-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <h1 className="font-bold text-color-finely text-5xl">Welcome, </h1>
                <p className="font-bold text-color-accent lg:text-6xl text-4xl text-center md:text-4xl">{displayName}</p>
            </div>

            <div className="border-2 border-solid border-gray-500 shadow-md hover:shadow-lg p-12 rounded-lg flex flex-col lg:flex-row items-center justify-center gap-8 mt-8 dark:bg-gray-700 bg-gray-400">
                <div className="w-[400px] h-[400px] max-sm:w-[225px] max-sm:h-[225px] border-4 border-solid border-color-primary rounded-full">
                    <img className="w-full object-cover h-full rounded-full" src={photoURL} alt="" />
                </div>

                <hr />

                <div className="flex items-center justify-center flex-col lg:items-start">
                    <p className="text-center font-bold text-2xl">{email}</p>
                    <p className="mt-4 font-bold text-center text-3xl">{displayName}</p>

                    <button
                        onClick={() => navigate("/update-Profile")}
                        className="relative mt-8 inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-color-accent rounded-full shadow-md group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-color-primary-d group-hover:translate-x-0 ease">
                            <FaArrowRight size={25} />
                        </span>
                        <span
                            className="absolute flex items-center justify-center w-full h-full font-bold text-color-accent transition-all duration-300 transform group-hover:translate-x-full ease">Update Profile</span>
                        <span className="relative invisible">Update Profile</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;