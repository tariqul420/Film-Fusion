import { Outlet } from "react-router-dom";
import Footer from "../Components/Others/Footer";
import Navbar from "../Components/Others/Navbar/Navbar";

const Root = () => {
    return (
        <div className="min-h-screen flex flex-col font-Open-Sans bg-color-primary text-color-text">
            <Navbar />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;