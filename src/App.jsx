import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Logo from "./uiUtils/Logo";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Vr from "./components/Vr";

function App() {
  return (
    <div className=" ">
      <Navbar />
      <Hero />
      <Vr />
    </div>
  );
}

export default App;
