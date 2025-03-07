import React, { useEffect, useState } from "react";
import PostCards from "../uiUtils/PostCards";
import { useFirebaseContext } from "../contexts/FirebaaseContext";
import { Timestamp } from "firebase/firestore";
import DOMpurify from "dompurify";
import { useNavigate } from "react-router-dom";

function RecentPost() {
  const navigate = useNavigate();
  const { blogs } = useFirebaseContext();
  const [blogsAfter, setBlogsAfter] = useState([]);

  // Sort blogs by publishDate (latest first)
  const sortedBlogs = [...blogs].sort((a, b) => {
    const dateA =
      a.publishDate instanceof Timestamp ? a.publishDate.toMillis() : 0;
    const dateB =
      b.publishDate instanceof Timestamp ? b.publishDate.toMillis() : 0;
    return dateB - dateA;
  });

  const firstBlog = sortedBlogs.length > 0 ? sortedBlogs[0] : null;

  useEffect(() => {
    if (sortedBlogs.length > 1) {
      setBlogsAfter(sortedBlogs.slice(1, 4)); // Get next 3 most recent posts
    }
  }, [blogs]);

  const formatDate = (timestamp) => {
    return timestamp instanceof Timestamp
      ? timestamp.toDate().toLocaleDateString()
      : "Unknown Date";
  };

  return (
    <div className="flex flex-col gap-y-10 pb-10 justify-center">
      {/* Header */}
      <div className="flex justify-between mx-10 items-end mb-10">
        <h1 className="text-4xl font-heading font-bold">Our Recent Posts</h1>
        <button className="text-sm font-medium text-white bg-purple px-10 py-3 rounded-lg hover:bg-white hover:text-purple hover:border-purple hover:border">
          View All
        </button>
      </div>

      {/* Post Content */}
      {firstBlog && (
        <div className="lg:flex flex-col justify-between lg:flex-row mx-10 items-center lg:items-start hidden">
          {/* VR Image */}
          <div
            style={{
              backgroundImage: `url(${firstBlog.coverPage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="w-[35rem] h-[30rem] rounded-2xl"
          ></div>
          {/* Text Content */}
          <div className="bg-white text-black rounded-xl pt-6 lg:w-[50%] flex flex-col h-full min-h-[20rem]">
            <div className="flex font-body text-sm">
              <h1 className="font-heading font-bold">{firstBlog.genre}</h1>
              <h1 className="text-black/70 ml-2">
                {formatDate(firstBlog.publishDate)}
              </h1>
            </div>
            <h1 className="h4 font-bold font-heading w-full mt-2">
              {firstBlog.title}
            </h1>
            <p
              className="text-black/80 text-sm w-full font-body flex-grow mb-[23%] mt-5 h-44 overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: DOMpurify.sanitize(firstBlog.content),
              }}
            ></p>
            <div className="mt-auto">
              <button
                className="border-2 border-purple-700 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-700 hover:text-white transition"
                onClick={() => navigate(`blog/${firstBlog.id}`)}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="flex justify-center items-center gap-x-1 flex-wrap lg:flex-nowrap gap-y-10 lg:gap-y-0">
        {blogsAfter.map((post, index) => (
          <PostCards
            key={index}
            id={post.id}
            image={post.coverPage}
            title={post.title}
            content={post.content}
            genre={post.genre}
            publishDate={formatDate(post.publishDate)}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentPost;
