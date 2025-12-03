import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";

const TrakinkParcel = () => {
  const { trakingId } = useParams();
  const axiosNew = useAxios();

  const { data: trakings = [] } = useQuery({
    queryKey: ["traking", trakingId],
    queryFn: async () => {
      const res = await axiosNew.get(`/traking/${trakingId}`);
      return res.data;
    },
  });

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!trakings.length) return;

    trakings.forEach((_, i) => {
      setTimeout(() => {
        setActiveStep(i + 1);
      }, i * 1000);
    });
  }, [trakings]);

  const progressPercent = Math.round((activeStep / trakings.length) * 100);

  return (
    <div className=" my-10 px-4 md:px-10 py-10 bg-white max-w-7xl mx-auto rounded-2xl shadow-xl">
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-secondary text-center">
        Track your parcel
      </h2>
      <p className="text-center text-gray-600 mt-1">
        Tracking ID: <span className="font-medium">{trakingId}</span>
      </p>

      {/* PROGRESS BAR */}
      <div className="mt-8">
        <div className="w-full bg-gray-200 h-3 rounded-full relative overflow-hidden">
          <div
            className="h-full bg-secondary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-600 mt-2">
          {progressPercent}% Completed
        </p>
      </div>

      {/* NEW ADVANCED TIMELINE REPLACEMENT */}
      <ul className="relative min-h-[65vh] mt-12">
        {/* Static Gray Background Line */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 -translate-x-1/2 rounded-full"></div>

        {/* Animated Active Progress Line */}
        <div
          className="absolute left-1/2 top-0 w-1 
    bg-gradient-to-b from-secondary to-secondary/60 
    rounded-full shadow-[0_0_10px_rgba(0,0,0,0.3)]
    transition-all duration-[1500ms] ease-out -translate-x-1/2"
          style={{
            height: `${((activeStep - 1) / trakings.length) * 100}%`,
          }}
        ></div>

        {trakings.map((step, index) => {
          const isLeft = index % 2 === 0;
          const isCompleted = index < activeStep - 1;
          const isCurrent = index === activeStep - 1;

          return (
            <li
              key={step._id}
              className={`relative py-7 md:py-10 px-2 md:px-4 flex items-center ${
                isLeft ? "justify-start" : "justify-end"
              }`}
            >
              {/* STATUS ICON */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          flex items-center justify-center w-12 h-12 rounded-full shadow-lg border backdrop-blur-sm
          transition-all duration-700
          ${
            isCompleted
              ? "bg-green-500 text-white border-green-600 animate-pulse"
              : isCurrent
              ? "bg-secondary text-white border-secondary"
              : "bg-gray-200 text-gray-500 border-gray-300"
          }`}
              >
                {isCompleted ? (
                  // COMPLETED TICK ICON
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="w-6 h-6"
                  >
                    <path
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.86-9.81a.75.75 
                0 00-1.21-.88L9 13.1l-1.88-1.88a.75.75 0 
                10-1.06 1.06l2.5 2.5a.75.75 0 
                001.14-.09l4.2-5.5z"
                    />
                  </svg>
                ) : isCurrent ? (
                  // CURRENT PROGRESS DOT
                  <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
                ) : (
                  // FUTURE STEPS DOT
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                )}
              </div>

              {/* INFO CARD */}
              <div
                className={`w-[45%] p-4 md:p-6 bg-gray-800 text-white rounded-xl shadow-md border 
          border-gray-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl
          ${isLeft ? "text-left" : "text-right"}`}
              >
                {/* TIME */}
                <p className="text-sm  font-medium mb-1">
                  {new Date(step.crearAt).toLocaleString()}
                </p>

                {/* DETAILS */}
                <p className="text-lg font-semibold ">{step.detlis}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* RIDER LIVE LOCATION MOVING DOT */}
      <div className="mt-10 px-1">
        <h3 className="text-lg font-semibold mb-2">Live Rider Location</h3>
        <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute top-0 h-full w-3 bg-secondary rounded-full animate-[riderMove_4s_linear_infinite]"></div>
        </div>
      </div>

      {/* ANIMATION KEYFRAMES */}
      <style>{`
        @keyframes riderMove {
          0% { left: 0%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default TrakinkParcel;
