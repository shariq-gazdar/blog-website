import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function PostCards({ image, title, content, publishDate, genre, id }) {
  // useEffect(() => {
  //   console.log(image);
  // });
  const navigate = useNavigate();
  return (
    <motion.div
      className="flex flex-col gap-y-5 w-96 overflow-hidden p-5 items-start h-[40rem] bg-light-gray/20 rounded-2xl"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={image}
        alt={title}
        className="lg:w-96 lg:h-80 rounded-2xl object-fill w-full h-96"
      />
      <div className="flex items-end gap-x-3">
        <h6 className="font-heading text-sm font-bold">{genre}</h6>
        <p className="text-light-gray">{publishDate}</p>
      </div>
      <h5 className="text-2xl font-heading font-bold text-dark-gray">
        {title}
      </h5>
      <div
        className="text-gray cursor-default h-24 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} // ✅ Safe HTML rendering
      />
      <button
        className="text-purple font-body font-bold underline cursor-pointer"
        onClick={() => {
          navigate(`/blog/${id}`);
        }}
      >
        Read More...
      </button>
    </motion.div>
  );
}
export default PostCards;
