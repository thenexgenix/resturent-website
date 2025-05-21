import React from "react";
import Hero from "../components/ui/about-us/Hero";
import Story from "../components/ui/about-us/Story";
import Team from "./../components/ui/about-us/Team";
import History from "./../components/ui/about-us/History";
import Location from "./../components/ui/about-us/location";

const AboutUs = () => {
  return (
    <>
      <section>
        <Hero />
        <Story />
        <Team />
        <History />
        <Location />
      </section>
    </>
  );
};

export default AboutUs;

{
  /* <div>
          <div className="relative w-full">
            <div className="w-fit mx-auto gap-1 flex pb-20 pt-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`gallery-item group rounded-xl relative h-[400px] flex-shrink-0 origin-center overflow-hidden ${
                    i === 0 ? "w-[400px]" : "w-[50px] hover:w-[400px]"
                  }`}
                >
                  <img
                    src={`https://picsum.photos/300/400?random=${i + 1}`}
                    className="w-full h-full object-cover rounded-xl cursor-pointer"
                  />
                  <article className="absolute flex flex-col justify-end h-full w-full top-0 p-3 space-y-2 overflow-hidden rounded-xl bg-gradient-to-t dark:from-gray-900/60 from-gray-100/60 from-20% to-transparent to-80% opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    <h1 className="text-2xl font-semibold">
                      Gallery Image {i + 1}
                    </h1>
                    <p className="leading-[120%]">Some description here.</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div> */
}
