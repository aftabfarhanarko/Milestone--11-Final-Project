import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Shared/Logo";
import useAuth from "../Hook/useAuth";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { MdOutlineArrowOutward } from "react-icons/md";

const Navbar = () => {
  const { user, userLogOut } = useAuth();
  const [hide, setHide] = useState(true);

  return (
    <>
      <div className="bg-base-100 shadow-sm md:rounded-lg  md:rounded-xl ">
        <div className="navbar  w-11/12 mx-auto py-5">
          <div className="navbar-start">
            <Logo></Logo>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className=" menu-horizontal px-1 font-medium  text-[#1F1F1F] flex gap-8 list-none  text-[15px] ">
              <li>
                <NavLink to="/" className=" ">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="about" className=" ">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/mapcover" className="">
                  Coverage
                </NavLink>
              </li>

              <li>
                <NavLink to="/raider" className=" ">
                  Apply Rider
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/send_parcel" className="">
                      Send Parcel
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dasbord" className="">
                      Dasbord
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="navbar-end">
            <div className=" hidden md:block  ">
              {user ? (
                <div className="  flex gap-3 items-center">
                  <div className="">
                    <img
                      className=" w-8 md:w-13 h-8 md:h-13 rounded-full"
                      src={user?.photoURL}
                    ></img>
                  </div>
                  <Link>
                    {" "}
                    <button
                      onClick={() => userLogOut()}
                      className="
                   px-6 py-2 
   font-medium  rounded-md
bg-gradient-to-r from-[#b2e36d] via-[#b8e04e] to-[#bae240] 
  font-semibold
hover:from-[#bae240] hover:via-[#c5e854] hover:to-[#d0f060]  transform transition-all  duration-300 ease-out  hover:shadow-xl 
  hover:scale-105 active:scale-95 
  focus:outline-none 
                  "
                    >
                      Logout
                    </button>
                  </Link>
                  <button
                    className="w-9 h-9 md:w-11 md:h-11 -ml-2.5 rounded-full bg-black flex items-center justify-center 
                           hover:bg-gray-800 transition transform hover:-translate-y-0.5"
                  >
                    <MdOutlineArrowOutward className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login">
                    {" "}
                    <button
                      className="
                 px-6 py-2  text-[#82aa09]
  bg-white  outline  rounded-md   transition-all duration-300 ease-out   bg-gradient-to-r hover:from-[#bae240] hover:via-[#c5e854] hover:to-[#d0f060]  transform transition-all  duration-300  hover:text-black hover:shadow-xl  hover:outline-none font-semibold hover:scale-95 active:scale-95  focus:outline-none                        
                  "
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    {" "}
                    <button
                      className="
                   px-6 py-2 
   font-medium  rounded-md
bg-gradient-to-r from-[#b2e36d] via-[#b8e04e] to-[#bae240] 
  font-semibold
hover:from-[#bae240] hover:via-[#c5e854] hover:to-[#d0f060]  transform transition-all  duration-300 ease-out  hover:shadow-xl 
  hover:scale-95 active:scale-95 
  focus:outline-none 
                  "
                    >
                      Register
                    </button>
                  </Link>
                  <button
                    className="w-9 h-9 md:w-11 md:h-11 -ml-2.5 rounded-full bg-black flex items-center justify-center 
                           hover:bg-gray-800 transition transform hover:-translate-y-0.5"
                  >
                    <MdOutlineArrowOutward className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </button>
                </div>
              )}
            </div>

            <div onClick={() => setHide(!hide)} className=" block md:hidden">
              {hide ? (
                <HiOutlineMenuAlt1 className=" w-7 h-7 transition duration-500 ease-in-out" />
              ) : (
                <CgClose className=" w-7 h-7 transition duration-500 ease-in-out" />
              )}
            </div>
          </div>
        </div>
      </div>

      {hide ? (
        ""
      ) : (
        <div className="md:hidden bg-white border-t border-base-300 rounded-b-xl shadow py-5 transition duration-500">
          {/* Navigation */}
          <ul className="md:hidden font-medium text-[#1F1F1F] text-[15px] flex flex-col gap-4 items-center">
            {/* Divider spacing */}
            <div className="gap-5 grid grid-cols-3 justify-center ">

            {/* Bottom 2 items */}
            <li>
              <NavLink to="/" className=" ">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="about" className=" ">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/mapcover" className="">
                Coverage
              </NavLink>
            </li>

            <li>
              <NavLink to="/raider" className=" ">
                Apply Rider
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/send_parcel" className="">
                    Send Parcel
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dasbord" className="">
                    Dasbord
                  </NavLink>
                </li>
              </>
            )}
            </div>
          </ul>


          {/* Profile */}
          <div className="flex  mt-8 justify-center  items-center gap-4 mb-3">
            {user && (
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user?.photoURL}
                alt="profile"
              />
            )}
            {user ? (
              <Link>
                {" "}
                <button
                  onClick={() => userLogOut()}
                  className="
                   px-4 py-1 
   font-medium  rounded-md
bg-gradient-to-r from-[#b2e36d] via-[#b8e04e] to-[#bae240] 
  font-semibold
hover:from-[#bae240] hover:via-[#c5e854] hover:to-[#d0f060]  transform transition-all  duration-300 ease-out  hover:shadow-xl 
  hover:scale-105 active:scale-95 
  focus:outline-none 
                  "
                >
                  Logout
                </button>
              </Link>
            ) : (
              <div className="flex gap-3">
                <Link to="/login">
                  {" "}
                  <button
                    className="
                 px-6 py-2  text-[#82aa09]
  bg-white  outline  rounded-md   transition-all duration-300 ease-out   bg-gradient-to-r hover:from-[#bae240] hover:via-[#c5e854] hover:to-[#d0f060]  transform transition-all  duration-300  hover:text-black hover:shadow-xl  hover:outline-none font-semibold hover:scale-100  active:scale-95  focus:outline-none                        
                  "
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  {" "}
                  <button
                    className="
                   px-6 py-2 
   font-medium  rounded-md
bg-gradient-to-r from-[#b2e36d] via-[#b8e04e] to-[#bae240] 
  font-semibold
hover:from-[#bae240] hover:via-[#c5e854] hover:to-[#d0f060]  transform transition-all  duration-300 ease-out  hover:shadow-xl 
  hover:scale-105 active:scale-95 
  focus:outline-none 
                  "
                  >
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
