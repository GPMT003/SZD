import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './move/Modal';
import Table from './move/Table';
import Alert from './Alert';
import Loader from './Loader';

function Move() {
  const [moves, setMoves] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoves();
  }, []);

  const fetchMoves = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/allCode', {},
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
      setMoves(response.data);
      setLoading(false);
    } catch (error) {
      setAlert({ message: 'Hiba történt az adatok lekérése során', type: 'error' });
      setLoading(false);
    }
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const handleEditClick = () => {
    if (selectedRow) {
      setIsModalOpen(true);
      setIsNewEntry(false);
    } else {
      setAlert({ message: 'Kérlek válassz egy projektet a szerkesztéshez!', type: 'warning' });
    }
  };

  const handleAddClick = () => {
    setSelectedRow(null);
    setIsModalOpen(true);
    setIsNewEntry(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
    setAlert({ message: '', type: '' });
  };

  const handleSave = async (updatedRow) => {
    try {
      let response;
      if (isNewEntry) {
        response = await axios.post('http://localhost:8000/api/store', updatedRow,
          { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
      } else {
        response = await axios.post('http://localhost:8000/api/update', updatedRow,
          { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
        const updatedMoves = moves.map((move) =>
          move.id === updatedRow.id ? updatedRow : move
        );
      }
      fetchMoves()
      setAlert({ message: response.data.message, type: 'success' });
      handleModalClose();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Hiba történt a mentés során';
      setAlert({ message: errorMessage, type: 'error' });
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
                <h3 className="font-semibold text-base text-blueGray-700 uppercase">Mozgásnemek</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  onClick={handleAddClick}
                  className="bg-indigo-500 text-white py-2 px-3 rounded-lg font-bold font-bold text-xs uppercase mx-1 my-1"
                  type="button"
                >
                  Új hozzáadása
                </button>
                <button
                  onClick={handleEditClick}
                  className="bg-yellow-500 text-indigo py-2 px-3 rounded-lg font-bold text-xs uppercase mx-1 my-1"
                  type="button"
                >
                  Szerkesztés
                </button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <Table moves={moves} handleRowSelect={handleRowSelect} selectedRow={selectedRow} />
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} onSave={handleSave} initialData={selectedRow} />
      {alert.message && <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
    </div>
  );
}

export default Move;
