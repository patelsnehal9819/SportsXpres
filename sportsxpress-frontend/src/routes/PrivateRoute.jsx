import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  // Show loading or nothing while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin only check
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Logged in - show the page
  return children;
};

export default PrivateRoute;