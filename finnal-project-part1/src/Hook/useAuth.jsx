import React, { use } from "react";
import { AuthContext } from "../context/AUthContex.";

const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuth;
