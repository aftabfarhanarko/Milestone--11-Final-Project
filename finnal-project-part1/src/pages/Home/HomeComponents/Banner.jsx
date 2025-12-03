import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";
import { MdOutlineArrowOutward } from "react-icons/md";

const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showStatus={false}
      showIndicators={true}
      showThumbs={false}
      swipeable={true}
      emulateTouch={true}
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={50}
      className="custom-carousel"
    >
      <div className="relative">
        <img src={banner1} alt="Banner 1" />

        <div className="hidden  md:block">
          <div className=" absolute bottom-12 md:bottom-19 left-6 md:left-22 flex flex-wrap gap-2 md:gap-0">
            <button className="bg-[#B8E55C] text-black px-3 md:px-5 py-1.5 md:py-2 text-sm md:text-base rounded-full font-semibold hover:bg-[#a5d14a] transition-all items-center">
              Track Your Parcel
            </button>
            <button
              className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-black flex items-center justify-center 
         hover:bg-gray-800 transition transform hover:-translate-y-0.5"
            >
              <MdOutlineArrowOutward  className="w-4 h-4 md:w-5 md:h-5 text-white"/>

              
            </button>
            <button className="ml-2 md:ml-3 border-2 bg-base-100 border-gray-300 text-gray-700 px-4 md:px-6 py-1 md:py-1.5 text-sm md:text-base rounded-full font-semibold hover:bg-base-200 transition-all">
              Be A Rider
            </button>
          </div>
          
        </div>
      </div>

      <div className="relative">
        <img src={banner2} alt="Banner 2" />

        <div className="hidden  md:block">
          <div className=" absolute bottom-12 md:bottom-19 left-6 md:left-22 flex flex-wrap gap-2 md:gap-0">
            <button className="bg-[#B8E55C] text-black px-3 md:px-5 py-1.5 md:py-2 text-sm md:text-base rounded-full font-semibold hover:bg-[#a5d14a] transition-all items-center">
              Track Your Parcel
            </button>
            <button
              className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-black flex items-center justify-center 
         hover:bg-gray-800 transition transform hover:-translate-y-0.5"
            >
              <MdOutlineArrowOutward  className="w-4 h-4 md:w-5 md:h-5 text-white"/>
            </button>
            <button className="ml-2 md:ml-3 border-2 bg-base-100 border-gray-300 text-gray-700 px-4 md:px-6 py-1 md:py-1.5 text-sm md:text-base rounded-full font-semibold hover:bg-base-200 transition-all">
              Be A Rider
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <img src={banner3} alt="Banner 3" />

        <div className="hidden  md:block">
          <div className=" absolute bottom-12 md:bottom-19 left-6 md:left-22 flex flex-wrap gap-2 md:gap-0">
            <button className="bg-[#B8E55C] text-black px-3 md:px-5 py-1.5 md:py-2 text-sm md:text-base rounded-full font-semibold hover:bg-[#a5d14a] transition-all items-center">
              Track Your Parcel
            </button>
            <button
              className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-black flex items-center justify-center 
         hover:bg-gray-800 transition transform hover:-translate-y-0.5"
            >
               <MdOutlineArrowOutward  className="w-4 h-4 md:w-5 md:h-5 text-white"/>
            </button>
            <button className="ml-2 md:ml-3 border-2 bg-base-100 border-gray-300 text-gray-700 px-4 md:px-6 py-1 md:py-1.5 text-sm md:text-base rounded-full font-semibold hover:bg-base-200 transition-all">
              Be A Rider
            </button>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
