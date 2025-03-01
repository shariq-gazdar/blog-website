import React from "react";
import { auth } from "../config/firebase";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import home from "../assets/home.png";
function Profile() {
  const navigate = useNavigate();
  return (
    <div className="bg-light-gray/5 ">
      <div className="w-full h-screen flex justify-start  items-center flex-col ">
        <img
          src={home}
          alt=""
          className="w-10 bg-light-gray/5 float-end self-start mb-32 m-2 "
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="bg-white flex flex-col items-center p-4 gap-y-2 rounded-lg shadow-2xl">
          <img
            src={auth?.currentUser?.photoURL}
            alt=""
            className="rounded-full"
          />
          <span>Name: {auth?.currentUser?.displayName}</span>
          <span>Email: {auth?.currentUser?.email}</span>
          <motion.button
            className="bg-red-500 text-white text-sm w-full py-1 rounded-sm"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
            onClick={() => {
              signOut(auth);
              navigate("/");
            }}
          >
            Sign Out
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
