import React from "react";
import logo from "../assets/logo.png";
function Logo() {
  return (
    <div className="flex gap-x-2">
      <img src={logo} alt="" className="w-10" />
      <h1 className="text-3xl font-bold">Zarrin</h1>
    </div>
  );
}

export default Logo;
