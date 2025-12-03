import React, { useState } from "react";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {Array.from({ length: 7 }).map((_, i) => (
      <td key={i} className="p-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
      </td>
    ))}
  </tr>
);

const UserManage = () => {
  const axiosSecoir = useAxiosSecoir();
  const [searchNow, setSearchNow] = useState("");

  // pasitions
  const [page, setPage] = useState(1);
  const [allUser, setAllUser] = useState(0);
  const limit = 8;
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(allUser / limit);

  const { refetch, data, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await axiosSecoir.get(
        `/users?searchText=${searchNow}&limit=${limit}&skip=${skip}`
      );
      setAllUser(res.data.total);
      return res.data;
    },
  });

  const handelUpdeat = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecoir.patch(`users/${user._id}/role`, roleInfo).then(() => refetch());
    Swal.fire({
      icon: "success",
      title: `Admin Added: ${user.displayName}`,
      confirmButtonText: "OK",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-lg font-bold",
        confirmButton:
          "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white font-semibold px-6 py-2 rounded-xl",
      },
      buttonsStyling: false,
    });
  };

  const handelremovedAdmin = (user) => {
    const roleInfo = { role: "user" };
    Swal.fire({
      icon: "success",
      title: `Admin Removed: ${user.displayName}`,
      confirmButtonText: "OK",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-lg font-bold",
        confirmButton:
          "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white font-semibold px-6 py-2 rounded-xl",
      },
      buttonsStyling: false,
    }).then(() =>
      axiosSecoir
        .patch(`users/${user._id}/role`, roleInfo)
        .then(() => refetch())
    );
  };

  const handelDeletUser = (id) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        confirmButton:
          "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white font-semibold px-6 py-2 rounded-xl",
        cancelButton:
          "bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-xl",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecoir.delete(`user/${id}`).then(() => refetch());
      }
    });
  };
  // console.log(searchNow);

  return (
    <div className="py-6 md:py-10 px-2 md:px-15">
      {/* Header + Search */}
      <div className="md:flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400">
          All Users: {data?.total || 0}
        </h1>

        <label className="relative mt-3 md:mt-0 max-w-md w-full">
          <input
            type="search"
            name="text"
            onChange={(e) => setSearchNow(e.target.value)}
            placeholder="Search users..."
            className="w-full px-12 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-white placeholder-gray-400 bg-transparent"
          />

          <button
            type="submit"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:opacity-90 transition"
          >
            <IoIosSearch className="w-5 h-5" />
          </button>
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto  dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className=" dark:bg-gray-800 text-left text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-4 font-semibold">Srl</th>
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Joined</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Admin Action</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
              : data.result?.map((user, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 dark:border-gray-700 hover:to-blue-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-4 font-medium text-white">{i + 1}</td>
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={user.photoURL}
                        className="w-13 h-13 rounded-full border-2 border-gradient-to-r from-pink-500 via-purple-500 to-blue-400"
                      />
                      <span className="font-semibold text-gray-900 dark:text-gray-200">
                        {user.displayName}
                      </span>
                    </td>
                    <td className="p-4 px-14 md:px-4 text-gray-800 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-400">
                      {new Date(user.creatWb).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white"
                            : user.role === "rider"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.role === "rider" ? (
                        <span className="text-red-600 font-semibold">
                          Not Update
                        </span>
                      ) : user.role === "admin" ? (
                        <button
                          onClick={() => handelremovedAdmin(user)}
                          className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white shadow-sm transition"
                        >
                          <FaUserTimes />
                        </button>
                      ) : (
                        <button
                          onClick={() => handelUpdeat(user)}
                          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90 shadow-sm transition"
                        >
                          <FaUserShield />
                        </button>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handelDeletUser(user._id)}
                        className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-red-300 text-red-600 hover:bg-red-50 shadow transition"
                      >
                        Delete <MdOutlineDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`flex items-center gap-2 px-4 py-1 rounded-lg font-medium transition ${
              page === 1
                ? "text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90"
            }`}
          >
            <FaArrowLeftLong /> Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPage }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition ${
                  page === i + 1
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
            className={`flex items-center gap-2 px-4 py-1 rounded-lg font-medium transition ${
              page === totalPage
                ? "text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90"
            }`}
          >
            Next <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManage;
