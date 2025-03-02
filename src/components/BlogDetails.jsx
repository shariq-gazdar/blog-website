import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import DOMPurify from "dompurify";
import { div } from "framer-motion/client";

function BlogDetails() {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id); // Reference to Firestore document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog(docSnap.data());
        } else {
          console.log("No such blog exists!");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!blog) return <p>Blog not found!</p>;

  return (
    <div className="bg-light-gray/5">
      <div className="container bg-white rounded-2xl shadow-2xl m-10 w-[95%] p-5">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-gray-500">
          {blog.genre} - {blog.publishDate.toDate().toLocaleDateString()}
        </p>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full my-5 rounded-lg"
        />
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
        />
      </div>
    </div>
  );
}

export default BlogDetails;
