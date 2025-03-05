import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css"; // Import Quill styles
import Quill from "quill";
import send from "../assets/send.svg";
import { db, auth } from "../config/firebase";
import Home from "../assets/home.png";
import { setDoc, doc } from "firebase/firestore";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

const IMGBB_API_KEY = "a4e3dcae3d62be4a9b76a4fa6376c1e0";

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

  const extractBase64Images = (htmlContent) => {
    const base64Regex =
      /<img[^>]+src=["'](data:image\/(png|jpeg|jpg|gif);base64,[^"']+)["'][^>]*>/g;
    return [...htmlContent.matchAll(base64Regex)].map((match) => match[1]);
  };

  const base64ToFile = (base64String, filename) => {
    let arr = base64String.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
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

      if (data.success) {
        return data.data.url; // ImgBB returns the direct image URL
      } else {
        console.error("ImgBB Upload Error:", data);
        return null;
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      return null;
    }
  };

  const processBlogContent = async (htmlContent) => {
    let updatedContent = htmlContent;
    const base64Images = extractBase64Images(htmlContent);

    for (const base64Image of base64Images) {
      const imageFile = base64ToFile(base64Image, "blog-image.png");
      const uploadedURL = await uploadToImgBB(imageFile);

      if (uploadedURL) {
        updatedContent = updatedContent.replace(base64Image, uploadedURL);
      }
    }

    return updatedContent;
  };

  const handleFileUpload = async (event) => {
    console.log("File upload triggered");

    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    console.log("Selected file:", file.name, "Size:", file.size);

    if (file.size > 1048576) {
      alert("File size must be less than 1MB!");
      return;
    }

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1000,
      });

      console.log("Compression successful:", compressedFile);

      const uploadedURL = await uploadToImgBB(compressedFile);
      if (uploadedURL) {
        console.log("Uploaded to Imgur:", uploadedURL);
        setCoverPage(uploadedURL);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const handleSubmit = async () => {
    console.log(coverPage);

    if (!title || !content || !coverPage) {
      console.error("Title, cover page, and content are required!");
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

      const processedContent = await processBlogContent(content);

      const newBlog = {
        title,
        content: processedContent,
        coverPage,
        genre,
        publishDate: new Date(),
        author: authorName,
        comments: [],
      };

      await setDoc(doc(db, "blogs", docId), newBlog);
      console.log("Blog published successfully!", newBlog);
      navigate("/");
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <>
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

          <div
            ref={editorRef}
            className="overflow-hidden border border-light-gray/50 h-full"
          ></div>

          <div className="my-3">
            <label htmlFor="coverPage">Cover Image</label>
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
    </>
  );
}

export default CreateBlog;
