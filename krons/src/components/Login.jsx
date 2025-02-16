import React, { useState, useContext } from 'react';
import axios from 'axios';
import Alert from './Alert';
import { AuthContext } from './AuthContext'; 
import { useNavigate } from 'react-router-dom';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !password) {
            setErrorMessage('Kérlek, töltsd ki az összes mezőt!');
            setShowAlert(true);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                name,
                password
            });

            // Store session data
            sessionStorage.setItem('role', response.data.role);
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('isLoggedIn', JSON.stringify(true));

            // Update context and navigate
            setIsLoggedIn(true);
            setShowAlert(false);
            navigate('/');
        } catch (error) {
            // Handle specific error types
            setErrorMessage(error.response?.data?.message || 'Hiba történt a folyamat során');
            setShowAlert(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
        setErrorMessage('');
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === 'name') setName(value);
        if (id === 'password') setPassword(value);

        // Reset error message when user starts typing
        if (showAlert) {
            setErrorMessage('');
            setShowAlert(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">KRONOS</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">
                            Felhasználó név:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Jelszó:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 rounded-lg transition duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
                    </button>
                </form>
            </div>
            {showAlert && (
                <Alert message={errorMessage} type="error" onClose={handleCloseAlert} />
            )}
        </div>
    );
}

export default Login;
