import { motion } from "framer-motion";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import vr from "../assets/recent-images/vr-man.png";
import { useFirebaseContext } from "../contexts/FirebaaseContext";
import { Timestamp } from "firebase/firestore";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

function Vr() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init();
  }, []);

  const { blogs } = useFirebaseContext();

  // Ensure blogs are sorted by publishDate (latest first)
  const sortedBlogs = [...blogs].sort((a, b) => {
    const dateA =
      a.publishDate instanceof Timestamp ? a.publishDate.toMillis() : 0;
    const dateB =
      b.publishDate instanceof Timestamp ? b.publishDate.toMillis() : 0;
    return dateB - dateA;
  });

  const firstBlog = sortedBlogs.length > 0 ? sortedBlogs[0] : null;

  const formatDate = (timestamp) => {
    return timestamp instanceof Timestamp
      ? timestamp.toDate().toLocaleDateString()
      : "Unknown Date";
  };

  return (
    <motion.div
      className="h-96 lg:mt-20 lg:mb-56 mb-64 mt-20 mx-10 rounded-xl flex items-end p-6 relative"
      data-aos="fade-in"
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        backgroundImage: `url(${firstBlog ? firstBlog.coverPage : vr})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {firstBlog && (
        <div className="bg-white text-black lg:rounded-xl p-6 lg:w-[80%] w-full lg:shadow-lg absolute left-0 lg:left-[20%] lg:right-0 lg:top-[15rem] top-[100%]">
          <div className="flex gap-x-2 font-body text-sm">
            <h1 className="font-heading font-bold">{firstBlog.genre}</h1>
            <h1 className="text-black/70">
              {formatDate(firstBlog.publishDate)}
            </h1>
          </div>
          <h1 className="lg:h4 text-xl font-bold mt-2 font-heading w-full lg:w-[50rem]">
            {firstBlog.title}
          </h1>
          <p
            className="mt-2 text-black/80 text-sm w-full font-body h-20 overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(firstBlog.content),
            }}
          ></p>
          <button
            className="mt-4 border-2 border-purple-700 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-700 hover:text-white transition"
            onClick={() => {
              navigate(`/blog/${firstBlog.id}`);
            }}
          >
            Read More
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default Vr;
