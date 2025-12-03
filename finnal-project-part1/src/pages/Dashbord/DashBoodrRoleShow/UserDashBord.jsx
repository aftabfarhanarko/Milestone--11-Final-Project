import React from "react";
import { Card, CardContent } from "../../../ui/Card";
import {
  MapPin,
  Package,
  Clock,
  Mail,
  User,
  Heart,
  Star,
  Gift,
  Ticket,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import { Link } from "react-router";
import Loding from "../../../Shared/Loding";

const spendingData = [
  { month: "Jan", amount: 500 },
  { month: "Feb", amount: 300 },
  { month: "Mar", amount: 650 },
  { month: "Apr", amount: 400 },
  { month: "May", amount: 850 },
];

const UserDashBord = () => {
  const { user } = useAuth();
  const axiosSecoir = useAxiosSecoir();
  const { data , isLoading:newLode} = useQuery({
    queryKey: ["usercreatParcel"],
    queryFn: async () => {
      const res = await axiosSecoir.get(
        `/totaluser/parcel?email=${user.email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });
  const { data: delivered , isLoading} = useQuery({
    queryKey: ["deliveryStatus"],
    queryFn: async () => {
      const res = await axiosSecoir.get(
        `/totalDelivery/deliveryStatus?deliveryStatus=parcel-delivered&email=${user.email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });


  if(isLoading || newLode){
    return <Loding></Loding>
  }
  return (
    <div className="space-y-8 p-3 md:p-5 lg:p-7">
      {/* TITLE */}
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
        User Dashboard
      </h1>

      {/* PROFILE */}
      <Card className="rounded-2xl shadow-lg dark:bg-gray-900">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="w-15 h-15 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                className=" rounded-full w-15 h-15 "
              ></img>
            ) : (
              <User size={40} className="text-white" />
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold dark:text-white">
              {user.displayName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {new Date(user.creatWb).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md border-l-4 border-purple-500 dark:bg-gray-900">
          <CardContent className="p-5">
            <p className="text-gray-500 dark:text-gray-300">
              Total Create Parcel
            </p>
            <h1 className="text-3xl font-bold mt-1 dark:text-white">
              {data?.length}
            </h1>
          </CardContent>
        </Card>

        <Card className="shadow-md border-l-4 border-pink-500 dark:bg-gray-900">
          <CardContent className="p-5">
            <p className="text-gray-500 dark:text-gray-300">Pending</p>
            <h1 className="text-3xl font-bold mt-1 dark:text-white">03</h1>
          </CardContent>
        </Card>

        <Card className="shadow-md border-l-4 border-blue-500 dark:bg-gray-900">
          <CardContent className="p-5">
            <p className="text-gray-500 dark:text-gray-300">Delivered</p>
            <h1 className="text-3xl font-bold mt-1 dark:text-white">
              {delivered?.length}
            </h1>
          </CardContent>
        </Card>
      </div>

      {/* USER SPENDING CHART */}
      <Card className="rounded-2xl shadow-md dark:bg-gray-900">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3 dark:text-white">
            Monthly Spending
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={spendingData}>
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#a855f7"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* LOYALTY RANK */}
      <Card className="rounded-2xl shadow-md dark:bg-gray-900">
        <CardContent className="p-6 flex items-center gap-4">
          <Star size={32} className="text-yellow-400" />
          <div>
            <h2 className="text-xl font-semibold dark:text-white">
              Loyalty Rank: Gold
            </h2>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              You earned 1200 points this year 🎉
            </p>
          </div>
        </CardContent>
      </Card>

      {/* TRACKING TIMELINE */}
      <Card className="rounded-2xl shadow-md dark:bg-gray-900">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3 dark:text-white">
            Parcel Timeline
          </h2>

          <ul className="space-y-4 border-l-2 border-purple-500 pl-4">
            <li>
              <p className="font-semibold dark:text-gray-200">Delivered</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Yesterday, 5 PM
              </p>
            </li>
            <li>
              <p className="font-semibold dark:text-gray-200">
                Out for Delivery
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Yesterday, 2 PM
              </p>
            </li>
            <li>
              <p className="font-semibold dark:text-gray-200">Shipped</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Tue, 11 AM
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          to="/send_parcel"
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
             text-white py-3 px-6 rounded-xl shadow 
             hover:opacity-90 transition-all block text-center"
        >
          Send Parcel
        </Link>
        <Link
          to="/dasbord/paymentHiestory"
          className="bg-purple-500 text-white py-3 rounded-xl shadow hover:bg-purple-600 
             hover:opacity-90 transition-all block text-center"
        >
          Payment Hiestory
        </Link>

        <Link
          to="/dasbord/myparcel"
          className="bg-pink-500 text-white py-3 rounded-xl shadow hover:bg-pink-600
             hover:opacity-90 hover:bg-pink-600 transition-all block text-center"
        >
          My All parcel
        </Link>

        <Link
          to="/mapcover"
          className="bg-lime-600 text-white py-3 rounded-xl shadow hover:bg-lime-700
             hover:opacity-90  transition-all block text-center"
        >
          All Delivery Center
        </Link>
      </div>
    </div>
  );
};

export default UserDashBord;
