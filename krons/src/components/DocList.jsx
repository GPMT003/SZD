import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './document/Table';
import Alert from './Alert';
import Loader from './Loader';

const API_URL = 'http://localhost:8000/api/getDocList';
const getAuthHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  },
});

function DocList() {
  const [documents, setDocuments] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.post(API_URL, {}, getAuthHeaders());
      setDocuments(response.data.doc);
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || 'Hiba történt az adatok lekérése során',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-auto mt-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700 uppercase">Dokumentumok</h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <Table doc={documents} />
          </div>
        </div>
      </div>
      {alert.message && <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
    </div>
  );
}

export default DocList;
