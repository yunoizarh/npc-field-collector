import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RootRedirects = () => {
  const { session } = useAuth();

  if (session === undefined) {
    return <div className="loader">Loading...</div>;
  }
  return session ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />;
};

export default RootRedirects;
