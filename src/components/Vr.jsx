import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import vrMan from "../assets/recent-images/vr-man.png";

function Vr() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <motion.div
      className="h-96 lg:mt-20  lg:mb-56 mb-64 mt-20 mx-10  rounded-xl flex items-end p-6 relative "
      data-aos="fade-in"
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        backgroundImage: `url(${vrMan})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white text-black lg:rounded-xl p-6 lg:w-[80%] w-full lg:shadow-lg absolute left-0 lg:left-[20%] lg:right-0 lg:top-[15rem]  top-[100%] ">
        <div className="flex gap-x-2 font-body text-sm">
          <h1 className="font-heading font-bold">DEVELOPMENT</h1>
          <h1 className="text-black/70">16 March 2023</h1>
        </div>
        <h1 className="lg:h4 text-xl  font-bold mt-2 font-heading w-full lg:w-[50rem]">
          How to make a Game look more attractive with New VR & AI Technology
        </h1>
        <p className="mt-2 text-black/80 text-sm w-full lg:w-[50rem] font-body">
          Google has been investing in AI for many years and bringing its
          benefits to individuals, businesses, and communities. Whether it’s
          publishing state-of-the-art research, building helpful products or
          developing tools and resources that enable others, we’re committed to
          making AI accessible to everyone.
        </p>
        <button className="mt-4 border-2 border-purple-700 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-700 hover:text-white transition">
          Read More
        </button>
      </div>
    </motion.div>
  );
}

export default Vr;
