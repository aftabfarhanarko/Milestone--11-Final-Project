import React from "react";
import useAuth from "../Hook/useAuth";
import { useLocation } from "react-router";
import Loding from "../Shared/Loding";
import { Navigate } from "react-router";

const PriverRouter = ({ children }) => {
  const { user, loding } = useAuth();
  const location = useLocation();

  if (loding) {
    return <Loding></Loding>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PriverRouter;
