import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { BsFileText, BsPeople, BsJournalPlus, BsJournalMinus, BsBook, BsGear, BsClipboardData, BsFileEarmarkArrowUp, BsWrench, BsPersonPlus, BsDoorOpen } from 'react-icons/bs';
import Alert from './Alert';

const SidebarLink = ({ to, icon, label, onClick }) => (
  <li className="mb-2">
    <NavLink
      to={to}
      onClick={onClick}
      className="block py-2 font-semibold px-4 rounded-lg hover:bg-gray-700 hover:text-white transition duration-200 ease-in-out uppercase"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium hidden sm:inline">{label}</span>
      </div>
    </NavLink>
  </li>
);

function Sidebar() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  
  const [status, setStatus] = useState('error');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/logout', {}, {
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` },
      });
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      setIsLoggedIn(false);
      sessionStorage.setItem('isLoggedIn', JSON.stringify(false));
      navigate('/belepes');
    } catch (error) {
      let errorMsg = 'Hiba történt a kijelentkezés során!';
      if (error.response) {
        errorMsg = error.response.data.message || errorMsg;
      } else if (error.request) {
        errorMsg = 'A kérés nem válaszolt, kérlek próbáld újra!';
      }
      setErrorMessage(errorMsg);
      setStatus('error');
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const userRole = parseInt(sessionStorage.getItem('role'), 10);

  return (
    <div className="sidebar fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4">
      <h2 className="logo text-xl font-bold mx-3 mt-3 mb-6">NAVIGÁCIOS SÁV</h2>
      <nav>
        <ul>
          <SidebarLink to="/partnertorzs" icon={<BsPeople className="text-lg" />} label="Partnertörzs" />
          <SidebarLink to="/ujbevetel" icon={<BsJournalPlus className="text-lg" />} label="Új Bevétel" />
          <SidebarLink to="/kiadas" icon={<BsJournalMinus className="text-lg" />} label="Új kiadás" />
          <SidebarLink to="/cikktorzs" icon={<BsBook className="text-lg" />} label="Cikktörzs" />
          <SidebarLink to="/dokumentok" icon={<BsFileText className="text-lg" />} label="Dokumentumok" />

          {userRole === 1 && (
            <>
              <SidebarLink to="/mozgaskod" icon={<BsGear className="text-lg" />} label="Mozgáskód" />
              <SidebarLink to="/projekt" icon={<BsClipboardData className="text-lg" />} label="Projektek" />
              <SidebarLink to="/export" icon={<BsFileEarmarkArrowUp className="text-lg" />} label="AdatExport" />
              <SidebarLink to="/beallitas" icon={<BsWrench className="text-lg" />} label="Beállítás" />
              <SidebarLink to="/regisztracio" icon={<BsPersonPlus className="text-lg" />} label="Új felhasználó rögzítése" />

            </>
          )}
          <SidebarLink to="/kilepes" icon={<BsDoorOpen className="text-lg" />} label="Kijelentkezés" onClick={handleLogout} />
        </ul>
      </nav>

      {showAlert && <Alert message={errorMessage} type={status} onClose={handleCloseAlert} />}
    </div>
  );
}

export default Sidebar;
