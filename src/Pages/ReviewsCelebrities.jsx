import Reviews from "../Components/ReviewsCelebrities/Reviews";
import Slider from "react-slick";
import { useEffect, useState } from "react";

const ReviewsCelebrities = () => {
    const [reviewsData, setReviewsData] = useState([])
    const [celebritiesData, setCelebritiesData] = useState([])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        centerMode: true,
        centerPadding: "0px",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {
        document.title = 'Reviews & Celebrities | Film Fusion';
    }, [])

    useEffect(() => {
        fetch('/UserReviews.json')
            .then(res => res.json())
            .then(data => setReviewsData(data))

        fetch('/celebrities.json')
            .then(res => res.json())
            .then(data => setCelebritiesData(data))
    }, [])

    const handelCelebrities = () => {
        window.open("https://www.imdb.com/chart/starmeter/?ref_=hm_mpc_sm", "_blank");
    }

    return (
        <section className="w-11/12 lg:w-10/12 mx-auto">
            <div className="mb-28">
                <h2 className="text-6xl font-bold text-center">Most Popular Celebrities</h2>
                <div className="mt-16">
                    <Slider {...settings}>
                        {
                            celebritiesData?.map((celebrities, index) => <div key={index} className="px-2">
                                <div className="dark:bg-gray-700 bg-white shadow-sm hover:shadow-md p-4 rounded-xl flex items-center justify-center flex-col">
                                    <img className="w-[200px] h-[200px] rounded-full object-cover" src={celebrities.image} alt="" />
                                    <h2 className="text-center font-semibold text-2xl mt-4">{celebrities.name}</h2>
                                </div>
                            </div>)
                        }
                    </Slider>
                </div>

                <button
                    onClick={handelCelebrities}
                    className="border-2 px-5 py-2 rounded-full border-solid text-color-primary  border-color-accent font-semibold text-lg bg-color-accent mt-12 block mx-auto">
                    See All Celebrities
                </button>
            </div>


            <div className="mb-20">
                <h2 className="text-6xl font-bold text-center">User Reviews and Ratings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {
                        reviewsData?.map(review => <Reviews key={review.id} reviews={review} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default ReviewsCelebrities;