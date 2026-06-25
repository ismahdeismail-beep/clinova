import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { userData } = useAuth();

  if (!userData) {
    // If not logged in, you might redirect to a login page.
    // Assuming there's no dedicated login page yet, we can redirect to home.
    return <Navigate to="/" replace />;
  }

  if (requiredRole && userData.role !== requiredRole) {
    // User doesn't have the required role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
