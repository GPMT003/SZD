import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Alert from './Alert';

export const AuthContext = createContext();

const API_URL = 'http://localhost:8000/api/checkToken';

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedStatus = sessionStorage.getItem('isLoggedIn');
    return storedStatus ? JSON.parse(storedStatus) : false; // default to false if no data exists
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
    sessionStorage.setItem('isLoggedIn', JSON.stringify(status));
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) return updateLoginStatus(false);

      try {
        const response = await axios.post(API_URL, {}, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        setShowAlert(false);
        updateLoginStatus(response.data.status);
      } catch (error) {
        updateLoginStatus(false);
        setErrorMessage(error.response?.data?.message || 'Hiba történt a folyamat során');
        setShowAlert(true);
      }
    };

    checkToken();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
      </AuthContext.Provider>
      {errorMessage && showAlert && (
        <Alert message={errorMessage} type="error" onClose={handleCloseAlert} />
      )}
    </>
  );
};
