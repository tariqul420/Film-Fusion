
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
                        <img
                            src={url}
                            alt={`Image ${index + 1}`}
                            className="w-full h-[473px] object-cover rounded-lg"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-pagination"></div>
        </div>
    );
};

export default Banner;
