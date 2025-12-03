import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import useAuth from "../../../Hook/useAuth";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import Loding from "../../../Shared/Loding";

const RiderDashBord = () => {
  const axiosSecoir = useAxiosSecoir();
  const { user } = useAuth();

  const { data: delivered = [], isLoading } = useQuery({
    queryKey: ["riderDailyDelivered", user.email],
    queryFn: async () => {
      const res = await axiosSecoir.get(
        `/ridersar/delivery-per-day?email=${user.email}`
      );
      return res.data;
    },
  });

  // Convert API data for chart
  const chartData =
    delivered?.map((item) => ({
      date: new Date(item._id).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      delivered: item.deliveredCount,
    })) || [];

  const colors = ["#6366F1", "#EC4899", "#10B981", "#F59E0B", "#3B82F6"];

  if (isLoading) {
    return <Loding></Loding>;
  }

  return (
    <div className="p-3 md:p-5 lg:p-7">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary dark:text-white">
          Rider Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your delivery performance summary.
        </p>
      </div>

      {/* Daily Delivery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {delivered?.map((item, i) => (
          <DailyDeliveryCard key={i} item={item} />
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Daily Delivery Overview
        </h2>

        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="delivered" barSize={38} radius={[10, 10, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                  className="cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Daily Card Component
const DailyDeliveryCard = ({ item }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = item.deliveredCount;
    const duration = 700;
    const step = end ? Math.floor(duration / end) : duration;

    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, step);

    return () => clearInterval(timer);
  }, [item.deliveredCount]);

  return (
    <div className="relative group">
      <div className="rounded-3xl p-[3px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {new Date(item._id).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <p className="text-4xl font-bold text-secondary dark:text-white mt-2">
            {count}
          </p>

          <p className="text-xs text-gray-500 mt-1">Delivered Parcels</p>
        </div>
      </div>
    </div>
  );
};

export default RiderDashBord;
