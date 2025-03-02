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
            [{ script: "sub" }, { script: "super" }], // Subscript and Superscript
            ["image", "code-block", "link"],
            [{ direction: "rtl" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            [{ background: [] }], // Background color
            [{ color: [] }], // Text color
            ["clean"], // Remove formatting
          ],
        },
        formats: [
          "font",
          "size",
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "script",
          "image",
          "code-block",
          "link",
          "list",
          "indent",
          "direction",
          "align",
          "background",
          "color",
        ],
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
    if (!file) return;

    // Check file size (1MB = 1,048,576 bytes)
    if (file.size > 1048576) {
      alert("File size must be less than 1MB!");
      return;
    }

    const base64 = await convertToBase64(file);
    setCoverPage(base64);
  };

  const handleSubmit = async () => {
    if (!title || !coverPage || !content) {
      console.error("Title, cover page, and content are required!");
      return;
    }

    try {
      const authorName = auth.currentUser.email.split("@")[0];

      // Clean title by removing special characters
      const cleanedTitle = title
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();

      // Generate a unique document ID using title + author + timestamp
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

      console.log("Blog published successfully!", newBlog);
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <>
      <div className="p-10 ">
        <div className="shadow-purple shadow-2xl p-10 flex flex-col justify-between h-[90vh] rounded-2xl relative">
          <img
            src={Home}
            alt=""
            className="w-10 absolute right-0 top-0 m-5 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
          {/* Title Input with Hover/Focus Underline */}
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

          {/* Quill Editor */}
          <div
            ref={editorRef}
            className=" overflow-hidden border-1 border-light-gray/50 h-full "
          ></div>
          <div className="my-3">
            <label htmlFor="name">Cover Image</label>
            <input
              type="file"
              name="coverPage"
              id="coverPage"
              className="border w-fit px-3 rounded-lg"
              onChange={handleFileUpload}
            />
          </div>
          <div className="my-3">
            <label htmlFor="genre">Genre:</label>
            <select
              id="genre"
              name="genre"
              className="border border-light-gray/50 p-2 rounded-lg"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="Tech">Tech</option>
              <option value="Sports">Sports</option>
              <option value="Business">Business</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
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
