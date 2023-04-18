import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../Context/Auth-context";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  } else if (user) {
    return children;
  }
};

export default ProtectedRoute;
