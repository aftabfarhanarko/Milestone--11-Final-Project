import React, { useEffect, useState } from "react";
import {
  ClipboardPlus,
  PackageOpen,
  Clock,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { RiMotorbikeFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import Loding from "../../../Shared/Loding";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const AdminDashBord = () => {
  const axiosSecoir = useAxiosSecoir();
  const { data: pipeline = [], isLoading } = useQuery({
    queryKey: ["pipeline"],
    queryFn: async () => {
      const res = await axiosSecoir.get("/parcel/deliveryStatus/same");
      return res.data;
    },
  });

  const iconMap = {
    "parcel-picked-up": <PackageOpen size={28} className="text-blue-500" />,
    "pending-pickup": <Clock size={28} className="text-green-500" />,
    "driver-assigned": <Truck size={28} className="text-yellow-500" />,
    "rider-arriving": <RiMotorbikeFill size={28} className="text-purple-500" />,
    "parcel-delivered": <CheckCircle2 size={28} className="text-teal-500" />,
  };

  const statusColorMap = {
    "parcel-picked-up": "#3b82f6", // blue
    "pending-pickup": "#10b981", // green
    "driver-assigned": "#facc15", // yellow
    "rider-arriving": "#8b5cf6", // purple
    "parcel-delivered": "#14b8a6", // teal
    Unknown: "#d1d5db", // gray
  };

  const chartData = pipeline.map((item) => ({
    name: item._id || "Parcel Create",
    count: item.count,
    status: item.status || "Unknown",
  }));

  if (isLoading) {
    return <Loding />;
  }

  return (
    <div className="p-3 md:p-5 lg:p-7">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary dark:text-white tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          You can access all your data and information from anywhere.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : pipeline.map((item, i) => (
              <AnimatedCard key={i} item={item} iconMap={iconMap} />
            ))}
      </div>

      {/* Responsive Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-md p-4 md:p-6 border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Parcel Delivery Status Overview
        </h2>

        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 14, fill: "#555" }}
              interval={0}
              angle={-10}
              textAnchor="end"
            />
            <YAxis
              label={{ value: "Count", angle: -90, position: "insideLeft" }}
              tick={{ fontSize: 14, fill: "#555" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontSize: "14px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              itemStyle={{ color: "#333", fontWeight: 500 }}
            />
            <Legend
              wrapperStyle={{
                display: window.innerWidth < 768 ? "none" : "block",
              }}
            />

            {/* Animated Area */}
            <Area
              type="monotone"
              dataKey="count"
              fill="#8884d8"
              stroke="#8884d8"
              fillOpacity={0.2}
              isAnimationActive={true}
              activeDot={false}
            />

            {/* Color-coded Bar with hover effect */}
            <Bar dataKey="count" barSize={30} isAnimationActive={true}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={statusColorMap[entry.status] || "#d1d5db"}
                  style={{
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.target.setAttribute("fill", "#fcd34d"); // hover color
                  }}
                  onMouseLeave={(e) => {
                    e.target.setAttribute(
                      "fill",
                      statusColorMap[entry.status] || "#d1d5db"
                    );
                  }}
                />
              ))}
            </Bar>

            {/* Line on top */}
            <Line
              type="monotone"
              dataKey="count"
              stroke="#ff7300"
              strokeWidth={2}
              activeDot={{ r: 5, fill: "#ff7300", strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Animated Card Component
const AnimatedCard = ({ item, iconMap }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = item.count || 0;
    const duration = 800;
    const incrementTime = end ? Math.floor(duration / end) : duration;
    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [item.count]);

  return (
    <div className="relative group">
      <div className="rounded-3xl p-[3px] bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400">
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300">
          <span className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-2xl transition-opacity duration-300"></span>
          <div className="mb-4 w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-secondary/10 to-secondary/5 shadow-inner group-hover:scale-110 transition-all z-10">
            {iconMap[item._id] || (
              <ClipboardPlus
                className="text-red-400 group-hover:animate-pulse"
                size={28}
              />
            )}
          </div>
          <p className="text-secondary dark:text-white font-semibold text-md tracking-wide mb-1 z-10">
            {item?._id === null
              ? "Parcel Create"
              : item?._id
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
          </p>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white group-hover:text-secondary transition z-10">
            {count}
          </p>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader Card
const SkeletonCard = () => (
  <div className="relative rounded-3xl p-[3px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center shadow-md">
      <div className="mb-4 w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-8 w-14 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

export default AdminDashBord;
