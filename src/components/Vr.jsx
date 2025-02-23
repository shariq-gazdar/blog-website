import { motion } from "framer-motion";
import vrMan from "../assets/recent-images/vr-man.png";

function Vr() {
  return (
    <motion.div
      className="h-96 my-10 w-[98%] mx-[1%] rounded-xl flex items-end p-6 relative"
      initial={{
        opacity: 0,
        x: 200,
      }}
      animate={{
        opacity: 1,
        x: 0,
        transition: [
          {
            type: "ease",
            stiffness: 100,
            damping: 20,
            delay: 0.5,
            duration: 1,
          },
        ],
      }}
      style={{
        backgroundImage: `url(${vrMan})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white text-black rounded-xl p-6 w-[80%] shadow-lg absolute right-0 top-63">
        <div className="flex gap-x-2 font-body text-sm">
          <h1 className="font-heading font-bold">DEVELOPMENT</h1>
          <h1 className="text-black/70">16 March 2023</h1>
        </div>
        <h1 className="h4 font-bold mt-2 font-heading w-[50rem]">
          How to make a Game look more attractive with New VR & AI Technology
        </h1>
        <p className="mt-2 text-black/80 text-sm w-[50rem] font-body">
          Google has been investing in AI for many years and bringing its
          benefits to individuals, businesses, and communities. Whether it’s
          publishing state-of-the-art research, building helpful products or
          developing tools and resources that enable others, we’re committed to
          making AI accessible to everyone.
        </p>
        <button className="mt-4 border-2 border-purple text-purple py-2 px-4 rounded-lg hover:bg-white hover:text-purple-700 transition">
          Read More
        </button>
      </div>
    </motion.div>
  );
}

export default Vr;
