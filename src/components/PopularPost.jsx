import React from "react";
import posts from "../jsons/popularPosts";
import PostCards from "../uiUtils/PostCards";

function PopularPost() {
  return (
    <div className="mx-0 pb-52">
      {/* Header */}
      <div className="flex justify-between items-end my-10 mx-10 ">
        <h1 className="text-4xl font-heading font-bold">Popular Posts</h1>
        <button className="text-sm font-medium text-white bg-purple px-10 py-3 rounded-lg hover:bg-white hover:text-purple hover:border-purple hover:border">
          View All
        </button>
      </div>

      {/* Flexbox Layout */}
      <div className="flex flex-wrap justify-center items-center lg:items-start lg:justify-start gap-6 px-10">
        {posts.map((post) => (
          <div key={post.title} className="w-full sm:w-[48%] lg:w-[32%]">
            <PostCards
              image={post.image}
              title={post.title}
              content={post.content}
              genre={post.genre}
              publishDate={post.publishDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularPost;
