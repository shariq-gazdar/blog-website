import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css"; // Import Quill styles
import Quill from "quill";
import send from "../assets/send.svg";
import { db, auth } from "../config/firebase";
import Home from "../assets/home.png";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverPage, setCoverPage] = useState("");
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter Your Blog Content Here",
        modules: {
          toolbar: [
            [{ font: [] }], // Font family options
            [{ size: ["small", "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "blockquote"],
            ["image", "code-block"],
          ],
        },
        formats: [
          "font",
          "size",
          "header",
          "bold",
          "italic",
          "underline",
          "blockquote",
          "image",
          "code-block",
        ], // Enable font & size formatting
      });

      quillInstance.current.on("text-change", () => {
        setContent(quillInstance.current.root.innerHTML);
      });
    }
  }, []);
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onload = () => resolve(reader.result); // Resolve with Base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  // Example usage
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setCoverPage(base64);
    }
  };

  const handleSubmit = async () => {
    const prevData = await getDocs(collection(db, "users"));
    console.log(prevData.docs);

    if (title && coverPage && content) {
      console.log("updating...");
    }
  };
  return (
    <>
      <img
        src={Home}
        alt=""
        className="w-10 float-end m-3 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="p-10 ">
        <div className="shadow-2xl p-10 flex flex-col justify-between h-[90vh] rounded-2xl">
          {/* Title Input with Hover/Focus Underline */}
          <div className="w-full relative after:content-[''] after:w-0 after:h-1 after:bg-purple after:absolute after:top-full after:left-0 after:transition-all after:duration-[0.8s] hover:after:w-full focus-within:after:w-full mb-5">
            <input
              type="text"
              className="title w-full outline-none font-bold text-3xl"
              name="title"
              placeholder="Enter Title For Your Blog"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Quill Editor */}
          <div
            ref={editorRef}
            className=" overflow-hidden border-1 border-light-gray/50 h-full"
          ></div>
          <label htmlFor="name">Cover Image</label>
          <input
            type="file"
            name="coverPage"
            id="coverPage"
            className="border w-fit px-3 rounded-lg"
            onChange={handleFileUpload}
          />
          <button
            className="group text-white bg-purple self-start p-3 mt-5 rounded-lg text-xs flex items-center gap-2"
            onClick={handleSubmit}
          >
            Publish
            <img
              src={send}
              alt="Send Icon"
              className="w-4 h-0 opacity-0 group-hover:opacity-100 group-hover:h-4 transition-opacity duration-[1s] rotate-[-45deg]"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateBlog;
