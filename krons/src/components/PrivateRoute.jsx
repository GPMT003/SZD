import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ element, extraCheck }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/belepes" />;
  }

  if (!element) {
    return <Navigate to="/" />;
  }

  if (extraCheck) {
    const role = parseInt(sessionStorage.getItem('role'), 10);
    if (role === 0) {
      return <Navigate to="/404" />;
    }
  }

  return element;
};

export default PrivateRoute;
