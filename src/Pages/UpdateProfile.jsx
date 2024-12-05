

import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const { updateUserProfile, setUser, user } = useContext(AuthContext)
    const navigate = useNavigate()

    const handelUpdateProfile = (e) => {
        e.preventDefault()

        const fullName = e.target.fullName.value;
        const photoUrl = e.target.photoUrl.value;
        const email = user.email

        updateUserProfile({ displayName: fullName, photoURL: photoUrl })
            .then(() => {
                const updateProfile = { fullName, photoUrl, email }

                fetch('https://espresso-emporium-server-theta.vercel.app/users/updateUserProfile', {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updateProfile)
                })
                    .then(res => res.json())
                    .then(() => {
                        setUser((prevUser) => ({
                            ...prevUser,
                            displayName: fullName,
                            photoURL: photoUrl,
                        }));
                        toast.success('Update Your Profile')
                        navigate("/my-profile")
                    })
                    .catch(() => {
                        toast.error("Not update Your Profile.")
                    })
            })
    }

    return (
        <section className="w-full h-auto flex items-center justify-center sm:py-12 p-6">
            <div className="w-full sm:w-[40%] bg-white rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5 shadow-md">

                <form onSubmit={handelUpdateProfile} className="w-full flex flex-col gap-5">
                    <h3 className="text-[1.8rem] font-[700] text-gray-900 text-center">
                        Update Profile
                    </h3>

                    <input
                        required
                        type="text"
                        name="fullName"
                        placeholder="Full name"
                        className="py-3 px-4 border focus:outline-color-primary border-gray-300 rounded-lg w-full"
                    />

                    <input
                        required
                        type="text"
                        name="photoUrl"
                        placeholder="Photo URL"
                        className="py-3 px-4 border focus:outline-color-primary border-gray-300 rounded-lg w-full"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 px-4 border border-solid border-color-primary font-bold text-color-primary hover:text-white transition-all duration-300 hover:bg-color-primary outline-none rounded-lg mt-3">
                        Update
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UpdateProfile;
