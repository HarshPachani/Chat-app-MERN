import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = ({ children, user, redirect='/Chat-app-MERN/login' }) => {
  if(!user) {
    return <Navigate to={redirect} />
  }
  return children ? children : <Outlet />;
}

export default ProtectRoute