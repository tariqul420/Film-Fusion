import { useLoaderData } from "react-router-dom";
import PopularCelebs from "../Components/Home/PopularCelebs";

const ReviewsCelebrities = () => {
    const reviews = useLoaderData()
    return (
        <section>
            <div className="w-11/12 lg:w-10/12 mx-auto mb-20">
                <h2 className="text-6xl font-bold text-center">User Reviews and Ratings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {
                        reviews.map(celebs => <PopularCelebs key={celebs.id} celebs={celebs} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default ReviewsCelebrities;