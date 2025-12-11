import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // If user is not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → render the component
  return children;
}
