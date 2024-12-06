import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
    const { updateUserProfile, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Update Profile | Film Fusion';
    }, [])

    const { register, handleSubmit } = useForm();
    const onSubmit = ({ fullName, photoUrl }) => {

        updateUserProfile({ displayName: fullName, photoURL: photoUrl })
            .then(() => {
                setUser((prevUser) => ({
                    ...prevUser,
                    displayName: fullName,
                    photoURL: photoUrl,
                }));
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successful Update Profile",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/my-profile')
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed Update Profile",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    };
    return (
        <section className="w-full h-auto flex items-center justify-center sm:py-12 p-6">
            <div className="w-full sm:w-[40%] dark:bg-gray-700 rounded-lg bg-gray-300 sm:py-6 sm:px-8 p-4 flex flex-col gap-5 shadow-md">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                    <h3 className="text-[1.8rem] font-[700]  text-center">
                        Update Profile
                    </h3>

                    <input
                        className="py-3 px-4 border focus:outline-color-primary border-gray-300 dark:bg-color-primary-d bg-gray-200 rounded-lg w-full"
                        placeholder="Full Name"
                        {...register("fullName", { required: true })} />

                    <input
                        className="py-3 px-4 border focus:outline-color-primary border-gray-300 dark:bg-color-primary-d bg-gray-200 rounded-lg w-full"
                        placeholder="Photo Url"
                        {...register("photoUrl", { required: true })} />

                    <div className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-[#3B82F6] text-white border-none font-bold outline-none rounded-lg mt-3"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateProfile;


