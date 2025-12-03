import React from "react";
import { useForm } from "react-hook-form";

const Price = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handelData = (data) => {
    // console.log(data);
  };

  return (
    <div className="bg-white min-h-[80vh] rounded-lg my-20">
      <div className=" p-5 md:p-15 py-12 md:py-15 ">
        <div>
          <h1 className=" text-3xl font-bold text-secondary">
            Pricing Calculator
          </h1>
          <p className="max-w-[500px] text-md font-medium text-thried mt-2.5 text-justify">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        <div className="border-t border-base-300  mt-10">
          <h2 className="text-2xl my-7   font-bold text-secondary text-center mb-6 sm:mb-8">
            Calculate Your Cost
          </h2>
          <div className="   flex flex-col-reverse md:flex-row  md:items-center  md:justify-between">
            {/* Form Section */}
            <div className="flex-1 bg-white  rounded-lg  border border-base-200  p-6 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit(handelData)} className="space-y-4.5">
                {/* Wire-house Selection */}
                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                    Parcel Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Select Parcel type"
                    className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-500 text-xs font-semibold mt-1">
                      Please Fillup Producat Name
                    </p>
                  )}
                </div>
                {/* One */}
                <div>
                  <label className="block text-gray-900 font-medium  mb-2 text-sm sm:text-base">
                    Delivery Destination
                  </label>
                  <select
                    name="city"
                    {...register("city", { required: true })}
                    className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base text-gray-500"
                  >
                    <option value="">Select your region</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="chittagong">Chittagong</option>
                    <option value="rajshahi">Rajshahi</option>
                    <option value="khulna">Khulna</option>
                    <option value="sylhet">Sylhet</option>
                    <option value="rangpur">Rangpur</option>
                    <option value="barisal">Barisal</option>
                    <option value="mymensingh">Mymensingh</option>
                  </select>
                  {errors.city?.type === "required" && (
                    <p className="text-red-500 text-xs font-semibold mt-1">
                      Fillup Your City
                    </p>
                  )}
                </div>

                {/* Tow W8 */}
                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                    Weight (KG)
                  </label>
                  <input
                    type="number"
                    name="number"
                    {...register("number", { required: true })}
                    placeholder="number"
                    className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                  />
                  {errors.number?.type === "required" && (
                    <p className="text-red-500 text-xs font-semibold mt-1">
                      Please Provied Producat Weight
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className=" flex gap-5">
                  <button
                  onClick={()=> reset()}
                    type=""
                    className="w-[200px] bg-lime-100  outline text-lime-700  font-semibold py-2.5 md:py-3 rounded-lg transition duration-200 text-sm md:text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-2.5 md:py-3 rounded-lg transition duration-200 text-sm md:text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Calculate
                  </button>
                </div>
              </form>
            </div>

            <div className="flex-1 flex items-center justify-center my-12 md:my-0">
              <p className="text-4xl font-bold text-secondary"> 200TK </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
