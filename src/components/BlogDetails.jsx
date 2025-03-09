import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import DOMPurify from "dompurify";
import Home from "../assets/home.png";
import CommentCard from "../uiUtils/CommentCard";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");

  // Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Fetch blog data from Firestore
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
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

  // Function to add a new comment
  const addComment = async () => {
    if (!comment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    const newComment = {
      id: auth?.currentUser?.email.split("@")[0],
      photo: auth?.currentUser?.photoURL || "",
      comment,
    };

    try {
      const commentRef = doc(db, "blogs", id);
      await updateDoc(commentRef, {
        comments: arrayUnion(newComment),
      });

      // ✅ Update state immediately to show new comment
      setBlog((prev) => ({
        ...prev,
        comments: [...(prev?.comments || []), newComment],
      }));

      setComment(""); // ✅ Reset input field
      alert("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found!</p>;

  return (
    <div className="bg-light-gray/5">
      <div className="container bg-white rounded-2xl shadow-2xl m-10 w-[95%] p-5">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            <p className="text-gray-500">
              {blog.genre} -{" "}
              {blog.publishDate?.seconds
                ? new Date(blog.publishDate.seconds * 1000).toLocaleDateString()
                : "Unknown Date"}
            </p>
          </div>
          <img
            src={Home}
            alt="Home"
            className="w-12 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>

        {/* Cover Image with Blurred Background */}
        <div className="relative h-[30rem] w-full my-5 rounded-lg overflow-hidden">
          {/* Blurred Background */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-lg"
            style={{ backgroundImage: `url(${blog.coverPage})` }}
          ></div>

          {/* Foreground Image */}
          <img
            src={blog.coverPage}
            alt={blog.title}
            className="relative z-10 h-full w-full object-contain"
          />
        </div>

        {/* Blog Content */}
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
        />
        <h1>Author ~ {blog.author}</h1>

        {/* Comment Form */}
        <div className="commentForm mt-10">
          <h2 className="font-heading font-semibold text-xl">
            Leave a Comment:
          </h2>
          {user ? (
            <div>
              <input
                type="text"
                className="w-[89%] border rounded-2xl p-2 focus:outline-0 focus:border-purple"
                value={comment}
                placeholder="Write a comment"
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="bg-purple py-2 px-1 text-white rounded-2xl mt-2 lg:mt-0 lg:ml-2 "
                onClick={addComment}
              >
                Send Comment
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div
                className="w-fit bg-purple rounded-2xl p-2 text-white cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                SignUp
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="comments text-xl font-semibold font-heading mt-10">
            <div className="flex gap-x-2">
              <span>{blog.comments?.length || 0}</span>
              <h1>Comments:</h1>
            </div>
            <div className="flex flex-col  gap-y-2">
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((comment, index) => (
                  <CommentCard
                    key={index} // Ideally, use a unique ID if available
                    comment={comment.comment}
                    id={comment.id || "unknown"}
                    photo={comment.photo || ""}
                    blogId={id}
                  />
                ))
              ) : (
                <p className="text-gray-500 mt-2">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
