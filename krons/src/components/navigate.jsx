import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useLastURLNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const lastURL = localStorage.getItem('lastURL');

    const handleLoad = () => {
      if (lastURL && lastURL !== window.location.pathname) {
        navigate(lastURL);
        localStorage.removeItem('lastURL');
      }
    };

    window.addEventListener('load', handleLoad);
    const handleBeforeUnload = () => {
      const currentPath = window.location.pathname;
      if (currentPath !== localStorage.getItem('lastURL')) {
        localStorage.setItem('lastURL', currentPath);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);
};

export default useLastURLNavigation;
