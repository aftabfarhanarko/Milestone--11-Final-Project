import React from "react";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import Loding from "../../../Shared/Loding";
import { Link } from "react-router";

const PaymentHiestory = () => {
  const { user } = useAuth();
  const axiosSecoir = useAxiosSecoir();
  const { data: history, isLoading } = useQuery({
    queryKey: ["idd", user?.email],
    queryFn: () =>
      axiosSecoir.get(`/payment?email=${user?.email}`).then((res) => res.data),
    enabled: !!user?.email,
  });

  //   console.log(data);

  if (isLoading) {
    return <Loding></Loding>;
  }
  return (
    <div className="p-3 md:p-5 lg:p-7">
       <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400">
           Total Payment Hiestory : {history?.length}
      </h1>
     

      <div className="mt-8 md:min-h-auto min-h-[90vh]">
        <div className="overflow-x-auto mt-5  bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-200 text-left">
              <tr>
                <th className="p-4 font-semibold">Srl</th>
                <th className="p-4 font-semibold">Parcel Info</th>
                <th className="p-4 font-semibold">Customer Email</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Transaction ID</th>
                <th className="p-4 font-semibold">Payment Status</th>
                <th className="p-4 font-semibold">Paid At</th>
              </tr>
            </thead>

            <tbody>
              {history?.map((item, i) => (
                <tr
                  key={i}
                  className="border-b  transition dark:bg-gray-900 dark:border-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:via-gray-800 dark:hover:to-gray-900 transition"
                >
                  {/* Serial */}
                  <td className="p-4  font-medium text-gray-900 dark:text-gray-200">
                    {i + 1}
                  </td>

                  {/* Parcel Info */}
                  <td className="p-4 ">
                    <p className="font-semibold text-gray-900 dark:text-gray-200">
                      {item.parcelName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ID: {item.parcelid}
                    </p>
                  </td>

                  {/* Customer Email */}
                  <td className="p-4">
                    <p className="font-semibold text-gray-900 dark:text-gray-200">
                      {item.customerEmail}
                    </p>
                  </td>

                  {/* Amount */}

                  <td className="p-4 text-gray-800  dark:text-gray-200">
                    ${item.amount}
                  </td>

                  {/* Transaction ID */}
                  <td className="p-4 text-blue-600 font-medium">
                    {item.transactionId}
                  </td>

                  {/* Payment Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold 
                  ${
                    item.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>

                  {/* Paid At */}
                  <td className="p-4 font-semibold text-gray-900 dark:text-gray-200">
                    {new Date(item.paidAt).toLocaleString()}
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

export default PaymentHiestory;
