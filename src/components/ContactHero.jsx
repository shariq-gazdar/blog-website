import React from "react";
import Circle from "../uiUtils/Circle";
import home from "../assets/home.png";
function ContactHero() {
  return (
    <div className="flex flex-col items-center font-heading py-20 gap-y-4">
      <h1 className="text-3xl font-semibold">Get In Touch</h1>
      <p className="text-light-gray text-sm w-[30%] text-center">
        Contact us to publish your content and show ads to our website and get a
        good reach.
      </p>
      <div className="card flex justify-center w-full  gap-x-5  flex-wrap ">
        <div className="flex flex-col items-center bg-white p-5 gap-y-5 rounded-2xl">
          <Circle>
            <img src={home} alt="" className="w-8 p-2" />
          </Circle>
          <h1 className="text-purple font-bold">Office</h1>
          <p className="text-light-gray text-sm">Victoria Street, London, UK</p>
        </div>
        <div className="flex flex-col items-center bg-white p-5 gap-y-5 rounded-2xl">
          <Circle>
            <img src={home} alt="" className="w-8 p-2" />
          </Circle>
          <h1 className="text-purple font-bold">Office</h1>
          <p className="text-light-gray text-sm">Victoria Street, London, UK</p>
        </div>
        <div className="flex flex-col items-center bg-white p-5 gap-y-5 rounded-2xl">
          <Circle>
            <img src={home} alt="" className="w-8 p-2" />
          </Circle>
          <h1 className="text-purple font-bold">Office</h1>
          <p className="text-light-gray text-sm">Victoria Street, London, UK</p>
        </div>
      </div>
    </div>
  );
}

export default ContactHero;
