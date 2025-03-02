{
  /* <div className="flex justify-center items-center gap-x-1 flex-wrap lg:flex-nowrap gap-y-10 lg:gap-y-0">
          {recents.map((recent) => (
            <PostCards
              key={recent.title} // Add a unique key if available
              image={recent.image}
              title={recent.title}
              content={recent.content}
              genre={recent.genre}
              publishDate={recent.publishDate}
            />
          ))}
        </div>
        <div className="flex justify-center items-center gap-x-1 flex-wrap lg:flex-wrap gap-y-10 lg:gap-y-5 py-5  ">
          {populars.map((popular) => (
            <PostCards
              key={popular.title} // Add a unique key if available
              image={popular.image}
              title={popular.title}
              content={popular.content}
              genre={popular.genre}
              publishDate={popular.publishDate}
            />
          ))}
        </div> */
}
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostCards from "../uiUtils/PostCards";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { Timestamp } from "firebase/firestore";
import { div } from "framer-motion/client";
function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const formatDate = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleDateString(); // Converts to readable date
    }
    return "Unknown Date"; // Fallback in case it's not a timestamp
  };
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

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
        <div className="flex flex-wrap justify-center gap-5">
          {blogs.map((blog) => (
            <div
            // onClick={() => {
            //   navigate(`/blog/${blog.id}`);
            // }}
            >
              <PostCards
                key={blog.id}
                image={blog.coverPage}
                title={blog.title}
                content={blog.content}
                genre={blog.genre}
                publishDate={formatDate(blog.publishDate)}
              />
            </div>
          ))}
        </div>

        <button
          className="bg-purple p-2 w-32 text-white rounded-lg mt-5"
          onClick={() => navigate("/create")}
        >
          Create Blog
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Blogs;
