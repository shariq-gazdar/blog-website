import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutHero from "../components/AboutHero";
import HowWeWork from "../components/HowWeWork";

function About() {
  return (
    <div className="bg-light-gray/5">
      <Navbar />
      <AboutHero />
      <HowWeWork />
      <Footer />
    </div>
  );
}

export default About;
