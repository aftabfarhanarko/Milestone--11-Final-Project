import { useForm, useWatch } from "react-hook-form";
import rider from "../../assets/agent-pending.png";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecoir from "../../Hook/useAxiosSecoir";
import { toast } from "sonner";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../Hook/useAuth";
import { ArrowUpRight } from "lucide-react";
import newAdd from "../../assets/tiny-deliveryman.png";
import { useEffect, useState } from "react";

const RiderBook = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [top, setTop] = useState([]);
  const axiosSecoir = useAxiosSecoir();
  const serviceCenters = useLoaderData();
  const nmaviget = useNavigate();
  const regionsert = serviceCenters.map((r) => r.region);
  const regionsDuplicate = [...new Set(regionsert)];

  const reiderReguon = useWatch({ control, name: "yourRegion" });

  const handelRieder = (region) => {
    const regionDistrick = serviceCenters.filter((d) => d.region === region);
    const districk = regionDistrick.map((d) => d.district);
    return districk;
  };

  const handelFrom = (data) => {
    const riderInfoUb = { role: "rider" };

    axiosSecoir
      .patch(`/user/riderUpdet?email=${user.email}`, { riderInfoUb })
      .then((res) => {
        // console.log(res.data);
        toast.success("Updeat Successfully")
      });

    // console.log(data);
    const roiderPhoto = data.photo[0];
    const fromData = new FormData();
    fromData.append("image", roiderPhoto);

    // Img File Set Axios APis
    const api_img_url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imge_hoset
    }`;

    axios.post(api_img_url, fromData).then((re) => {
      const ridPt = re?.data?.data?.url;

      const sendData = {
        bikeBrandModelAndYear: data.bikeBrandModelAndYear,
        bikeRegistrationNumber: data.bikeRegistrationNumber,
        drivingLicenseNumber: data.drivingLicenseNumber,
        nidNo: data.nidNo,
        phoneNumber: data.phoneNumber,
        photo: ridPt,
        tellUsAboutYourself: data.tellUsAboutYourself,
        yourDistrict: data.yourDistrict,
        yourEmail: data.yourEmail,
        yourName: data.yourName,
        yourRegion: data.yourRegion,
      };

      axiosSecoir
        .post("/rider", sendData)
        .then((res) => {
          // console.log(res.data);
          // toast.success("Rider Creat Successfully");
          nmaviget("/dasbord");
          Swal.fire({
            icon: "success",
            title: "Rider Successfully Created",
            text: "The rider has been added. You will receive their details via email within a few days.",

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
        })
        .catch((err) => {
          toast.warning(err.code);
        });
    });
  };

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setTop(data);
      });
  }, []);

  // console.log(top);
  return (
    <div className=" my-10 min-h-screen">
      {show ? (
        ""
      ) : (
        <>
          <div className="bg-white rounded-3xl shadow-lg  w-full p-8 md:p-12">
            {/* Image placeholder section */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Blue blob background */}
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 transform scale-110"></div>

                {/* Image container with border */}
                <div>
                  <img
                    src={newAdd}
                    alt="Delivery person"
                    className="w-full h-full "
                  />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl  text-secondary font-semibold text-center mb-4">
              How Earning Works
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>

            {/* Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShow(!show)}
                className="bg-primary hover:bg-lime-300 text-gray-900 font-semibold px-8  md:px-15 py-1.5 md:py-2 rounded-full flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span className="text-lg">Apply Now Rider</span>
                <div className="bg-gray-900 rounded-full p-2">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <h1 className="text-3xl font-semibold text-secondary mt-15 text-center mb-12">
              Our Top Rider
            </h1>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {top.map((agent, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {/* Image Placeholder */}
                  <div
                    className={`${agent.bgColor} h-64 flex items-center justify-center`}
                  >
                    <div className="text-center text-gray-400">
                      <p className="text-xs mt-1">{agent.name}</p>
                    </div>

                    <img
                      src={agent.user_photoURL}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Agent Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {agent.userName}
                    </h3>
                    <p className="text-gray-500 text-sm">Role : Rider</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {show && (
        <div className="bg-white min-h-[80vh] rounded-lg my-20">
          <div className=" p-5 md:p-15 py-12 md:py-15 ">
            <div>
              <h1 className=" text-3xl font-bold text-secondary">Be a Rider</h1>
              <p className="max-w-[500px] text-md font-medium text-thried mt-2.5 text-justify">
                Enjoy fast, reliable parcel delivery with real-time tracking and
                zero hassle. From personal packages to business shipments — we
                deliver on time, every time.
              </p>
            </div>

            <div className=" flex flex-col-reverse md:flex-row gap-10  md:justify-between  md:items-center">
              {/* Form Section */}
              <div className="bg-white border flex-1  border-base-300 rounded-lg mt-10   p-6 sm:p-8 md:p-10">
                <h2 className="text-xl  font-bold text-thried mb-6 sm:mb-8">
                  Tell us about yourself
                </h2>

                <div className="border-t md:border-0 pt-4 md:pt-0 border-b pb-4 md:pb-0 border-base-300">
                  <h3 className="font-semibold text-lg text-secondary mb-3">
                    Reciver Details
                  </h3>
                  <form
                    onSubmit={handleSubmit(handelFrom)}
                    className="space-y-5 mt-4 md:mt-7"
                  >
                    {/* Your Name */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                        Your Name
                      </label>
                      <input
                        type="text"
                        {...register("yourName", { required: true })}
                        defaultValue={user?.displayName}
                        readOnly
                        className="w-full px-4 py-2.5 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm border-black/50 placeholder:text-black/90 md:text-base"
                      />
                      {errors.yourName?.type === "required" && (
                        <p className="text-red-500 text-xs font-semibold mt-1">
                          Please Fillup Your Name
                        </p>
                      )}
                    </div>

                    {/* Your Email */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                        Your Email
                      </label>
                      <input
                        type="email"
                        {...register("yourEmail", { required: true })}
                        defaultValue={user?.email}
                        readOnly
                        className="w-full px-4 py-2.5 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm border-black/50 placeholder:text-black/90 md:text-base"
                      />
                      {errors.yourEmail?.type === "required" && (
                        <p className="text-red-500 text-xs font-semibold mt-1">
                          Please Fillup Your Email
                        </p>
                      )}
                    </div>

                    {/* photo Field */}
                    <div className="mb-4 md:mb-5">
                      <label className="block text-gray-900 font-medium mb-2">
                        Photo File
                      </label>
                      <div className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent">
                        <input
                          type="file"
                          className="file-input file-input-ghost focus:outline-none "
                          {...register("photo", { required: true })}
                        />
                      </div>
                      {errors.photo?.type === "required" && (
                        <p className="text-red-500 text-xs font-semibold mt-1">
                          Must be Privied Image File
                        </p>
                      )}

                      {errors.name?.type === "required" && (
                        <p className="text-red-500 text-xs font-semibold mt-1">
                          Must be Complete Field
                        </p>
                      )}
                    </div>

                    {/* Driving License Number */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                        Driving License Number
                      </label>
                      <input
                        type="text"
                        {...register("drivingLicenseNumber", {
                          required: true,
                        })}
                        placeholder="Driving License Number"
                        className="w-full px-4 py-2.5 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm border-black/50 placeholder:text-black/90 md:text-base"
                      />
                      {errors.drivingLicenseNumber?.type === "required" && (
                        <p className="text-red-500 text-xs font-semibold mt-1">
                          Please Fillup Driving License Number
                        </p>
                      )}
                    </div>

                    {/* Your Region */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                        Your Region
                      </label>
                      <select
                        {...register("yourRegion", { required: true })}
                        className="w-full px-4 py-2.5 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm border-black/50 placeholder:text-black/90 md:text-base select"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select your Region
                        </option>
                        {regionsDuplicate.map((region, i) => (
                          <option key={i} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Your District */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                        Your District
                      </label>
                      <select
                        {...register("yourDistrict")}
                        className="w-full px-4 py-2.5 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm border-black/50 placeholder:text-black/90 md:text-base select"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select your District
                        </option>
                        {handelRieder(reiderReguon).map((district, i) => (
                          <option key={i} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* NID No */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                        NID No
                      </label>
                      <input
                        type="text"
                        {...register("nidNo", { required: true })}
                        placeholder="NID"
                        className="w-full px-4 py-2.5 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm border-black/50 placeholder:text-black/90 md:text-base"
                      />
                      {errors.nidNo?.type === "required" && (
                        <p className="text-red-500 text-xs font-semibold mt-1">
                          Please Fillup NID No
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("phoneNumber", { required: true })}
                        placeholder="Phone Number"
                        className="w-full px-4 py-2.5 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm border-black/50 placeholder:text-black/90 md:text-base"
                      />
                      {errors.phoneNumber?.type === "required" && (
                        <p className="text-red-500 text-xs font-semibold mt-1">
                          Please Fillup Phone Number
                        </p>
                      )}
                    </div>

                    {/* Bike Brand Model and Year */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                        Bike Brand Model Name
                      </label>
                      <input
                        type="text"
                        {...register("bikeBrandModelAndYear", {
                          required: true,
                        })}
                        placeholder="Bike Brand Model and Year"
                        className="w-full px-4 py-2.5 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm border-black/50 placeholder:text-black/90 md:text-base"
                      />
                      {errors.bikeBrandModelAndYear?.type === "required" && (
                        <p className="text-red-500 text-xs font-semibold mt-1">
                          Please Fillup Bike Brand Model Name
                        </p>
                      )}
                    </div>

                    {/* Bike Registration Number */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                        Bike Registration Number
                      </label>
                      <input
                        type="text"
                        {...register("bikeRegistrationNumber", {
                          required: true,
                        })}
                        placeholder="Bike Registration Number"
                        className="w-full px-4 py-2.5 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm border-black/50 placeholder:text-black/90 md:text-base"
                      />
                      {errors.bikeRegistrationNumber?.type === "required" && (
                        <p className="text-red-500 text-xs font-semibold mt-1">
                          Please Fillup Bike Registration Number
                        </p>
                      )}
                    </div>

                    {/* Tell Us About Yourself */}
                    <div>
                      <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                        Tell Us About Yourself
                      </label>
                      <textarea
                        {...register("tellUsAboutYourself", { required: true })}
                        placeholder="Tell Us About Yourself"
                        className="w-full px-4 py-2.5 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm border-black/50 placeholder:text-black/90 md:text-base"
                      ></textarea>
                      {errors.tellUsAboutYourself?.type === "required" && (
                        <p className="text-red-500 text-xs font-semibold mt-1">
                          Please Fillup Tell Us About Yourself
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-lime-300 py-2 rounded-md mt-5 font-semibold hover:bg-lime-400 transition-colors"
                    >
                      Apply a Rider
                    </button>
                  </form>
                </div>
              </div>

              <div className="flex-1">
                <div className="  h-full rounded-xl mt-7 md:mt-0">
                  <img src={rider}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderBook;
