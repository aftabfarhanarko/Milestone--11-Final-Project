import React from "react";
import { XCircle } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const CancelPage = () => {
  return (
    <div className="min-h-[85vh]  flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center border border-gray-200"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <XCircle className="mx-auto text-red-500 drop-shadow-md" size={90} />
        </motion.div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-800 mt-6">
          Payment Cancelled
        </h2>

        {/* Sub message */}
        <p className="text-gray-600 mt-3 text-[15px] leading-relaxed">
          Your payment couldn't be completed.  
          No worries — you can safely retry the payment whenever you're ready.
        </p>

        {/* Highlighted Error Box */}
        <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          <p className="font-medium">⚠ No money has been charged.</p>
          <p className="text-xs mt-1">The process was cancelled before completion.</p>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-4">
          <Link
            to="/"
            className="w-full block bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
          >
            🔙 Back to Home
          </Link>

          <Link
            to="/dasbord/myparcel"
            className="w-full block bg-gray-200 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-300 transition shadow-sm"
          >
            🔁 Try Payment Again
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CancelPage;
