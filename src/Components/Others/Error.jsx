

import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center min-h-screen w-full"
            style={{ background: "url(https://i.ibb.co/02DvRcV/404.jpg)", backgroundSize: "cover" }}>
            <div className="w-11/12 mx-auto">
                <div className="boxShadow px-10 py-16 flex flex-col justify-center items-start rounded-xl w-full lg:w-[50%] h-auto">
                    <h1 className="text-[15vw] leading-none font-bold text-center text-border font-mono" style={{ color: "transparent", WebkitTextStroke: "5px white" }}>404</h1>
                    <h2 className="text-[1.1rem] sm:text-[3rem] font-[700] text-white">
                        Oops! Page not found
                    </h2>

                    <p className="text-[1.2rem] font-semibold text-white">Sorry, the page you are looking for does not exist. If you think something is broken, report a problem.</p>

                    <button onClick={() => navigate("/")} className="py-3 px-8 font-bold w-max rounded-full bg-[#92E3A9] hover:bg-[#4ec46f] text-white mt-5">
                        BACK TO HOME
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Error;
