import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  Settings,
  Lock,
  HelpCircle,
  LogOut,
  Bell,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import { GoSidebarExpand } from "react-icons/go";
import { HiHomeModern } from "react-icons/hi2";
import useAuth from "../Hook/useAuth";
import useRole from "../Hook/useRole";
import {
  FaRegCreditCard,
  FaTasks,
  FaCheckCircle,
  FaUsers,
  FaHome,
} from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";
import { PiMotorcycleFill } from "react-icons/pi";
import { MdDeliveryDining } from "react-icons/md";
import logoseas from "../assets/logo.png";

const DashbordLayout = () => {
  const { user, userLogOut } = useAuth();
  const role = useRole();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Theam Sections
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar w-full bg-white dark:bg-gray-900 shadow-md px-4 md:px-10 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square text-white btn-ghost"
              aria-label="open sidebar"
            >
              <GoSidebarExpand className="w-6 h-6" />
            </label>
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center">
                <img src={logoseas}></img>
                <p className=" text-3xl font-semibold  -ms-3.5 text-white">
                  zapShift
                </p>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Profile */}

            <div className="flex gap-2">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className=" avatar">
                  {user && (
                    <img
                      className="w-13 h-13 rounded-full object-cover shadow-sm"
                      src={user?.photoURL}
                    
                    />
                  )}
                </div>
                <ul
                  tabIndex="-1"
                  className="menu bg-gray-700 menu-sm dropdown-content rounded-box z-1 mt-3 w-30  flex items-center p-2 shadow"
                >
                  <input
                    onChange={(e) => handleTheme(e.target.checked)}
                    type="checkbox"
                    defaultChecked={localStorage.getItem("theme") === "dark"}
                    className="toggle"
                  />
                </ul>
              </div>
            </div>

            {/* Notification */}
            <div className="relative">

              <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm hover:shadow-md transition">
                <Bell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </div>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <aside className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 w-64 lg:w-64">
          <ul className="menu flex-1 px-2 space-y-1">
            <div className="mt-4 mb-6 px-4">
              <Link
                to="/"
                className="flex gap-4 items-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
               text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-2xl
               transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaHome className="w-6 h-6 text-white" />
                <p className="text-lg font-semibold">Go Home</p>
              </Link>
            </div>

            {/* Dashboard Home */}
            <li>
              <Link
                to="/dasbord"
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  isActive("/dasbord")
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                }`}
              >
                <HiHomeModern className="w-5 h-5" />
                <span>Dashboard Home</span>
              </Link>
            </li>

            {/* Role-based Menu */}
            {role?.role === "user" && (
              <>
                <li>
                  <Link
                    to="/dasbord/myparcel"
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      isActive("/dasbord/myparcel")
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    <Package className="w-5 h-5" />
                    <span>My Parcel</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dasbord/paymentHiestory"
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      isActive("/dasbord/paymentHiestory")
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    <FaRegCreditCard className="w-5 h-5" />
                    <span>Payment Details</span>
                  </Link>
                </li>
              </>
            )}

            {role?.role === "rider" && (
              <>
                <li>
                  <Link
                    to="/dasbord/assigned-deliveries"
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      isActive("/dasbord/assigned-deliveries")
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    <FaTasks className="w-5 h-5" />
                    <span>Assigned Deliveries</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dasbord/riderCommpletTask"
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      isActive("/dasbord/riderCommpletTask")
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    <FaCheckCircle className="w-5 h-5" />
                    <span>Complete Rider Task</span>
                  </Link>
                </li>
              </>
            )}

            {role?.role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dasbord/deliveries"
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      isActive("/dasbord/deliveries")
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    <PiMotorcycleFill className="w-5 h-5" />
                    <span>All Riders</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dasbord/assinRider"
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      isActive("/dasbord/assinRider")
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    <MdDeliveryDining className="w-5 h-5" />
                    <span>Assign Riders</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dasbord/userManage"
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      isActive("/dasbord/userManage")
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    <FaUsers className="w-5 h-5" />
                    <span>User Manage</span>
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-auto py-4 px-2 flex flex-col gap-2">
            <Link className="flex items-center gap-3 p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Settings className="w-5 h-5 " />
              <span>Settings</span>
            </Link>
            <Link className="flex text-white items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Lock className="w-5 h-5" />
              <span>Change Password</span>
            </Link>
            <Link className="flex items-center text-white gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <HelpCircle className="w-5 h-5" />
              <span>Help</span>
            </Link>
            <Link
              onClick={() => userLogOut()}
              className="flex items-center text-white gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashbordLayout;
