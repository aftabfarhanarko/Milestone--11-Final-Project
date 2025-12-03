import React from "react";
import Logo from "../Shared/Logo";
import { Link, Outlet } from "react-router";
import loogo from "../assets//authImage.png";
import { Toaster } from "sonner";
import { BsArrowLeft } from "react-icons/bs";


const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto min-h-screen ">
        {/* Main Content */}
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Left Side - Form */}
          <div className="flex-1 ">
            {/* Logo */}
            <div className="mb-8 mt-10 pl-3 md:pl-0  md:ml-22">
            <Link to="" className="text-lg font-semibold  text-secondary flex gap-1.5  items-center hover:underline" >
            <BsArrowLeft className=" w-4 md:w-5 h-5 md:h-6"/>  Back To Home Page</Link>
     
              <div className="mt-3">
                <Logo></Logo>
              </div>
            </div>
            <Outlet></Outlet>
          </div>

          {/* Right Side - Illustration */}
          <div className="flex-1 flex items-center justify-center bg-[#FAFDF0] rounded-lg  md:min-h-screen">
            <div className="relative w-full max-w-md aspect-square">
              {/* Background circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full max-w-sm max-h-sm bg-lime-100 rounded-full opacity-50"></div>
              </div>

              {/* Illustration container */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <img src={loogo} className="w-full h-full"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default AuthLayout;
