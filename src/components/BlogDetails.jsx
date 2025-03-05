import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import DOMPurify from "dompurify";
import Home from "../assets/home.png";

function BlogDetails() {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            <p className="text-gray-500">
              {blog.genre} - {blog.publishDate.toDate().toLocaleDateString()}
            </p>
          </div>
          <img
            src={Home}
            alt="Home"
            className="w-12 cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <img
          src={blog.coverPage}
          alt={blog.title}
          className="h-[30rem] w-full object-cover my-5 rounded-lg"
        />
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
        />
      </div>
    </div>
  );
}

export default BlogDetails;
