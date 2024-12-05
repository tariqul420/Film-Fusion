import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [isProfileHovered, setIsProfileHovered] = useState(false);
    const { user, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div className="relative w-fit h-full flex items-center justify-center lg:min-w-[260px]"
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
        >
            {/*  initial profile picture  */}
            <img
                src={user?.photoURL}
                alt="profile"
                className="w-[50px] h-[50px] rounded-full object-cover border-[3px] cursor-pointer border-color-accent" />

            {/*  tooltip  */}
            <div
                className={` ${isProfileHovered ? "opacity-100 z-20 translate-y-0" : "opacity-0 z-[-1] translate-y-[20px]"} absolute bottom-[-260px] left-[-50%] md:left-[50%] transform translate-x-[-50%] bg-gray-700 w-[250px] rounded-md p-[15px] shadow-md transition-all duration-300`}>

                {/*  account details  */}
                <div className="flex items-center justify-center flex-col">
                    <div className="relative">
                        <img
                            src={user?.photoURL}
                            alt="profile"
                            className="w-[80px] border-4 border-solid border-color-accent h-[80px] rounded-full object-cover" />
                        <div
                            className="w-[10px] h-[10px] rounded-full bg-green-400 absolute top-[7px] right-[8px] border-[2px] border-white"></div>
                    </div>
                    <h4 className="text-[1.1rem] font-[600] mt-2">{user?.displayName}</h4>


                    <button
                        onClick={() => navigate('/my-profile')}
                        className="border-2 px-5 py-1 hover:bg-color-accent hover:text-color-text rounded-full border-solid border-color-accent font-semibold text-lg mt-3">
                        My Profile
                    </button>
                    <button
                        onClick={logoutUser}
                        className="border-2 px-5 py-1 hover:bg-color-accent hover:text-color-text rounded-full border-solid border-color-accent font-semibold text-lg mt-3">
                        Log Out
                    </button>
                </div>

                {/*  bottom arrow  */}
                <div
                    className="bg-gray-700 w-[15px] h-[15px] rotate-[45deg] absolute top-[-7px] left-[50%] transform translate-x-[-50%]"></div>
            </div>
        </div>
    );
};

export default Profile;
