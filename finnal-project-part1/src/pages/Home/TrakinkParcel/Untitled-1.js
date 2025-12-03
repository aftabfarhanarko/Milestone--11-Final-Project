  <div className="p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-secondary mb-12 text-center dark:text-secondary">
          Track your package: {trakingId}
        </h2>

        <ul className="relative min-h-[60vh]">
          {/* Vertical Line */}
          <div
            className="absolute left-1/2 top-0 h-full w-1 
      bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent 
      -translate-x-1/2 rounded-full"
          ></div>

          {trakings?.map((one, index) => {
            const isLeft = index % 2 === 0;

            return (
              <li
                key={one._id}
                className={`relative py-10 px-4 flex items-center ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                {/* Connector Dot + Icon */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              flex items-center justify-center w-12 h-12
              bg-gradient-to-br from-secondary/20 to-secondary/10
              text-secondary rounded-full shadow-lg backdrop-blur-sm
              animate-pulseSlow border border-secondary/20 z-20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Card */}
                <div
                  className={`w-[45%] p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border 
              border-gray-200 dark:border-gray-700 transition-all duration-300 
              hover:-translate-y-1 hover:shadow-xl ${
                isLeft ? "text-left" : "text-right"
              }`}
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
                    {new Date(one.crearAt).toLocaleString()}
                  </p>

                  <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold leading-relaxed">
                    {one.detlis}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>



// 2
  const totalSteps = trakings?.length || 0;
 <div className="p-10 bg-white  rounded-2xl shadow-lg border border-gray-100 ">
        <h2 className=" text-2xl md:text-3xl font-bold text-secondary mb-12 text-center">
          Track your package:{" "}
          <span className=" text-lg md:text-xl">{trakingId}</span>
        </h2>

        <ul className="relative min-h-[65vh]">
          {/* Static Gray Line */}
          <div
            className="absolute left-1/2 top-0 h-full w-1 
      bg-gray-300 dark:bg-gray-700 -translate-x-1/2 rounded-full"
          ></div>

          {/* Animated Live Progress Line */}
          <div
            className="absolute left-1/2 top-0 w-1 
        bg-gradient-to-b from-secondary to-secondary/60 
        rounded-full shadow-[0_0_10px_rgba(0,0,0,0.3)] 
        transition-all duration-[1500ms] ease-out -translate-x-1/2"
            style={{
              height: `${(totalSteps / totalSteps) * 100}%`,
              maxHeight: `${((totalSteps - 1) / totalSteps) * 100}%`,
            }}
          ></div>

          {trakings?.map((one, index) => {
            const isLeft = index % 2 === 0;
            const completed = true; // সবই completed দেখাবে
            const isLast = index === totalSteps - 1;

            return (
              <li
                key={one._id}
                className={`relative py-15 px-2 md:px-4 flex items-center ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                {/* Status Icon */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              flex items-center justify-center w-12 h-12 rounded-full
              shadow-lg backdrop-blur-sm border
              ${
                completed
                  ? "bg-secondary text-white border-secondary animate-pulse"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 border-gray-300"
              }`}
                >
                  {completed ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 
                  00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 
                  10-1.06 1.061l2.5 2.5a.75.75 0 
                  001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  )}
                </div>

                {/* Info Card */}
                <div
                  className={`w-[45%] p-3 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border 
                border-gray-200 dark:border-gray-700 
                transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                ${isLeft ? "text-left" : "text-right"}`}
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
                    {new Date(one.crearAt).toLocaleString()}
                  </p>

                  <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold">
                    {one.detlis}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>