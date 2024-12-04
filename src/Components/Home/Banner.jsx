
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaPlayCircle } from "react-icons/fa";

const Banner = () => {
    const imageUrls = [
        "https://marketplace.canva.com/EAGNuvAF8I8/2/0/283w/canva-YA7kuG9KewU.jpg",
        "https://marketplace.canva.com/EAFqvaEANFY/1/0/283w/canva-aLPJuuY9tmM.jpg",
        "https://marketplace.canva.com/EAEJylE384g/5/0/283w/canva-f-yJnsOqPWg.jpg",
        "https://marketplace.canva.com/EAGLdOHqGp8/1/0/283w/canva-I9FuV6WTF_I.jpg",
        "https://marketplace.canva.com/EAGAdAXjr3g/1/0/286w/canva-MKd2KgrScFc.jpg",
        "https://marketplace.canva.com/EAE-1xJVR2o/1/0/283w/canva-sP2dH8ri47I.jpg",
        "https://marketplace.canva.com/EAFY-1-SBz8/1/0/283w/canva-03masmHo8o8.jpg",
        "https://marketplace.canva.com/EAGFeCqfuzw/2/0/283w/canva-9Wf7kgvk3DU.jpg",
        "https://marketplace.canva.com/EAFRPNYxq4s/1/0/251w/canva-U_56ho-V22I.jpg",
        "https://marketplace.canva.com/EAE_sV2u6-0/1/0/283w/canva-1FkJ30OiePY.jpg",
    ];

    return (
        <div className="swiper mySwiper w-11/12 lg:w-9/12 mx-auto mb-20">
            <Swiper
                modules={[Autoplay, Pagination]}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
            >
                {imageUrls.map((url, index) => (
                    <SwiperSlide key={index}>

                        <div
                            className="w-full sm:w-[80%] lg:w-full h-[473px] relative overflow-hidden group cursor-pointer rounded-md">

                            {/*  image  */}
                            <img
                                src={url}
                                alt="animated_card"
                                className="w-full h-full object-cover rounded-lg group-hover:scale-[1.1] transition-all duration-700" />

                            {/*  text  */}
                            <div
                                className="absolute top-[55%] transform group-hover:translate-y-[-50%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-center justify-center flex-col">
                                <button>
                                    <FaPlayCircle size={50} color="#3B82F6" />
                                </button>
                            </div>

                            {/*  bottom shadow  */}
                            <div
                                className="w-full opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 transition-all duration-500 bg-gradient-to-b from-[rgb(0,0,0,0.001)] to-[rgb(0,0,0)] h-[100%] absolute bottom-0 left-0 right-0"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-pagination"></div>
        </div>
    );
};

export default Banner;
