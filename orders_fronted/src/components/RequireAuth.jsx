import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService";

export default function RequireAuth({ children }) {
  const token = authService.getToken();
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}
