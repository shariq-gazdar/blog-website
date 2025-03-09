import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import send from "../assets/send.svg";
import { db, auth } from "../config/firebase";
import Home from "../assets/home.png";
import { setDoc, doc } from "firebase/firestore";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const IMGBB_API_KEY = import.meta.env.VITE_IMG_KEY;

function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverPage, setCoverPage] = useState("");
  const [genre, setGenre] = useState("Tech");
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter Your Blog Content Here",
        modules: {
          toolbar: [
            [{ font: [] }],
            [{ size: ["small", "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ script: "sub" }, { script: "super" }],
            ["image", "code-block", "link"],
            [{ direction: "rtl" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            [{ background: [] }],
            [{ color: [] }],
            ["clean"],
          ],
        },
      });

      quillInstance.current.on("text-change", () => {
        setContent(quillInstance.current.root.innerHTML);
      });
    }
  }, []);

  const handleSubmit = async () => {
    if (!title || !content || !coverPage) {
      alert("Title, content, and cover image are required!");
      return;
    }

    try {
      const authorName = auth.currentUser?.email.split("@")[0] || "unknown";
      const cleanedTitle = title
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();
      const timestamp = Date.now();
      const docId = `${cleanedTitle}-${authorName}-${timestamp}`;

      const newBlog = {
        title,
        content,
        coverPage,
        genre,
        publishDate: new Date(),
        author: authorName,
        comments: [],
      };

      await setDoc(doc(db, "blogs", docId), newBlog);
      alert("Blog published successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <div className="p-10">
      <div className="shadow-purple shadow-2xl p-10 flex flex-col justify-between h-[90vh] rounded-2xl relative">
        <img
          src={Home}
          alt="Home"
          className="w-10 absolute right-0 top-0 m-5 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="w-full relative after:content-[''] after:w-0 after:h-[2.5px] after:bg-purple after:absolute after:top-full after:left-0 after:transition-all after:duration-[0.8s] hover:after:w-full focus-within:after:w-full mb-5">
          <input
            type="text"
            className="title w-full outline-none font-bold text-3xl"
            name="title"
            placeholder="Enter Title For Your Blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <select
          className="border p-2 rounded-lg mb-4"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Education">Education</option>
          <option value="Travel">Travel</option>
          <option value="Health">Health</option>
          <option value="Gaming">Gaming</option>
          <option value="Politics">Politics</option>
        </select>

        <div
          ref={editorRef}
          className="overflow-hidden border border-light-gray/50 h-full"
        ></div>

        <input
          type="file"
          className="border w-fit px-3 py-1 rounded-lg my-3"
          onChange={(e) => setCoverPage(URL.createObjectURL(e.target.files[0]))}
        />

        <motion.button
          className="group text-white bg-purple self-start p-3 mt-5 rounded-lg text-xs flex items-center gap-2"
          onClick={handleSubmit}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
        >
          Publish
          <img
            src={send}
            alt="Send Icon"
            className="w-4 h-0 opacity-0 group-hover:opacity-100 group-hover:h-4 transition-opacity duration-[1s] rotate-[-45deg]"
          />
        </motion.button>
      </div>
    </div>
  );
}

export default CreateBlog;
