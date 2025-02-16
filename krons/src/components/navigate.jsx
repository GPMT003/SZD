import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useLastURLNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Ellenőrizzük, hogy van-e tárolt URL a localStorage-ban
    const lastURL = localStorage.getItem('lastURL');

    // Ha van utolsó URL, akkor az oldal betöltése után navigálunk rá
    const handleLoad = () => {
      if (lastURL && lastURL !== window.location.pathname) {
        navigate(lastURL);
        localStorage.removeItem('lastURL');
      }
    };

    // Hozzáadjuk az 'load' eseményfigyelőt, hogy az oldal betöltése után navigáljunk
    window.addEventListener('load', handleLoad);

    // Eseménykezelő a window 'beforeunload' eseményhez, hogy tárolja az URL-t a frissítés előtt
    const handleBeforeUnload = () => {
      const currentPath = window.location.pathname;
      if (currentPath !== localStorage.getItem('lastURL')) {
        localStorage.setItem('lastURL', currentPath);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Takarítás: eltávolítjuk az eseményfigyelőket, ha a komponens eltűnik
    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);
};

export default useLastURLNavigation;
