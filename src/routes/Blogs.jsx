import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostCards from "../uiUtils/PostCards";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { useFirebaseContext } from "../contexts/FirebaaseContext";
import { db, auth } from "../config/firebase";
import { motion } from "framer-motion";
function Blogs() {
  const navigate = useNavigate();
  const { blogs } = useFirebaseContext();
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);
  const formatDate = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleDateString(); // Converts to readable date
    }
    return "Unknown Date"; // Fallback in case it's not a timestamp
  };

  return (
    <div>
      <Navbar />
      <section className="font-body bg-light-gray/5 pb-52 flex flex-col items-center">
        <div className="text-section flex flex-col items-center gap-y-3 py-10">
          <p className="font-heading text-sm">Our Blogs</p>
          <h2 className="font-heading text-3xl font-semibold text-center w-[70%] lg:w-full">
            Find all our blogs here
          </h2>
          <p className="font-heading text-sm w-[95%] lg:w-[50%] text-center">
            Our blogs are written with thorough research by well-known writers
            to provide you with the best articles to read.
          </p>
        </div>

        {/* Display blogs */}
        <div className="flex flex-wrap justify-start mx-10 gap-6">
          {blogs.map((blog) => (
            <div>
              <PostCards
                key={blog.id}
                image={blog.coverPage}
                title={blog.title}
                content={blog.content}
                genre={blog.genre}
                publishDate={formatDate(blog.publishDate)}
                id={blog.id}
              />
            </div>
          ))}
        </div>

        <motion.button
          className="bg-purple p-2 w-32 text-white rounded-lg mt-5"
          onClick={() =>
            currentUser ? navigate("/create") : navigate("/signup")
          }
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
        >
          Create Blog
        </motion.button>
      </section>
      <Footer />
    </div>
  );
}

export default Blogs;
