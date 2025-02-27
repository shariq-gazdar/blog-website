import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactHero from "../components/ContactHero";
import Map from "../assets/map.png";

function Contact() {
  return (
    <div className="bg-light-gray/5">
      <Navbar />
      <ContactHero />

      <div className=" lg:mb-96 mb-[40rem]">
        <img src={Map} alt="Map" className="w-full h-36 lg:h-full relative" />

        <form className="absolute lg:top-[150%] lg:left-1/2 transform -translate-x-1/2  bg-white rounded-lg px-6 py-8 lg:px-10 lg:py-12 lg:w-[90%] max-w-lg shadow-lg top-[140%] left-[50%] w-72">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {[
              { label: "Name", type: "text", id: "name" },
              { label: "Email", type: "email", id: "email" },
              { label: "Phone", type: "phone", id: "phone" },
              { label: "Subject", type: "text", id: "subject" },
            ].map(({ label, type, id }) => (
              <div key={id} className="flex flex-col gap-y-1">
                <label htmlFor={id}>{label}</label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  className="p-2 border rounded-lg border-light-gray"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="border rounded-lg border-light-gray h-32 resize-y p-2"
            ></textarea>
          </div>

          <button className="bg-purple text-white p-2 rounded-md mt-5 w-full lg:w-auto">
            Send Message
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
