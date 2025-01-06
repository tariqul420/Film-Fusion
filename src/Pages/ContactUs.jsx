
import toast from "react-hot-toast";

const ContactUs = () => {

    return (
        <section className="my-12 w-11/12 mx-auto">
            <div
                className="w-full lg:flex-row flex items-center gap-[30px] flex-col-reverse justify-between bg-[#0A0D17] p-[40px] rounded-xl mb-12">

                {/* form area */}
                <form
                    onClick={e => {
                        e.preventDefault()
                    }}
                    className="lg:w-[60%] w-full">

                    <div className="lg:w-[80%] w-full mx-auto">
                        <div className="text-white">
                            <h1 className="text-[1.7rem] font-[600] leading-[35px]">Let’s connect constellations</h1>
                            <p className="text-[0.9rem] mt-2 mb-8">Let&quot;s align our constellations! Reach out and
                                let the magic of collaboration illuminate our skies.</p>
                        </div>

                        <div className="flex sm:flex-row flex-col items-center gap-[20px]">
                            <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                                <input type="text"
                                    placeholder="Your name"
                                    className="peer border-[#383844] border rounded-md outline-none px-4 py-3 w-full bg-[#22222f] text-gray-400 transition-colors duration-300"
                                />
                            </div>

                            <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                                <input type="email"
                                    placeholder="Email address"
                                    className="peer border-[#383844] border rounded-md outline-none px-4 py-3 w-full bg-[#22222f] text-gray-400 transition-colors duration-300"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[5px] w-full mt-[20px]">
                            <textarea
                                placeholder="Write message"
                                className="peer min-h-[200px] border-[#383844] border rounded-md outline-none px-4 bg-[#22222f] py-3 w-full text-gray-400 transition-colors duration-300"
                            ></textarea>
                        </div>


                        <button
                            onClick={() => toast.success('Send Successfully!')}
                            type="submit"
                            className={`py-2.5 px-6 bg-gradient-to-r from-[#763AF5] to-[#A604F2] text-white rounded-md text-[1rem] mt-[10px] w-full`}>Send
                            it to the moon
                        </button>

                    </div>

                </form>

                {/*  image  */}
                <div className="">
                    <img src="https://i.ibb.co/h7rjVJS/Image.png" alt="image" className="w-full" />
                </div>
            </div>

            {/* Google Maps */}
            <div className="w-full h-[300px] lg:h-[450px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3637.4137417306374!2d89.31591357434364!3d24.262275268934644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1735187544107!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    className="rounded-3xl"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

        </section>
    );
};

export default ContactUs;
