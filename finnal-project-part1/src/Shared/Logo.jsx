import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img src={logo}></img>
      <p className=" text-3xl font-semibold  -ms-3.5">zapShift</p>
    </Link>
  );
};

export default Logo;
