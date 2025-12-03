import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecoir from "../../Hook/useAxiosSecoir";
import useAuth from "../../Hook/useAuth";
import { toast } from "sonner";

const SendPricel = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const naviget = useNavigate();
  const axiosApi = useAxiosSecoir();
  const { user } = useAuth();
  const serviceCenters = useLoaderData();

  const regionsert = serviceCenters.map((r) => r.region);
  const regionsDuplicate = [...new Set(regionsert)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  
  const reciverRegion = useWatch({ control, name: "reciverRegion" });


  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((d) => d.region === region);
    const districts = regionDistricts.map((d) => d.district);

    return districts;
  };

  // addrss: "Rowmari Kurigram";
  // contact: "01613410880";
  // delivery: " wer wer werr";
  // name: "Aftab Farhan";
  // parcelType: "document";
  // percilname: "Book";
  // pickup: "Test Now";
  // reciverDistrick: "Faridpur";
  // reciverRegion: "Dhaka";
  // reciveraddrss: "Rowmari Kurigram";
  // recivercontact: "01613410880";
  // reciveremail: "korim@gmail.com";
  // recivername: "Korim";
  // senderRegion: "Dhaka";
  // senderdistick: "Faridpur";
  // "aftabfarhan324@gmail.com";
  // weight: "2";

  const subMiteFrom = (data) => {
    // console.log("Submite Producat", data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderdistick === data.reciverDistrick;
    const parcilWight = parseFloat(data.weight);

    // console.log(parcilWight);

    let cost = 0;
    // cost conditions chack

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcilWight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcilWight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    data.totalCost = cost; // total delivery cost saved Database
    Swal.fire({
      title: "Confirm Delivery Cost",
      text: `Total delivery charge will be ${cost} taka. Do you want to continue?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      cancelButtonText: "No, Cancel",

      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-lg font-semibold text-gray-800",
        htmlContainer: "text-gray-600",
        actions: "flex gap-3 justify-end",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl",
      },

      buttonsStyling: false,
      backdrop: `rgba(0,0,0,0.45)`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosApi.post("parcel", data).then(() => {
          // console.log("After Data Send DB ", res.data);
          naviget("/dasbord/myparcel");
          toast.success("Your Parcel Creat Successfully");
        });
        Swal.fire({
          icon: "success",
          title: "Parcel Successfully Created",
          text: "Your parcel has been added and is now ready for processing.",
          confirmButtonText: "OK",
          customClass: {
            popup: "rounded-2xl shadow-lg",
            title: "text-lg font-bold text-green-700",
            htmlContainer: "text-gray-700",
            confirmButton:
              "bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl",
          },
          buttonsStyling: false,
        });
      }
    });

    // console.log("cost", cost);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(subMiteFrom)}
        className="w-full max-w-6xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm my-20"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold  text-secondary mb-8">Add Parcel</h1>

        <div className="border-t pt-6">
          {/* Section Title */}
          <h2 className="text-2xl font-semibold text-secondary  mb-6">
            Enter your parcel details
          </h2>
          {/* Document Type */}
          <div>
            <label className="label mr-4">
              <input
                type="radio"
                {...register("parcelType")}
                value="document"
                className="radio"
                defaultChecked
              />
              Document
            </label>
            <label className="label">
              <input
                type="radio"
                {...register("parcelType")}
                value="non-document"
                className="radio"
              />
              Non-Document
            </label>
          </div>

          {/* Parcel Inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                Parcel Name
              </label>
              <input
                type="text"
                {...register("percilname", { required: true })}
                placeholder="Select percilname"
                className="w-full px-4 py-2 md:py-2 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
              />
              {errors.percilname?.type === "required" && (
                <p className="text-red-500 text-xs font-semibold mt-1">
                  Please Fillup Producat Name
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                Parcel Weight (KG)
              </label>
              <input
                type="number"
                name="number"
                {...register("weight", { required: true })}
                placeholder="Parcel Weight (KG)"
                className="w-full px-4 py-2 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
              />
              {errors.weight?.type === "required" && (
                <p className="text-red-500 text-xs font-semibold mt-1">
                  Please Provied Producat Weight
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sender + Receiver */}
        <div className="grid md:grid-cols-2 gap-10 mt-10  ">
          {/* Sender */}
          <div className=" border-t md:border-0 pt-4 md:pt-0 border-b pb-4  md:pb-0 border-base-300">
            <h3 className="font-semibold text-lg text-secondary mb-3">
              Sender Details
            </h3>
            <div className=" space-y-5 mt-4 md:mt-7">
              {/* Name & Age Row */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Sender Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  defaultValue={user.displayName}
                  className="w-full px-4 py-2.5 md:py-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm  border-black/50 placeholder:text-black/90  md:text-base"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Please Fillup Name
                  </p>
                )}
              </div>
              {/* email */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Sender Email
                </label>
                <input
                  type="email"
                  {...register("senderemail", { required: true })}
                  defaultValue={user.email}
                  readOnly
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                />
                {errors.senderemail?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Fillup Your Email
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Sender Phone No
                </label>
                <input
                  type="tel"
                  name="contact"
                  {...register("contact", { required: true })}
                  placeholder="Sender Phone No"
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                />
                {errors.contact?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Please Provied Sender Phone No
                  </p>
                )}
              </div>

              {/* Sender Region */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Sender Region
                </label>
                <select
                  name="city"
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm  md:text-base  select"
                  {...register("senderRegion")}
                >
                  <option disabled={true}>Pick a Sender region</option>
                  {regionsDuplicate.map((one, i) => (
                    <option value={one} key={i}>
                      {one}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sender Distuick */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Sender District
                </label>
                <select
                  {...register("senderdistick", { required: true })}
                  className="w-full px-4 py-2.5 md:py-3 border border-black/90 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm  md:text-base  select focus:outline-none"
                  defaultValue=" Select Sender District"
                >
                  {districtsByRegion(senderRegion).map((d, i) => (
                    <option value={d} key={i}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Sender Address
                </label>
                <input
                  type="text"
                  {...register("addrss", { required: true })}
                  placeholder="sender addrss"
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                />
                {errors.addrss?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Please Provied Sender Addrss
                  </p>
                )}
              </div>
              {/* Pickup Instruction */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Pickup Instruction
                </label>
                <div className="w-full ">
                  <textarea
                    {...register("pickup", { required: true })}
                    placeholder="Pickup Instruction"
                    className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-lime-400 
               focus:border-transparent text-sm md:text-base"
                  ></textarea>
                </div>
                {errors.pickup?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Please Provied Pickup Instruction
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div className=" mt-10 md:mt-0 border-t md:border-0 pt-4 md:pt-0 border-b pb-4  md:pb-0 border-base-300">
            <h3 className="font-semibold text-lg text-secondary mb-3">
              Receiver Details
            </h3>
            <div className=" space-y-5 mt-4 md:mt-7">
              {/* Name & Age Row */}

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Receiver Name
                </label>
                <input
                  type="text"
                  {...register("recivername", { required: true })}
                  placeholder="Receiver Name"
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                />
                {errors.recivername?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Please Reciver Name Provied
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Receiver Email
                </label>
                <input
                  type="email"
                  {...register("reciveremail", { required: true })}
                  placeholder="sender email"
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                />
                {errors.reciveremail?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Reciver email Provied
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Receiver Phone No
                </label>
                <input
                  type="tel"
                  {...register("recivercontact", { required: true })}
                  placeholder="Receiver Phone No"
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                />
                {errors.recivercontact?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Receiver Phone No
                  </p>
                )}
              </div>

              {/* Sender Region */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Reciver Region
                </label>
                <select
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm  md:text-base  select"
                  {...register("reciverRegion")}
                  defaultValue="Pick a region"
                >
                  {regionsDuplicate.map((one, i) => (
                    <option value={one} key={i}>
                      {one}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Sender District
                </label>
                <select
                  {...register("reciverDistrick")}
                  className="w-full px-4 py-2.5 md:py-3 border border-black/90 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm  md:text-base  select focus:outline-none"
                  defaultValue=" Select Reciver District"
                >
                  {districtsByRegion(reciverRegion).map((d, i) => (
                    <option value={d} key={i}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Receiver Address
                </label>
                <input
                  type="text"
                  {...register("reciveraddrss", { required: true })}
                  placeholder="Receiver Address"
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                />
                {errors.reciveraddrss?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Provied Reciver Addrss
                  </p>
                )}
              </div>

              {/* Pickup Instruction */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Delivery instruction
                </label>
                <div className="w-full ">
                  <textarea
                    {...register("delivery", { required: true })}
                    placeholder="Delivery instruction"
                    className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-lime-400 
               focus:border-transparent text-sm md:text-base"
                  ></textarea>
                </div>
                {errors.delivery?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Provied Delivery instruction
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg font-semibold text-secondary  mt-4">
          * Pickup Time 4pm–7pm Approx.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button className="btn bg-[#B7E651] border-none px-10 shadow hover:bg-[#A3D33F]">
            Proceed to Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendPricel;
