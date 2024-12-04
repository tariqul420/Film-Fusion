import { useState } from "react";

const AddMovie = () => {
    const genresList = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Adventure", "Romance", "Thriller"];
    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleGenreClick = (genre) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((item) => item !== genre) : [...prev, genre]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        // Get form field values
        const MoviePoster = form.MoviePoster.value;
        const MovieTitle = form.MovieTitle.value;
        const Duration = form.Duration.value;
        const ReleaseYear = form.ReleaseYear.value;
        const Rating = form.Rating.value;
        const Summary = form.Summary.value;

        const newMovie = {
            MoviePoster,
            MovieTitle,
            Duration,
            ReleaseYear,
            Rating,
            Summary,
            Genres: selectedGenres,
        };

        fetch('http://localhost:5000/movies', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newMovie)
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
            })
    };


    return (
        <section className="w-full h-auto flex items-center justify-center sm:py-12 p-6 bg-[#1F2937]">
            <div className="w-full sm:w-[900px] sm:max-w-[1000px] bg-gray-700 shadow-md backdrop-blur-3xl rounded-lg sm:py-6 sm:px-8 p-4 flex flex-col gap-5">
                <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
                    <h3 className="text-[1.8rem] font-[700] text-center text-white">
                        Add Movie
                    </h3>

                    <div className="flex items-center justify-between gap-4 w-full mt-5 sm:flex-row flex-col">
                        <input
                            required
                            type="text"
                            name="MoviePoster"
                            placeholder="Movie Poster Url"
                            className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                        />
                        <input
                            required
                            type="text"
                            name="MovieTitle"
                            placeholder="Movie Title"
                            className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4 w-full mt-5 sm:flex-row flex-col">
                        <input
                            required
                            type="text"
                            name="Duration"
                            placeholder="Duration (in minutes)"
                            className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                        />
                        <input
                            required
                            type="text"
                            name="ReleaseYear"
                            placeholder="Release Year"
                            className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4 w-full mt-5 sm:flex-row flex-col">
                        <input
                            required
                            type="text"
                            name="Rating"
                            placeholder="Rating (1-10)"
                            className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                        />
                        <input
                            required
                            type="text"
                            name="Summary"
                            placeholder="Summary"
                            className="py-3 bg-color-primary font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full"
                        />
                    </div>

                    {/* Genre Selection */}
                    <div className="w-full">
                        <label className="block mb-3 text-sm font-medium text-white">
                            Select Genres:
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {genresList.map((genre, index) => (
                                <label
                                    key={index}
                                    onClick={() => handleGenreClick(genre)}
                                    className={`flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer transition 
                                    ${selectedGenres.includes(genre)
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-600 text-white hover:bg-gray-500"
                                        }`}
                                >
                                    {genre}
                                </label>
                            ))}
                        </div>
                    </div>


                    <div className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-[#3B82F6] text-white border-none font-bold outline-none rounded-lg mt-3"
                        >
                            Add Movie
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddMovie;
