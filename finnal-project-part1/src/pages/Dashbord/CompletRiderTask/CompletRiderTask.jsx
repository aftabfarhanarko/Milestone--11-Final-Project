import React from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import { useQuery } from "@tanstack/react-query";
import Loding from "../../../Shared/Loding";

const CompletRiderTask = () => {
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
        `parcel/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered`
      );
      return res.data;
    },
  });
  const handelCalculateCost = (items) => {
    if (items.senderdistick === items.reciverDistrick) {
      return items.totalCost * 0.6;
    } else {
      return items.totalCost * 0.8;
    }
  };

  if (isLoading) {
    return <Loding></Loding>;
  }

  return (
    <div className="p-3 md:p-5 lg:p-7">
      <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400">
        Your Complet Delivery : {parcel?.length}
      </h1>

<div className="md:min-h-auto min-h-[90vh]"> 


      <div className="overflow-x-auto mt-5  dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-200 text-left">
            <tr>
              <th className="p-4 font-semibold">Srl No</th>
              <th className="p-4 px-10 md:px-0 font-semibold">Parcel Name</th>
              <th className="p-4 px-10 md:px-0 font-semibold">Weight </th>
              <th className="p-4 px-5 md:px-0 font-semibold">
                Sender Districk
              </th>
              <th className="p-4 px-5 md:px-0 font-semibold">
                Reciver Districk
              </th>
              <th className="p-4 px-5 md:px-0 font-semibold">Parcel Cost</th>
              <th className="p-4 px-5 md:px-0 font-semibold">Your Amount</th>
              <th className="p-4 font-semibold">Cashout Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcel.map((item, i) => (
              <tr
                key={i}
                 className="border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:via-gray-800 dark:hover:to-gray-900 transition"
              >
                {/* Serial */}
                <td className="p-4 font-semibold text-gray-900 dark:text-gray-200">{i + 1}</td>

                <td className="py-4 px-4 md:px-0">
                  <p className="font-semibold text-gray-900 dark:text-gray-200">
                    {item.percilname}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-gray-200 text-[15px]">
                    {item.parcelType}
                  </p>
                </td>

                <td className="py-4 px-7 md:px-0">
                  <p className="font-semibold text-red-500 text-[16px]">
                    {item.weight}Kg
                  </p>
                </td>

                <td className="py-4 px-10 md:px-0 font-semibold text-gray-900 dark:text-gray-200">
                  <p className=" text-[16px] ">
                    {item.senderRegion}
                  </p>

                  <p className=" text-[13px] font-medium">
                    {item.senderdistick}
                  </p>
                </td>

                <td className="py-4 px-10 md:px-0 font-semibold text-gray-900 dark:text-gray-200">
                  <p className=" text-[16px] font-semibold ">
                    {item.reciverRegion}
                  </p>

                  <p className=" text-[13px] ">
                    {item.reciverDistrick}
                  </p>
                </td>

                <td className="py-4 px-10 md:px-0 text-gray-800">
                  <p className="text-[17px] text-red-600 font-semibold">
                    ${item.totalCost}
                  </p>
                </td>

                <td className="py-4 px-10 md:px-0 text-gray-800">
                  <p className="text-[17px] text-green-600 font-semibold">
                    ${handelCalculateCost(item)}
                  </p>
                </td>

                <td className=" p-4">
                  <button
                    //   onClick={() =>
                    //     // handelCalculateCost(item)
                    //   }
                    className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                  >
                    Cash Out
                  </button>
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

export default CompletRiderTask;
