import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import Loding from "../../../Shared/Loding";
import { MdCancel, MdCheckCircle, MdOutlineRateReview } from "react-icons/md";
import { toast } from "sonner";
import Swal from "sweetalert2";

const AssingDiliveryTask = () => {
  const { user } = useAuth();
  const axiosSecore = useAxiosSecoir();
  const {
    data: parcel = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcel", user.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecore.get(
        `parcel/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned`
      );
      return res.data;
    },
  });

  // console.log(parcel);

  const handelAcceptsPsrcel = (items, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: items.riderId,
      trakingId: items.trakingId,
    };
    let message = `Parcel Status is updated with ${status
      .split("-")
      .join(" ")}`;
    axiosSecore.patch(`/parcel/${items._id}/status`, statusInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `Rider Actions Proprely`,
          text: message,
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
      // console.log(res.data);
    });
  };

  const handelRiderRegectParcel = (item) => {
    const statusInfo = { deliveryStatus: "cancelled" };
    axiosSecore.patch(`/parcel/${item._id}/status`, statusInfo).then((res) => {
      // console.log(res.data);
      refetch();
      toast.success("Parcel Hand Over Rider");
    });
  };

  if (isLoading) {
    return <Loding></Loding>;
  }
  return (
    <div className=" p-2 md:p-5">
         <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400">
         Parcels Pending Pickup:{parcel?.length}
      </h1>
      

      <div className=" md:min-h-auto min-h-[90vh]">
        <div className="overflow-x-auto mt-5  dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-200 text-left">
              <tr>
                <th className="p-4 font-semibold">Srl No</th>
                <th className="p-4 px-10 md:px-0 font-semibold">Parcel Name</th>
                <th className="p-4 px-10 md:px-0 font-semibold">Weight </th>
                <th className="p-4 px-5 md:px-0 font-semibold">
                  Reciver Districk
                </th>
                <th className="p-4 px-5 md:px-0 font-semibold">
                  Delivery Status
                </th>
                <th className="p-4 font-semibold">Rider Pickup</th>
                <th className="p-4 font-semibold">Other Actions</th>
              </tr>
            </thead>

            <tbody>
              {parcel.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:via-gray-800 dark:hover:to-gray-900 transition"
                >
                  {/* Serial */}
                  <td className=" pl-6 font-semibold text-gray-900 dark:text-gray-200">
                    {i + 1}
                  </td>

                  <td className="py-4 px-4 md:px-0">
                    <p className="font-semibold text-gray-900 dark:text-gray-200 text-[16px]">
                      {item.percilname}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-200 text-[15px]">
                      {item.parcelType}
                    </p>
                  </td>

                  <td className="py-4 px-7 md:px-0">
                    <p className="font-semibold text-red-500 text-[16px]">
                      {item.weight}Kg
                    </p>
                  </td>

                  <td className="py-4 px-10 md:px-0  text-gray-900 dark:text-gray-200">
                    <p className=" text-[16px] font-semibold text-gray-900 dark:text-gray-200">
                      {item.reciverRegion}
                    </p>

                    <p className=" text-[15px]  text-gray-900 dark:text-gray-200">
                      {item.reciverDistrick}
                    </p>
                  </td>

                  <td className="py-4 px-10 md:px-0 ">
                    <p className="text-[17px] font-semibold text-gray-900 dark:text-gray-200">
                      {item.deliveryStatus}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    {item.deliveryStatus === "driver-assigned" ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handelAcceptsPsrcel(item, "rider-arriving")
                          }
                          className="px-4 py-1.5 rounded-lg bg-white text-green-600 border border-green-300 
                                                  flex items-center gap-2 font-medium hover:bg-green-50 hover:shadow-sm transition "
                        >
                          Accepts <MdCheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handelRiderRegectParcel(item)}
                          className="px-4 py-1.5 rounded-lg bg-white text-red-600 border border-red-300 
                                                  flex items-center gap-2 font-medium hover:bg-red-50 hover:shadow-sm transition"
                        >
                          Reject <MdCancel size={20} />
                        </button>
                      </div>
                    ) : (
                      <span className=" text-green-500 font-semibold">
                        Accepted
                      </span>
                    )}
                  </td>
                  <td className=" p-4">
                    {item.deliveryStatus === "parcel-picked-up" ? (
                      <button
                        onClick={() =>
                          handelAcceptsPsrcel(item, "parcel-delivered")
                        }
                        className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 ml-3"
                      >
                        Mark as Delivery
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handelAcceptsPsrcel(item, "parcel-picked-up")
                        }
                        className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                      >
                        Mark as Pickup
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssingDiliveryTask;
