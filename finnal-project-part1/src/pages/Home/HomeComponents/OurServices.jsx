import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import server from "../../../assets/service.png";

const OurServices = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });
  }, []);
  return (
    <div>
      <div className="border text-center p-5 py-8 md:p-16 md:px-20 rounded-lg bg-[#03373D] ">
        <h2 className="text-3xl font-bold text-white">Our Services</h2>
        <p className="mt-2.5 text-thried font-medium text-white max-w-[600px] mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-2 md:gap-5 mt-8">
          <div
            className="border group border-base-300 shadow   bg-white rounded-2xl p-6 py-8
            hover: bg-gradient-to-b   hover:from-[#b9df61] hover:to-[#e1f7ac]
            "
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img
              className="group-hover:animate-bounce transition-all duration-300 
               mx-auto border p-3.5 border-base-300 rounded-full bg-gradient-to-b from-[rgba(238,237,252,1)] to-[rgba(238,237,252,0)]  
               
                 "
              src={server}
            ></img>
            <h3 className="text-lg text-secondary  mt-1.5 font-semibold">
              Express & Standard Delivery
            </h3>
            <p className="text-thried  font-medium text-justify mt-2">
              We deliver parcels within 24–72 hours in Dhaka, Chittagong,
              Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka
              within 4–6 hours from pick-up to drop-off.
            </p>
          </div>

          <div
            className="border group border-base-300 shadow   bg-white rounded-2xl p-6 py-8
            hover: bg-gradient-to-b   hover:from-[#b9df61] hover:to-[#e1f7ac]
            "
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <img
              className="group-hover:animate-bounce transition-all duration-300 
               mx-auto border p-3.5 border-base-300 rounded-full bg-gradient-to-b from-[rgba(238,237,252,1)] to-[rgba(238,237,252,0)]  
               
                 "
              src={server}
            ></img>
            <h3 className="text-lg text-secondary  mt-1.5 font-semibold">
              Nationwide Delivery
            </h3>
            <p className="text-thried  font-medium text-justify mt-2">
              We deliver parcels nationwide with home delivery in every
              district, ensuring your products reach customers within 48–72
              hours.
            </p>
          </div>
          <div
            className="border group border-base-300 shadow   bg-white rounded-2xl p-6 py-8
            hover: bg-gradient-to-b   hover:from-[#b9df61] hover:to-[#e1f7ac]
            "
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <img
              className="group-hover:animate-bounce transition-all duration-300 
               mx-auto border p-3.5 border-base-300 rounded-full bg-gradient-to-b from-[rgba(238,237,252,1)] to-[rgba(238,237,252,0)]  
               
                 "
              src={server}
            ></img>
            <h3 className="text-lg text-secondary  mt-1.5 font-semibold">
              Fulfillment Solution
            </h3>
            <p className="text-thried  font-medium text-justify mt-2">
              We also offer customized service with inventory management
              support, online order processing, packaging, and after sales
              support.
            </p>
          </div>

          <div
            className="border group border-base-300 shadow   bg-white rounded-2xl p-6 py-8
            hover: bg-gradient-to-b   hover:from-[#b9df61] hover:to-[#e1f7ac]
            "
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <img
              className="group-hover:animate-bounce transition-all duration-300 
               mx-auto border p-3.5 border-base-300 rounded-full bg-gradient-to-b from-[rgba(238,237,252,1)] to-[rgba(238,237,252,0)]  
               
                 "
              src={server}
            ></img>
            <h3 className="text-lg text-secondary  mt-1.5 font-semibold">
              Cash on Home Delivery
            </h3>
            <p className="text-thried  font-medium text-justify mt-2">
              100% cash on delivery anywhere in Bangladesh with guaranteed
              safety of your product.
            </p>
          </div>

          <div
            className="border group border-base-300 shadow   bg-white rounded-2xl p-6 py-8
            hover: bg-gradient-to-b   hover:from-[#b9df61] hover:to-[#e1f7ac]
            "
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <img
              className="group-hover:animate-bounce transition-all duration-300 
               mx-auto border p-3.5 border-base-300 rounded-full bg-gradient-to-b from-[rgba(238,237,252,1)] to-[rgba(238,237,252,0)]  
               
                 "
              src={server}
            ></img>
            <h3 className="text-lg text-secondary  mt-1.5 font-semibold">
              Corporate Service / Contract In Logistics
            </h3>
            <p className="text-thried  font-medium text-justify mt-2">
              Customized corporate services which includes warehouse and
              inventory management support.
            </p>
          </div>
          <div
            className="border group border-base-300 shadow   bg-white rounded-2xl p-6 py-8
            hover: bg-gradient-to-b   hover:from-[#b9df61] hover:to-[#e1f7ac]
            "
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <img
              className="group-hover:animate-bounce transition-all duration-300 
               mx-auto border p-3.5 border-base-300 rounded-full bg-gradient-to-b from-[rgba(238,237,252,1)] to-[rgba(238,237,252,0)]  
               
                 "
              src={server}
            ></img>
            <h3 className="text-lg text-secondary  mt-1.5 font-semibold">
              Parcel Return
            </h3>
            <p className="text-thried  font-medium text-justify mt-2">
              Through our reverse logistics facility we allow end customers to
              return or exchange their products with online business merchants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
