import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUpcoming = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
    const [descriptionErr, setDurationErr] = useState('')

    useEffect(() => {
        document.title = 'Add Upcoming | Film Fusion';
    }, [])

    const onSubmit = ({ moviePoster, movieName, releaseDate, description }) => {

        setDurationErr('')

        if (description.length > 75) {
            setDurationErr('Maximum Added 75 Characters Or one Line')
            return
        }

        fetch("https://film-fusion-0.vercel.app/upcomingMovies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ moviePoster, movieName, releaseDate, description }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successful add movie",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')
                }
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed add movie",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <section className="w-full h-auto flex items-center justify-center sm:py-12 p-6">
            <div className="w-full sm:w-[40%] lg:w-[50%] dark:bg-gray-700 bg-white rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5 shadow-md">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                    <h3 className="text-[1.8rem] font-[700] text-center">
                        Add Upcoming Movie
                    </h3>

                    <input
                        className="py-3 px-4 border focus:outline-color-accent border-gray-300 dark:bg-color-primary-d  rounded-lg w-full "
                        placeholder="Movie Poster Url"
                        {...register("moviePoster", { required: true })}
                    />

                    <input
                        className="py-3 px-4 border focus:outline-color-accent border-gray-300 dark:bg-color-primary-d  rounded-lg w-full "
                        placeholder="Movie Name"
                        {...register("movieName", { required: true })}
                    />

                    <input
                        type="date"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        placeholder="Please enter movie details"
                        className="py-3 px-4 border focus:outline-color-accent border-gray-300 dark:bg-color-primary-d  rounded-lg w-full  dark:placeholder-color-white placeholder-color-gray-600"
                        {...register("releaseDate", { required: true })}
                    />

                    <textarea
                        placeholder="Please enter movie details"
                        className="py-3 min-h-[150px] dark:bg-color-primary-d  font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                        {...register("description", { required: true })}
                    />
                    {
                        descriptionErr && (
                            <p className="text-[0.9rem] mt-1">
                                <span className="text-red-500 flex items-center gap-[5px]">
                                    <MdErrorOutline className="text-[1.1rem]" />
                                    {descriptionErr}
                                </span>
                            </p>
                        )
                    }

                    <div className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-[#3B82F6] text-white border-none font-bold outline-none rounded-lg mt-3"
                        >
                            Add Upcoming Movie
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddUpcoming;