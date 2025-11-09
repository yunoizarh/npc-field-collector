import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { session, isLoggedIn } = useAuth();
  if (session === undefined) {
    return <div className="loader">Loading...</div>;
  }
  //if no session , navigate to /signin
  //if session, render children
  return session || isLoggedIn ? <>{children}</> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
