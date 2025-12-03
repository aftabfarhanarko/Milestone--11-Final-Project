import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../Hook/useAuth";
import { toast } from "sonner";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { forgetPass } = useAuth();

  const handelForget = (data) => {
    forgetPass(data.email).then(() => {
      toast.success("Successfully Forget Password Chack Mail");
      //  window.open("https://mail.google.com/mail/u/0/?ui=2&fs=1&http://localhost:5173/tf=lg", "_blank");
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto  mb-35 px-4 md:mb-10">
      <div className="bg-white/70 rounded-lg p-6 md:p-8 w-full lg:w-8/12 ">
        <h1 className="text-3xl  text-secondary font-bold mb-2">
          Forgot Password
        </h1>
        <p className="text-thried font-medium mb-6 md:mb-8">
          Enter your email address and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit(handelForget)}>
          {/* Email Field */}
          <div className="mb-4 md:mb-5">
            <label className="block text-gray-900 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-xs font-semibold mt-1">
                Please Emaile Provied Now
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-2.5 md:py-3 rounded-lg transition duration-200 mb-4 text-sm md:text-base"
          >
            Send
          </button>
        </form>

        {/* Login Link */}
        <p className=" text-secondary font-medium text-center mb-4 text-sm md:text-base">
          Move on Login Page?{" "}
          <Link to="/" className="text-lime-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
