import React from "react";
import { Navigate,Outlet } from "react-router-dom";

const AdminPrivateRoutes =()=>{
     const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists
    
      return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;

    
}
export default AdminPrivateRoutes