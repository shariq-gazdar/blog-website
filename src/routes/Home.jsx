import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Vr from "../components/Vr";
import RecentPost from "../components/RecentPost";
import PopularPost from "../components/PopularPost";
import Footer from "../components/Footer";
function Home() {
  return (
    <div className="  ">
      <Navbar />
      <Hero />
      <Vr />
      <RecentPost />
      <PopularPost />
      <Footer />
    </div>
  );
}

export default Home;
