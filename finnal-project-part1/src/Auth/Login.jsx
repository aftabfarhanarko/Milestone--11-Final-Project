import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import registe from "../assets/image-upload-icon.png";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../Hook/useAuth";
import { toast } from "sonner";
import useAxiosSecoir from "../Hook/useAxiosSecoir";

const Login = () => {
  const [show, setShow] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser, googleLogin } = useAuth();
  const naviget = useNavigate();
  const location = useLocation();
  const axiosSecoir = useAxiosSecoir();

  const loginHandel = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        // console.log(result);
        toast.success("Login User Successfully");
        naviget(location?.state ? location?.state : "/");
      })
      .catch((err) => {
        toast.warning(err.code);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((data) => {
        const savedDB = {
          displayName: data.user.displayName,
          photoURL: data.user.photoURL,
          email: data.user.email,
          // password:data.user.password,
        };
        axiosSecoir
          .post("/svuser", savedDB)
          .then((res) => {
            // console.log("Google LOgin", res.data);

            toast.success("Creat User Successfully");
            naviget("/");
          })
          .catch((err) => {
            // console.log(err);
            toast.warning(err.code)
          });
      })
      .catch((err) => {
        toast.warning(err.code);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto mb-53 px-2 md:mb-0">
      <div className="bg-white/70 rounded-lg p-6 md:p-8 w-full lg:w-8/12 ">
        <h1 className="text-3xl  text-secondary font-bold mb-2">
          Welcome Back
        </h1>
        <p className="text-thried font-medium mb-6 md:mb-8">
          Register with ZapShift
        </p>

        {/* Profile Upload Icon */}
        <div className="mb-6 md:mb-8">
          <img src={registe}></img>
        </div>

        <p className="text-sm  border border-gray-700 px-4 py-3 rounded-lg leading-relaxed mb-4">
          <span className="font-semibold text-pink-400">
            Admin Login Email:
          </span>
          <span className="ml-2 text-black">supper@admin.com</span>
          <br />
          <span className="font-semibold text-pink-400">
            Admin Login Password:
          </span>
          <span className="ml-2 text-black">SuPP@@12</span>
        </p>

        <form onSubmit={handleSubmit(loginHandel)}>
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

          {/* Password Field */}
          <div className="mb-5 md:mb-6 relative">
            <label className="block text-gray-900 font-medium mb-2">
              Password
            </label>
            <input
              type={show ? "password" : "text"}
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
              })}
              placeholder="Password"
              className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-xs font-semibold mt-1">
                Must be Provied Password
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-xs font-semibold mt-1">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-xs font-semibold mt-1">
                Need uppercase, lowercase, digit & special character
              </p>
            )}
            <div onClick={() => setShow(!show)} className=" cursor-pointer  ">
              {show ? (
                <FaEyeSlash className="absolute right-5 z-2 top-11 md:top-12.5" />
              ) : (
                <FaEye className="absolute right-5 z-2  top-11 md:top-12.5" />
              )}
            </div>

            <Link
              state={location?.state}
              to="/forget"
              className="font-medium  underline text-secondary hover:text-red-500"
            >
              Forget Password
            </Link>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-2.5 md:py-3 rounded-lg transition duration-200 mb-4 text-sm md:text-base"
          >
            Login
          </button>
        </form>

        {/* Login Link */}
        <p className=" text-secondary font-medium text-center mb-4 text-sm md:text-base">
          No account Please Creat Now?{" "}
          <Link to="/register" className="text-lime-600 underline">
            Register
          </Link>
        </p>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Register Button */}

        <button
          onClick={handleGoogleLogin}
          className="btn w-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-gray-800 font-semibold py-3 border border-blue-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
        >
          <svg
            aria-label="Google logo"
            width="22"
            height="22"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="group-hover:scale-110 transition-transform duration-300"
          >
            <g>
              <path d="m0 0H512V512H0" fill="none"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
