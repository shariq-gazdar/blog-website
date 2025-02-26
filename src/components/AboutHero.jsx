import React from "react";
import AboutHeroPic from "../assets/about-hero.png";

function AboutHero() {
  return (
    <div className="flex flex-col font-body items-center gap-y-3 py-10 ">
      <p className="font-heading font-medium">About Us</p>
      <h2 className="font-heading text-3xl font-bold w-full lg:w-[30%] text-center">
        Creative Blog Writting and publishing site
      </h2>
      <p className="w-[75%] text-center font-heading text-sm">
        Leverage agile frameworks to provide a robust synopsis for high level
        overviews. Iterative approaches to corporate strategy foster
        collaborative thinking to further the overall value proposition.
        Organically grow the holistic world view of disruptive innovation via
        workplace diversity and empowerment.
      </p>
      <img src={AboutHeroPic} alt="" className="w-[75%] mt-20" />
    </div>
  );
}

export default AboutHero;
