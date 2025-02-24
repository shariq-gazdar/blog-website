import React from "react";
import vr from "../assets/recent-images/vr-man.png";
import recent from "../jsons/recentPosts.json";
function RecentPost() {
  return (
    <div className="flex flex-col gap-y-10">
      {/* Header */}
      <div className="flex justify-between mx-10 items-end mb-10">
        <h1 className="text-4xl font-heading font-bold">Our Recent Posts</h1>
        <button className="text-sm font-medium text-white bg-purple px-10 py-3 rounded-lg hover:bg-white hover:text-purple hover:border-purple hover:border">
          View All
        </button>
      </div>

      {/* Post Content */}
      <div className=" flex flex-col justify-between lg:flex-row mx-10 items-center lg:items-start">
        {/* VR Image */}
        <div
          style={{
            backgroundImage: `url(${vr})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="w-[35rem] h-[30rem] rounded-2xl
          "
        ></div>
        {/* Text Content */}
        <div className="bg-white text-black rounded-xl pt-6 lg:w-[50%] flex flex-col h-full min-h-[20rem]">
          <div className="flex font-body text-sm">
            <h1 className="font-heading font-bold">DEVELOPMENT</h1>
            <h1 className="text-black/70 ml-2">16 March 2023</h1>
          </div>
          <h1 className="h4 font-bold font-heading w-full mt-2">
            How to make a Game look more attractive with New VR & AI Technology
          </h1>
          <p className="text-black/80 text-sm w-full font-body flex-grow mb-[23%] mt-5">
            Google has been investing in AI for many years and bringing its
            benefits to individuals, businesses and communities. Whether it’s
            publishing state-of-the-art research, building helpful products or
            developing tools and resources that enable others, we’re committed
            to making AI accessible to everyone.
          </p>

          {/* Button wrapper to push it down */}
          <div className="mt-auto">
            <button className="border-2 border-purple-700 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-700 hover:text-white transition">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentPost;
