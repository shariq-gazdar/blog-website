import React, { useState } from "react";
import Logo from "../uiUtils/Logo";
import Search from "../assets/search.png";
import menu from "../assets/menu.png";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [ham, setHam] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <div className="lg:flex justify-between px-10 items-center py-4 hidden bg-white">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <div className="flex gap-x-10 items-center">
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive ? "text-purple font-bold" : "text-gray"
            }
          >
            <button>Blog</button>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-purple font-bold" : "text-gray"
            }
          >
            <button>About</button>
          </NavLink>
          <img src={Search} alt="Search Icon" className="w-5 h-5" />
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-purple font-bold" : "text-gray"
            }
          >
            <motion.button
              className="bg-purple rounded-lg text-white px-4 py-2 button text-sm"
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.9,
                transition: { duration: 0.2 },
              }}
            >
              Contact Us
            </motion.button>
          </NavLink>
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
          <motion.div className="fixed inset-0 bg-purple z-50 flex flex-col items-center justify-start pt-10 space-y-6 text-white w-[50%] ml-[50%]">
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive ? "text-black font-bold" : "text-gray"
              }
              onClick={() => setHam(false)}
            >
              Blog
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-black font-bold" : "text-gray"
              }
              onClick={() => setHam(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-purple font-bold" : "text-gray"
              }
            >
              <button className="bg-purple rounded-lg text-white px-4 py-2 button text-sm">
                Contact Us
              </button>
            </NavLink>
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
