import React from "react";
import backgroundPurple from "../assets/masked-image.png";
import aiImage from "../assets/Hero.png";
import { motion } from "framer-motion";
function Hero() {
  return (
    <motion.div
      className=" flex py-20 px-10 w-full justify-between"
      style={{
        backgroundImage: `url(${backgroundPurple})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className="flex flex-col text-white items-start"
        initial={{
          opacity: 0,
          x: -200,
        }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { duration: 1 },
        }}
      >
        <h6 className=" font-semibold">Featured Post</h6>
        <h1 className="h2 w-[29rem] font-heading  font-semibold mt-10">
          How Ai Will Change the Future
        </h1>
        <p className="w-96 text-sm font-semibold mb-10">
          The future of AI will see home robots having enhanced intelligence,
          increased capabilities, and becoming more personal and possibly cute.
          For example, home robots will overcome navigation, direction
        </p>
        <button className="font-semibold text-black bg-white button rounded-sm">
          Read More
        </button>
      </motion.div>
      <motion.img
        initial={{
          opacity: 0,
          x: 200,
        }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { duration: 1 },
        }}
        src={aiImage}
        alt=""
        className="w-96"
      />
    </motion.div>
  );
}

export default Hero;
