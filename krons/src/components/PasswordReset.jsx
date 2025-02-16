import React, { useState } from 'react';
import axios from 'axios';
import Alert from './Alert';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      setErrorMessage('Érvénytelen vagy hiányzó token!');
      setShowAlert(true)
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('A jelszavak nem egyeznek!');
      setShowAlert(true)
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/password-reset', {
        token,
        email,
        password,
      });

      setErrorMessage(response.data.message || 'Sikeres jelszó-visszaállítás!');
    } catch (error) {
        console.log(error)
      setErrorMessage(
        error.response?.data?.message || 'Hiba történt a jelszó visszaállítása közben.'
      );
    }
    setShowAlert(true)
  };

    const handleCloseAlert = () => {
        setShowAlert(false);
        setErrorMessage('');
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Jelszó visszaállítása</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Új jelszó</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Jelszó megerősítése</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
          >
            Jelszó visszaállítása
          </button>
        </form>
      </div>
      {showAlert && (
                <Alert message={errorMessage} type="error" onClose={handleCloseAlert} />
            )}
    </div>
  );
}
