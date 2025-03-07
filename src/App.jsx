import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Logo from "./uiUtils/Logo";
import BlogDetails from "./components/BlogDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Blogs from "./routes/Blogs";
import Contact from "./routes/Contact";
import CreateBlog from "./components/CreateBlog";
import { FirebaseContextProvider } from "./contexts/FirebaaseContext";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import EditBlog from "./components/EditBlog";
function App() {
  return (
    <BrowserRouter>
      <FirebaseContextProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/create" element={<CreateBlog />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </FirebaseContextProvider>
    </BrowserRouter>
  );
}

export default App;
