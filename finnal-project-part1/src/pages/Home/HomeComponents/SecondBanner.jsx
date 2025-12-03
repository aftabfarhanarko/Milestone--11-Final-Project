import React from "react";
import positions from "../../../assets/be-a-merchant-bg.png";
import locationbs from "../../../assets/location-merchant.png";

const SecondBanner = () => {
  return (
    <div>
      <div className="border-t mt-18 border-2 border-dashed border-gray-400"></div>

      <div className="border relative p-4 py-12  md:p-10  mt-10 rounded-2xl bg-[#03373d]">
        <div className="flex flex-col-reverse md:flex-row md:pt-6 items-center justify-center text-white">
          <div className="text-center md:mt-0 mt-6 md:text-left ">
            <h1 className="text-3xl font-semibold">
              Merchant and Customer Satisfaction is Our First Priority
            </h1>
            <p className="mt-5 text-md max-w-[420px]">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>

            <div className="flex mt-8">
              <button className="bg-[#B8E55C] text-black px-3 md:px-5 py-1.5 md:py-2 text-sm md:text-base rounded-full font-semibold hover:bg-[#a5d14a] transition-all items-center">
                Become a Merchant
              </button>

              <button className="ml-2 md:ml-3 border-2  text-[#B8E55C]   px-4 md:px-6 py-1 md:py-1.5 text-sm md:text-base rounded-full font-semibold transition-all">
                Earn with ZapShift Courier
              </button>
            </div>
          </div>

          <img className=" " src={locationbs}></img>
        </div>

        <img className=" hidden md:block absolute top-0" src={positions}></img>
      </div>
    </div>
  );
};

export default SecondBanner;
