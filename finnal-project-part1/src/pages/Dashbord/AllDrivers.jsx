import { useQuery } from "@tanstack/react-query";
import useAxiosSecoir from "../../Hook/useAxiosSecoir";
import Loding from "../../Shared/Loding";
import { MdCancel, MdCheckCircle, MdOutlineRateReview } from "react-icons/md";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const AllDrivers = () => {
  const axiosSecoir = useAxiosSecoir();
  const [modalData, setModalData] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [allRider, setAllRider] = useState(0);
  const limit = 6;
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(allRider / limit);

  const { refetch, data, isLoading } = useQuery({
    queryKey: ["drivers", page],
    queryFn: async () =>
      await axiosSecoir.get(`/riders?limit=${limit}&skip=${skip}`).then((res) => {
        setAllRider(res.data.total);
        return res.data;
      }),
  });

  const updateStatus = (item, status) => {
    const info = { status: status, email: item.email };

    axiosSecoir
      .patch(`/riderUb/${item._id}`, info)
      .then(() => {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider has been ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        toast.warning(err.code);
      });
  };

  const handleApprove = (item) => updateStatus(item, "approved");
  const handleReject = (item) => updateStatus(item, "rejected");
  const handleView = (item) => {
    setModalData(item);
    document.getElementById("rider_info_modal").showModal();
  };
  const handleCloseModal = () => setModalData([]);

  if (isLoading) return <Loding />;

  return (
    <div className="p-6">
       <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400">
          All Riders: {data.total}
      </h1>
     

      <div className="overflow-x-auto mt-5 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-4 font-semibold">Srl No</th>
              <th className="p-4 font-semibold">Rider</th>
              <th className="p-4 font-semibold">Region</th>
              <th className="p-4 font-semibold">All Details</th>
              <th className="p-4 font-semibold">Submit Date</th>
              <th className="p-4 font-semibold">Work Status</th>
              <th className="p-4 font-semibold">Delivery Status</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.result.map((item, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:via-gray-800 dark:hover:to-gray-900 transition"
              >
                <td className="pl-6 font-medium text-gray-900 dark:text-gray-200">{i + 1}</td>
                <td className="py-4 px-4 md:px-0">
                  <div className="md:flex gap-2.5 items-center">
                    <img
                      src={item.photo}
                      alt={`${item.yourName} Photo`}
                      className="w-20 h-20 rounded-lg object-cover border border-gray-300 dark:border-gray-600"
                    />
                    <div>
                      <p className="font-semibold text-md md:text-lg text-gray-900 dark:text-gray-200">{item.yourName}</p>
                      <p className="text-gray-700 dark:text-gray-300">{item.yourEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-7 md:px-0">
                  <p className="font-semibold text-gray-900 dark:text-gray-200">{item.yourRegion}</p>
                  <p className="text-gray-800 dark:text-gray-400">{item.yourDistrict}</p>
                </td>
                <td className="py-4 px-10 md:px-0 text-gray-800 dark:text-gray-200">
                  <p>NID: {item.nidNo}</p>
                  <p>Phone: {item.phoneNumber}</p>
                  <p>Bike: {item.bikeBrandModelAndYear}</p>
                </td>
                <td className="py-4 px-10 md:px-0 text-gray-800 dark:text-gray-200">{new Date(item.creatAtime).toLocaleString()}</td>
                <td className="py-4 px-10 md:px-0 text-gray-800 dark:text-gray-200">{item.workStatus}</td>
                <td className="p-4 px-5 md:px-0">
                  {item.status === "pending" || item.status === "rejected" ? (
                    <span className="text-red-600 bg-red-100 px-3 py-1 rounded-full text-xs font-semibold">
                      {item.status === "rejected" ? "Rejected" : "Pending"}
                    </span>
                  ) : (
                    <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-semibold">Approved</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleApprove(item)}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white flex items-center gap-2 font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
                    >
                      Approve <MdCheckCircle size={16} />
                    </button>
                    <button
                      onClick={() => handleReject(item)}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white flex items-center gap-2 font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
                    >
                      Reject <MdCancel size={16} />
                    </button>
                    <button
                      onClick={() => handleView(item)}
                      className="px-5 py-1.5 rounded-lg bg-white text-gray-900 border border-gray-300 flex items-center gap-2 font-semibold hover:shadow-md hover:scale-105 transition"
                    >
                      View <MdOutlineRateReview className="text-blue-500" size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="my-6 flex justify-between items-center px-6 select-none">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`flex items-center gap-2 px-4 py-1 rounded-lg font-medium transition ${
              page === 1
                ? "text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90"
            }`}
          >
            <FaArrowLeftLong className="transition-transform duration-300 group-hover:-translate-x-1" />
            Previous
          </button>
          <div className="flex items-center gap-3">
            {Array.from({ length: totalPage }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition ${
                  page === i + 1
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
            className={`flex items-center gap-2 px-4 py-1 rounded-lg font-medium transition ${
              page === totalPage
                ? "text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90"
            }`}
          >
            Next <FaArrowRightLong />
          </button>
        </div>
      </div>

      {/* Rider Modal */}
      <dialog id="rider_info_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full max-w-3xl bg-white dark:bg-gray-900 backdrop-blur-xl shadow-2xl rounded-3xl border border-gray-200 dark:border-gray-700 p-8">
          <h3 className="font-bold text-2xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-center">
            Rider Details
          </h3>

          <div className="flex justify-center mb-6">
            <img
              src={modalData?.photo}
              alt="Rider Photo"
              className="w-36 h-36 rounded-2xl object-cover border border-gray-300 dark:border-gray-600 shadow-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
              <p className="font-semibold text-lg">{modalData?.yourName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-semibold text-lg">{modalData?.yourEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
              <p className="font-semibold text-lg">{modalData?.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">District</p>
              <p className="font-semibold text-lg">{modalData?.yourDistrict}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Region</p>
              <p className="font-semibold text-lg">{modalData?.yourRegion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rider Role</p>
              <p className="font-semibold text-lg">{modalData?.roll}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bike Brand</p>
              <p className="font-semibold text-lg">{modalData?.bikeBrandModelAndYear}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Registration No</p>
              <p className="font-semibold text-lg">{modalData?.bikeRegistrationNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">License No</p>
              <p className="font-semibold text-lg">{modalData?.drivingLicenseNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">NID No</p>
              <p className="font-semibold text-lg">{modalData?.nidNo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <p
                className={`${
                  modalData.status === "approved"
                    ? "font-semibold px-3 py-1.5 bg-green-100 text-green-700 rounded-xl inline-block"
                    : modalData.status === "rejected"
                    ? "font-semibold px-3 py-1.5 bg-red-100 text-red-600 rounded-xl inline-block"
                    : "font-semibold px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-xl inline-block"
                }`}
              >
                {modalData?.status}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Created At</p>
              <p className="font-semibold text-lg">{modalData?.creatAtime?.slice(0, 10)}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">About</p>
              <p className="font-semibold bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border mt-1 text-lg leading-relaxed">
                {modalData?.tellUsAboutYourself}
              </p>
            </div>
          </div>

          <div className="modal-action mt-6 flex justify-center">
            <form method="dialog">
              <button
                onClick={handleCloseModal}
                className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllDrivers;
