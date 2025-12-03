import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import Loding from "../../../Shared/Loding";
import { MdCheckCircle } from "react-icons/md";
import { toast } from "sonner";

const AssinRider = () => {
  const [parcelSet, setParcelSet] = useState(null);
  const axioSecore = useAxiosSecoir();
  const referen = useRef();

  const { data: parcel, isLoading,refetch } = useQuery({
    queryKey: ["parcel", "pending-pickup"],
    queryFn: async () => {
      const data = await axioSecore.get("parcel?deliveryStatus=pending-pickup");
      return data.data.result;
    },
  });

  const { data: rider = []  } = useQuery({
    queryKey: ["riders", parcelSet?.reciverDistrick, "available"],
    enabled: !!parcelSet,
    queryFn: async () => {
      const res = await axioSecore.get(
        `ridereas?status=approved&yourDistrict=${parcelSet?.reciverDistrick}&workStatus=available`
      );
      return res.data;
    },
  });

  const riderAssing = (item) => {
    setParcelSet(item);
    referen.current.showModal();
    // refetch();
    toast.success("Assign Rider");
  };

  const handelAssinRider = (ride) => {
    const riderInfo = {
      riderId: ride._id,
      riderEmail: ride.yourEmail,
      riderName: ride.yourName,
      trakingId: parcelSet.trakingId,
    };
    axioSecore.patch(`parcel/${parcelSet._id}`, riderInfo).then((res) => {
      refetch();
      if (res.data.modifiedCount) {
        referen.current.close();
        refetch()
        toast.success("Rider Assigned Successfully");
      }
    });
  };

  if (isLoading) {
    return <Loding />;
  }

  return (
    <div className="p-3 md:p-5 lg:p-7">
      <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400">
        Assign Rider: {parcel?.length}
      </h1>

      {/* Parcel Table */}
      <div className="overflow-x-auto mt-5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-200">
            <tr>
              <th className=" font-semibold">Srl No</th>
              <th className="py-4 font-semibold">Parcel Name</th>
              <th className="py-4 font-semibold">Receiver Info</th>
              <th className="py-4 font-semibold">Tracking Id</th>
              <th className="py-4 font-semibold">Created Time</th>
              <th className="py-4 font-semibold">Cost</th>
              <th className="py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcel.map((item, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:via-gray-800 dark:hover:to-gray-900 transition"
              >
                <td className="p-4  font-medium text-gray-900 dark:text-gray-200">
                  {i + 1}
                </td>
                <td className="p-4">
                  <p className="font-semibold text-gray-900 dark:text-gray-200">
                    {item?.percilname}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item?.parcelType}
                  </p>
                </td>
                <td className="p-4">
                  <p className="font-semibold text-gray-900 dark:text-gray-200">
                    {item?.reciverRegion}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item?.reciverDistrick}
                  </p>
                </td>
                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {item?.trakingId}
                </td>
                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {new Date(item.creatAtime).toLocaleString()}
                </td>
                <td className="p-4 font-semibold text-red-500 dark:text-red-400">
                  ${item.totalCost}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => riderAssing(item)}
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90 hover:scale-105 flex items-center gap-2 font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Find Rider <MdCheckCircle size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Modal */}
      <dialog ref={referen} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white dark:bg-gray-900">
          <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400">
            Total Riders: {rider.length}
          </h3>

          <table className="min-w-full text-sm mt-4">
            <thead className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-4 font-semibold">Srl No</th>
                <th className="p-4 font-semibold">Rider Name</th>
                <th className="p-4 font-semibold">Rider Email</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {rider.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:via-gray-800 dark:hover:to-gray-900 transition"
                >
                  <td className="p-4 font-medium text-gray-900 dark:text-gray-200">
                    {i + 1}
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-gray-900 dark:text-gray-200">
                      {item?.yourName}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-gray-900 dark:text-gray-200">
                      {item?.yourEmail}
                    </p>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handelAssinRider(item)}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90 flex items-center gap-2 font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      Assign <MdCheckCircle size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="modal-action">
            <form method="dialog">
              <button className="px-3 py-1 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssinRider;
