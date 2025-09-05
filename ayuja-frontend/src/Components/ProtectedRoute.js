import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// ✅ Authentication Check Function
const isAuthenticated = () => {
    return !!localStorage.getItem("user"); 
};

// ✅ Protected Route Component
const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;