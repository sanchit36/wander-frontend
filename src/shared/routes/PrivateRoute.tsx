import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
