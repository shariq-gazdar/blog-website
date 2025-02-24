import React from "react";
import bgPurple from "../assets/masked-image.png";
import Logo from "../uiUtils/Logo";
import Circle from "../uiUtils/Circle";
function Footer() {
  return (
    <div>
      <div
        className="flex flex-col items-center justify-center py-20 lg:p-52 text-white mt-52 gap-y-10"
        style={{
          backgroundImage: `url(${bgPurple})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="lg:text-5xl lg:w-[45rem] text-center font-semibold font-heading text-3xl w-full">
          Get our stories delivered From us to your inbox weekly.
        </h1>
        <div className="flex gap-x-2">
          <input
            type="email"
            name="email"
            id="footerEmail"
            placeholder="Your Email"
            className="bg-white px-5 py-2 rounded-lg text-light-gray"
          />
          <button className="bg-purple border border-white text-white text-sm px-5 py-2 rounded-lg">
            Get Started
          </button>
        </div>
        <p className="lg:w-[30rem] w-full text-center text-light-gray">
          Get a response tomorrow if you submit by 9pm today. If we received
          after 9pm will get a reponse the following day.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-7 my-10">
        <Logo />
        <ul className="list-none flex gap-x-5 font-body text-gray">
          <li className="inline">Home</li>
          <li className="inline">Blog</li>
          <li className="inline">About</li>
          <li className="inline">Contact us</li>
        </ul>
        <ul className="flex gap-x-5">
          <Circle>FB</Circle>
          <Circle>IG</Circle>
          <Circle>LN</Circle>
          <Circle>YT</Circle>
        </ul>
        <div className="lg:w-[85%] w-full h-[1px] bg-purple "></div>
        <p className="text-gray font-body">
          Copyright Ideapeel Inc © 2023. All Right Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
