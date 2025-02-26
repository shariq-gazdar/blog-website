import React, { useEffect } from "react";
import { motion } from "framer-motion";
function PostCards({ image, title, content, publishDate, genre }) {
  function shortTitle(title) {
    if (title.length >= 13) {
      const t = title.split(" ").slice(0, 11).join(" ");
      return t + "...";
    } else {
      return title;
    }
  }
  function short(title) {
    if (title.length >= 4) {
      const t = title.split(" ").slice(0, 4).join(" ");
      return t + "...";
    } else {
      return title;
    }
  }

  return (
    <motion.div
      className="flex flex-col gap-y-5 w-96 overflow-hidden px-5 items-start max-h-[40rem] "
      whileHover={{
        scale: 1.03,
      }}
    >
      <img
        src={image}
        alt=""
        className="lg:w-96 lg:h-96 rounded-2xl object-cover w-full h-96"
      />
      <div className="flex items-end gap-x-3 ">
        <h6 className="font-heading text-sm font-bold">{genre}</h6>
        <p className="text-light-gray">{publishDate}</p>
      </div>
      <h5
        className="text-2xl font-heading font-bold text-dark-gray cursor-default"
        title={title}
      >
        {short(title)}
      </h5>
      <p className="text-gray cursor-default" title={content}>
        {shortTitle(content)}
      </p>
      <button className="text-purple font-body font-bold underline">
        Read More...
      </button>
    </motion.div>
  );
}

export default PostCards;
