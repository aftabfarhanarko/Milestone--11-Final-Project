import React from "react";
import live from "../../../assets/live-tracking.png";
import live2 from "../../../assets/safe-delivery.png";

const Safe = () => {
  return (
    <div>
      <div className="border-t mt-18 border-2 border-dashed border-gray-400"></div>

      <div className="mt-10">
        <div className="border p-6 mt-7 py-10 bg-white rounded-2xl border-base-300 shadow md:flex gap-10 items-center justify-center">
          <img
            src={live2}
            className=" mx-auto md:mx-0 border-r border-dashed border-gray-400 px-4 "
          ></img>

          <div>
            <h1 className="text-2xl mt-7 md:mt-0 font-bold text-secondary text-left">
              100% Safe Delivery
            </h1>
            <p className="text-thried mt-4 font-medium text-justify">
              We ensure your parcels are handled with the utmost care and
              delivered securely to their destination. Our reliable process
              guarantees safe and damage-free delivery every time.
            </p>
          </div>
        </div>

        <div className="border p-6 py-10 mt-7 bg-white rounded-2xl border-base-300 shadow md:flex gap-10 items-center justify-center">
          <img
            src={live}
            className=" mx-auto md:mx-0 border-r border-dashed border-gray-400 px-4 "
          ></img>

          <div>
            <h1 className="text-2xl mt-7 md:mt-0 font-bold text-secondary text-left">
              Live Parcel Tracking
            </h1>
            <p className="text-thried mt-4 font-medium text-justify">
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>

        <div className="border mt-7 p-6 py-10 bg-white rounded-2xl border-base-300 shadow md:flex gap-10 items-center justify-center">
          <img
            src={live2}
            className=" mx-auto md:mx-0 border-r border-dashed border-gray-400 px-4 "
          ></img>

          <div>
            <h1 className="text-2xl mt-7 md:mt-0 font-bold text-secondary text-left">
              24/7 Call Center Support
            </h1>
            <p className="text-thried mt-4 font-medium text-justify">
              Our dedicated support team is available around the clock to assist
              you with any questions, updates, or delivery concerns—anytime you
              need us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safe;
