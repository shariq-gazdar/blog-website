import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Home from "../assets/home.png";
import Quill from "quill";
import send from "../assets/send.svg";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import imageCompression from "browser-image-compression";
import { db } from "../config/firebase";
const IMGBB_API_KEY = import.meta.env.VITE_IMG_KEY;

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const editorRef = useRef();
  const quillInstance = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverPage, setCoverPage] = useState(null);
  const [genre, setGenre] = useState("Tech");

  const genres = ["Tech", "Health", "Travel", "Education", "Food", "Fashion"];

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

      if (content) {
        quillInstance.current.root.innerHTML = content;
      }
    }
  }, [content]);

  const getPrevious = async () => {
    const docRef = doc(db, "blogs", id);
    const snapShot = await getDoc(docRef);
    setTitle(snapShot.data().title);
    setGenre(snapShot.data().genre || "Tech");
    quillInstance.current.root.innerHTML = snapShot.data().content;
    setCoverPage(snapShot.data().coverPage);
    setLoading(false);
  };

  useEffect(() => {
    getPrevious();
  }, [id]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 1048576) {
      alert("File size must be less than 1MB!");
      return;
    }

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1000,
      });

      const uploadedURL = await uploadToImgBB(compressedFile);
      if (uploadedURL) setCoverPage(uploadedURL);
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const uploadToImgBB = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.success ? data.data.url : null;
    } catch (error) {
      console.error("Fetch Error:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      const docRef = doc(db, "blogs", id);
      await updateDoc(docRef, {
        title,
        genre,
        content,
        coverPage,
        updatedAt: new Date(),
      });

      alert("Blog updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="p-10">
          <div className="shadow-purple shadow-2xl p-10 flex flex-col justify-between h-[90vh] rounded-2xl relative">
            <img
              src={Home}
              alt="Home"
              className="w-10 absolute right-0 top-0 m-5 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div className="w-full mb-5 relative">
              <input
                type="text"
                className="title w-full outline-none font-bold text-3xl"
                name="title"
                placeholder="Enter Title For Your Blog"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Genre Selection */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold">Genre:</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="p-2 border rounded-lg"
              >
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div
              ref={editorRef}
              className="overflow-hidden border border-light-gray/50 h-full"
            ></div>

            <div className="my-3 flex">
              <label htmlFor="coverPage">Cover Image</label>
              <img src={coverPage} alt="" className="w-10" />
              <input
                type="file"
                id="coverPage"
                className="border w-fit px-3 rounded-lg"
                onChange={handleFileUpload}
              />
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
      )}
    </>
  );
}

export default EditBlog;
