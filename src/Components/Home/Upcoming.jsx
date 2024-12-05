const Upcoming = () => {
    return (
        <section className="upcoming-releases py-12 bg-[#1F2937]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-white text-center mb-8">Upcoming Releases</h2>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-8">
                    <div className="movie-card bg-gray-700 p-4 rounded-lg shadow-lg">
                        <img src="upcoming1.jpg" alt="Upcoming Movie 1" className="w-full rounded-lg mb-4" />
                        <h3 className="text-xl text-white font-semibold">Upcoming Movie 1</h3>
                        <p className="text-gray-400 mb-2">Release Date: 2025-03-15</p>
                        <p className="text-gray-300 mb-2">A brief description of the movie...</p>
                    </div>
                    <div className="movie-card bg-gray-700 p-4 rounded-lg shadow-lg">
                        <img src="upcoming2.jpg" alt="Upcoming Movie 2" className="w-full rounded-lg mb-4" />
                        <h3 className="text-xl text-white font-semibold">Upcoming Movie 2</h3>
                        <p className="text-gray-400 mb-2">Release Date: 2025-04-20</p>
                        <p className="text-gray-300 mb-2">A brief description of the movie...</p>
                    </div>
                    <div className="movie-card bg-gray-700 p-4 rounded-lg shadow-lg">
                        <img src="upcoming3.jpg" alt="Upcoming Movie 3" className="w-full rounded-lg mb-4" />
                        <h3 className="text-xl text-white font-semibold">Upcoming Movie 3</h3>
                        <p className="text-gray-400 mb-2">Release Date: 2025-06-10</p>
                        <p className="text-gray-300 mb-2">A brief description of the movie...</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Upcoming;