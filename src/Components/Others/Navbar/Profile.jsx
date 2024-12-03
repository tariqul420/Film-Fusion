import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const Profile = () => {
    const [isProfileHovered, setIsProfileHovered] = useState(false);
    const { user } = useContext(AuthContext)

    return (
        <div className="relative w-fit h-full flex items-center justify-center"
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
        >
            {/*  initial profile picture  */}
            <Link to='/my-profile'>
                <img
                    src={user?.photoURL}
                    alt="profile"
                    className="w-[50px] h-[50px] rounded-full object-cover border-[3px] cursor-pointer border-color-primary" />
            </Link>

            {/*  tooltip  */}
            <div
                className={` ${isProfileHovered ? "opacity-100 z-20 translate-y-0" : "opacity-0 z-[-1] translate-y-[20px]"} absolute bottom-[-155px] left-[50%] transform translate-x-[-50%] bg-white w-[250px] rounded-md p-[15px] shadow-md transition-all duration-300`}>

                {/*  account details  */}
                <div className="flex items-center justify-center flex-col">
                    <div className="relative">
                        <img
                            src={user?.photoURL}
                            alt="profile"
                            className="w-[80px] border-4 border-solid border-color-primary h-[80px] rounded-full object-cover" />
                        <div
                            className="w-[10px] h-[10px] rounded-full bg-green-400 absolute top-[7px] right-[8px] border-[2px] border-white"></div>
                    </div>
                    <h4 className="text-[1.1rem] font-[600] text-gray-700 mt-2">{user?.displayName}</h4>
                </div>

                {/*  bottom arrow  */}
                <div
                    className="bg-white w-[15px] h-[15px] rotate-[45deg] absolute top-[-7px] left-[50%] transform translate-x-[-50%]"></div>
            </div>
        </div>
    );
};

export default Profile;
