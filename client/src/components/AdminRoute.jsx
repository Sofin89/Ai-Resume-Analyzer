// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const AdminRoute = () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));

//     // Check if user is logged in and is admin
//     if (userInfo && userInfo.isAdmin) {
//         return <Outlet />;
//     }

//     // If not admin, redirect to home
//     return <Navigate to="/" replace />;
// };

// export default AdminRoute;


import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { user: userInfo, loading } = useAuth();

  if (loading) return null;

  // Check if user is authenticated and is admin
  const isAuthenticated = userInfo && userInfo.token;
  const isAdmin = isAuthenticated && (
    userInfo.email === "sofinmansuri0@gmail.com" ||
    userInfo.isAdmin === true ||
    userInfo.email.includes("admin") ||
    userInfo.email === "admin@example.com"
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    // Show access denied or redirect to home
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;