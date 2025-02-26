import React from "react";
import { motion } from "framer-motion";
function HowWeWork() {
  return (
    <div className="flex flex-col px-32 text-sm font-semibold text-gray py-32 ">
      <h1 className="font-heading">HOW WE WORK</h1>
      <div className="flex justify-between items-end">
        <h1 className="text-3xl text-black font-semibold w-[30%]">
          I will show you how our team works
        </h1>
        <h6 className="text-xs w-[30%]">
          Bring to the table win-win market strategies to ensure perfect
          articles.
        </h6>
      </div>
      <div className="cards flex justify-between font-heading py-20">
        <motion.div
          className="flex flex-col items-start w-80 hover:bg-purple hover:text-white p-5 rounded-2xl gap-y-3 min-h-80 border border-purple transition-all duration-[10000000ms ] ease-in-out"
          whileHover={{
            scale: 1.02,
          }}
        >
          <h1 className="text-5xl">01</h1>
          <h2 className="text-xl">Brainstorming</h2>
          <p className="flex-grow">
            Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a new normal that
            has evolved from generation X is on the runway heading towards a
            streamlined cloud solution. User generated
          </p>
          <div className="mt-auto">
            <button className="hover:underline underline-offset-8">
              Learn more..
            </button>
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col items-start w-80 hover:bg-purple hover:text-white p-5 rounded-2xl gap-y-3 min-h-80 border border-purple transition-all duration-[0.6s] ease-in-out"
          whileHover={{
            scale: 1.02,
          }}
        >
          <h1 className="text-5xl">02</h1>
          <h2 className="text-xl">Analysing</h2>
          <p className="flex-grow">
            Capitalize on low hanging fruit to identify a ballpark value added
            activity to beta test. Override the digital divide with additional
            clickthroughs from DevOps. Nanotechnology immersion along the
            information highway will close the loop on focusing solely on the
            bottom line solely on the bottom line.
          </p>
          <div className="mt-auto">
            <button className="hover:underline underline-offset-8">
              Learn more..
            </button>
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col items-start w-80 hover:bg-purple hover:text-white p-5 rounded-2xl gap-y-3 min-h-80 border border-purple transition-all duration-[10000000ms ] ease-in-out"
          whileHover={{
            scale: 1.02,
          }}
        >
          <h1 className="text-5xl">03</h1>
          <h2 className="text-xl">News Publishing</h2>
          <p className="flex-grow">
            Leverage agile frameworks to provide a robust synopsis for high
            level overviews. Iterative approaches to corporate strategy foster
            collaborative thinking to further the overall value proposition.
            Organically grow the holistic world view of disruptive innovation
            via workplace diversity and empowerment.
          </p>
          <div className="mt-auto">
            <button className="hover:underline underline-offset-8">
              Learn more..
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HowWeWork;
