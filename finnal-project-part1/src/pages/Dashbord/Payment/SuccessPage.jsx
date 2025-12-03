import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import { CheckCircle2, Download } from "lucide-react";
import { motion } from "framer-motion";
import Loding from "../../../Shared/Loding";

const SuccessPage = () => {
  const [searchParems] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const axiosSecoir = useAxiosSecoir();
  const [allId, setAllId] = useState({});
  const sessionId = searchParems.get("session_id");

  useEffect(() => {
    setLoading(true);
    if (sessionId) {
      axiosSecoir
        .patch(`/success-payment?session_id=${sessionId}`)
        .then((res) => {
          // console.log(res.data);

          setAllId({
            trakingId: res.data.trakingId,
            transactionId: res.data.transactionId,
            amount: res.data.amount,
            email: res.data.email,
            method: res.data.method,
            date: new Date().toLocaleString(),
          });

          setLoading(false);
        });
    }
  }, [sessionId, axiosSecoir]);

  // console.log(allId);

  if (loading) return <Loding />;

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center 
    
    p-4 sm:p-6 md:p-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl 
          p-6 sm:p-8 md:p-10 lg:p-12 
          rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.12)]
          bg-white/70 backdrop-blur-3xl relative overflow-hidden
        "
      >
        {/* Soft Glow BG */}
        <div className="absolute -top-24 -left-24 w-60 sm:w-72 h-60 sm:h-72 bg-green-300/30 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-24 -right-24 w-60 sm:w-72 h-60 sm:h-72 bg-green-500/25 blur-3xl rounded-full"></div>

        {/* Header */}
        <div className="flex items-center gap-4 sm:gap-5 relative z-10">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-3 sm:p-4 md:p-5 rounded-full bg-green-100 text-green-600 shadow-lg"
          >
            <CheckCircle2 size={35} className="sm:hidden" />
            <CheckCircle2 size={40} className="hidden sm:block md:hidden" />
            <CheckCircle2 size={45} className="hidden md:block" />
          </motion.div>

          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
              Payment Successful 🎉
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Thank you! Your payment has been completed.
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div
          className="mt-8 sm:mt-10 bg-white/80 rounded-2xl 
        p-5 sm:p-8 shadow-lg backdrop-blur-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                TRANSACTION ID
              </p>
              <p className="mt-2 text-sm sm:text-base font-bold text-slate-900 break-all">
                {allId.transactionId}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                PAYMENT METHOD
              </p>
              <p className="mt-2 text-sm sm:text-base font-bold text-slate-900">
                {allId.method || "Online Payment"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                AMOUNT PAID
              </p>
              <p className="mt-2 text-lg sm:text-xl font-bold text-green-600">
                ৳ {allId.amount || "—"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                CUSTOMER EMAIL
              </p>
              <p className="mt-2 text-sm sm:text-base font-bold text-slate-900 break-all">
                {allId.email || "Hide"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                DATE & TIME
              </p>
              <p className="mt-2 text-sm sm:text-base font-bold text-slate-900">
                {allId.date}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                PAYMENT STATUS
              </p>
              <p className="mt-2 text-lg sm:text-xl font-bold text-green-600">
                PAID ✔
              </p>
            </div>
          </div>

          {/* Tracking ID Box */}
          <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-slate-50 shadow-inner">
            <p className="text-xs text-slate-500 font-semibold">TRACKING ID</p>

            <div className="mt-3 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
              <div>
                <p className="text-sm text-slate-700">
                  Your parcel tracking code:
                </p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 mt-1 break-all">
                  {allId.trakingId}
                </p>
              </div>

              <button
                className="
                flex items-center gap-2 px-4 py-2 
                rounded-xl bg-white shadow hover:shadow-md 
                text-sm font-medium transition
              "
              >
                <Download size={18} />
                Download Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="mt-10 flex justify-end">
          <Link
            to="/dasbord/myparcel"
            className="
              px-6 sm:px-7 py-3 text-white font-semibold rounded-xl
              bg-gradient-to-r from-green-600 to-lime-500
              shadow-lg hover:scale-[1.03] transition-all
            "
          >
            Go to My Parcel →
          </Link>
        </div>

        <p className="text-center text-[10px] sm:text-xs text-slate-500 mt-8">
          Need help? Email:
          <span className="font-medium text-slate-700">
            {" "}
            support@yourcompany.com
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
