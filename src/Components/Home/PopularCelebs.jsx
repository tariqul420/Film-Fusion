import PropTypes from "prop-types";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const PopularCelebs = ({ celebs }) => {
    const { userImage, review, userName, location, rating, movieTitle } = celebs;

    const Stars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? (
                    <AiFillStar key={i} className="text-yellow-500" />
                ) : (
                    <AiOutlineStar key={i} className="text-gray-400" />
                )
            );
        }
        return stars;
    };

    return (
        <div
            className="shadow-lg border border-solid border-gray-300 p-6 rounded-xl bg-gray-700"
        >
            <div className="w-[100px] h-[100px] mx-auto">
                <img
                    src={userImage}
                    alt={userName}
                    className="rounded-full object-cover mx-auto w-full h-full"
                />
            </div>
            <p className="text-center mt-4 text-lg text-color-finely/80">
                &quot;{review}&quot;
            </p>
            <p className="text-center font-semibold mt-2 text-gray-200">
                {movieTitle}
            </p>
            <p className="text-center text-color-finely/60">{location}</p>
            <div className="flex justify-center mt-2">
                {Stars()}
            </div>
        </div>
    );
};

PopularCelebs.propTypes = {
    celebs: PropTypes.object.isRequired,
};

export default PopularCelebs;