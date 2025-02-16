import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from './Alert';
import Loader from './Loader';

function Settings() {
  const [formData, setFormData] = useState({
    companyName: '',
    taxNumber: '',
    vatNumber: '',
    location: '',
    valuationMethod: 'Fifo'
  });

  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/getSettings', {}, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Nem sikerült betölteni a beállításokat.';
        setAlert({ message: errorMsg, type: 'error' });
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/setSettings', formData, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      if (response.data.status === true) {
        setAlert({ message: response.data.message, type: 'success' });
      } else {
        setAlert({ message: 'Hiba történt a mentés során!', type: 'error' });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Valami hiba történt!';
      setAlert({ message: errorMsg, type: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="py-1 bg-indigoGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-indigoGray-700">Beállítások</h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700">Cég neve</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Adószáma</label>
                <input
                  type="text"
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Közösségi adószáma</label>
                <input
                  type="text"
                  name="vatNumber"
                  value={formData.vatNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Helye</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Készlet értékelési módja</label>
                <select
                  name="valuationMethod"
                  value={formData.valuationMethod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="Fifo">Fifo</option>
                  <option value="AverageCost">Átlagáras</option>
                  <option value="PurchaseCost">Beszerzési áras</option>
                  <option value="AccountingCost">Elszámoló áras</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button type="submit" className="btn bg-indigo-500 text-white">
                  Mentés
                </button>
                <button
                  type="button"
                  className="btn bg-gray-200"
                  onClick={() => setFormData({
                    companyName: '',
                    taxNumber: '',
                    vatNumber: '',
                    location: '',
                    valuationMethod: 'Fifo'
                  })}
                >
                  Mégse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {alert.message && <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
    </div>
  );
}

export default Settings;
