import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import recents from "../jsons/recentPosts.json";
import populars from "../jsons/popularPosts.json";
import PostCards from "../uiUtils/PostCards";
import { useNavigate } from "react-router-dom";
function Blogs() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <section className="font-body bg-light-gray/5 pb-52 flex flex-col items-center">
        <div className="text-section flex  flex-col items-center gap-y-3 py-10 ">
          <p className="font-heading text-sm  ">Our Blogs</p>
          <h2 className="font-heading text-3xl font-semibold text-center w-[70%] lg:w-full">
            Find our all blogs from here
          </h2>
          <p className="font-heading text-sm w-[95%] lg:w-[50%] text-center">
            our blogs are written from very research research and well known
            writers writers so that we can provide you the best blogs and
            articles articles for you to read them all along
          </p>
        </div>
        <div className="flex justify-center items-center gap-x-1 flex-wrap lg:flex-nowrap gap-y-10 lg:gap-y-0">
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
        </div>
        <button
          className="bg-purple p-2 w-32 text-white rounded-lg"
          onClick={() => {
            navigate("/create");
          }}
        >
          Create Blog
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Blogs;
