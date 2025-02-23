import React, { useState } from "react";
import Logo from "../uiUtils/Logo";
import Search from "../assets/search.png";
import menu from "../assets/menu.png";
import { motion } from "framer-motion";

function Navbar() {
  const [ham, setHam] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <div className="lg:flex justify-between px-10 items-center py-4 hidden">
        <Logo />
        <div className="flex gap-x-10 items-center">
          <button className="text-purple">Blog</button>
          <button>About</button>
          <img src={Search} alt="Search Icon" className="w-5 h-5" />
          <button className="bg-purple rounded-lg text-white px-4 py-2 button text-sm">
            Contact Us
          </button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex justify-between px-10 items-center py-4 lg:hidden relative">
        <Logo />
        <div className="flex items-center gap-x-5">
          <img src={Search} alt="Search Icon" className="w-5 h-5" />
          <button onClick={() => setHam(!ham)}>
            <img src={menu} alt="Menu Icon" className="w-10" />
          </button>
        </div>

        {/* Mobile Menu */}
        {ham && (
          <motion.div className="fixed inset-0 bg-light-gray z-50 flex flex-col items-center justify-start pt-10 space-y-6 text-black w-[50%] ml-[50%]">
            <button className="text-purple" onClick={() => setHam(false)}>
              Blog
            </button>
            <button onClick={() => setHam(false)}>About</button>
            <button
              className="bg-purple rounded-lg px-6 py-2 "
              onClick={() => setHam(false)}
            >
              Contact Us
            </button>
            <button
              className="absolute top-5 right-5 text-2xl"
              onClick={() => setHam(false)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Navbar;
