import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import home from "../assets/home.png";
import { useFirebaseContext } from "../contexts/FirebaaseContext";

function Profile() {
  const navigate = useNavigate();
  const { blogs } = useFirebaseContext();
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Initially true

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign Out Error", error);
      });
  };

  useEffect(() => {
    if (blogs) {
      setLoading(true);
      const userBlogs = blogs.filter(
        (blog) => blog.author === auth?.currentUser?.email.split("@")[0]
      );
      setFilteredBlogs(userBlogs);
      setLoading(false);
    }
  }, [blogs]);

  return (
    <div className="bg-light-gray/5 h-screen">
      {/* Header */}
      <div className="flex justify-between items-center px-10 py-2 bg-light-gray/10">
        <div className="flex items-center gap-x-5">
          <img
            src={auth?.currentUser?.photoURL}
            alt={auth?.currentUser?.email}
            className="rounded-full w-16"
          />
          <h1>{auth?.currentUser?.email}</h1>
          <p>{auth?.currentUser?.displayName}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <motion.button
            className="bg-red-500 px-3 py-2 text-white text-sm rounded-full cursor-pointer"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            onClick={signOutUser}
          >
            SignOut
          </motion.button>
          <motion.img
            src={home}
            alt="Home"
            className="w-12 h-12 hover:opacity-75 cursor-pointer"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      {/* Blog Section */}
      <div className="p-5">
        {loading ? (
          // Loading Animation
          <div className="flex flex-col items-center justify-center h-40">
            <div className="w-20 h-20 border-4 border-transparent border-t-blue-400 animate-spin rounded-full flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-transparent border-t-red-400 animate-spin rounded-full"></div>
            </div>
          </div>
        ) : // Blog List
        filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, index) => (
            <motion.div
              key={index} // Unique key
              className="flex gap-4 py-5 px-8 bg-white rounded-md shadow-md mb-4 justify-between items-center"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              onClick={() => {
                navigate(`/blog/${blog.id}`);
              }}
            >
              <div className="flex gap-x-2">
                <img
                  src={blog.coverPage}
                  alt={blog.title}
                  className="w-20 rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-bold">{blog.title}</h2>
                  <p className="text-gray-500">{blog.genre}</p>
                  <p className="text-gray-500">
                    {blog.publishDate.toDate().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="controls">Edit</div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
