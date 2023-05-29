import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes() {
  const isAuthenticated = JSON.parse(localStorage.getItem("isLogged") || "false");

  return isAuthenticated ? <Outlet/> : <Navigate to="/" />;
}
