import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosShire = axios.create({
  baseURL: "https://final-project-server-self.vercel.app/",
});

const useAxiosSecoir = () => {
  const { user, userLogOut } = useAuth();
  const naviget = useNavigate();
  useEffect(() => {
    const requesId = axiosShire.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
      }
      return config;
    });
    const resonSError = axiosShire.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const code = err?.status;
        if (code === 401 || code === 403) {
          userLogOut().then(() => {
            naviget("/login");
          });
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axiosShire.interceptors.request.eject(requesId);
      axiosShire.interceptors.response.eject(resonSError);
    };
  }, [user?.accessToken, userLogOut]);
  return axiosShire;
};

export default useAxiosSecoir;
