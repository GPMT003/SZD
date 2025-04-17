import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './partner/Table';
import Modal from './partner/Modal';
import Alert from './Alert';
import Loader from './Loader';
import { debounce } from 'lodash'; 

function Partner({ selectedPartner }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState('error');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/partners', {}, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setPartners(response.data);
      setFilteredPartners(response.data);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowAlert(true);
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFilter(value);
  };
  

  const debouncedFilter = debounce((term) => {
    filterPartners(term);
  }, 500);

  const filterPartners = (term) => {
    const filtered = partners.filter((partner) => {
      const taxNumber = partner.taxNumber || '';
      const name = partner.name || '';
      return (
        taxNumber.toLowerCase().includes(term.toLowerCase()) ||
        name.toLowerCase().includes(term.toLowerCase())
      );
    });
    setFilteredPartners(filtered);
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
    if (typeof selectedPartner === 'function') {
      selectedPartner(row.id);
    }
  };

  const handleEditClick = () => {
    if (selectedRow) {
      setIsModalOpen(true);
      setIsNewEntry(false);
    } else {
      setErrorMessage('Kérlek válassz egy projektet a szerkesztéshez!');
      setShowAlert(true);
      setStatus('warning');
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
    setIsNewEntry(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
    setSearchTerm('');  
    filterPartners('');
  };

  const handleSave = async (updatedRow) => {
    try {
      if (isNewEntry) {
        await axios.post('http://localhost:8000/api/createPartner', updatedRow, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
      } else {
        await axios.post(`http://localhost:8000/api/updatePartner`, updatedRow, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
      }
      fetchPartners();
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowAlert(true);
    }
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
                <h3 className="font-semibold text-base text-blueGray-700 uppercase">Partnertörzs</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-indigo-500 text-white py-2 px-3 rounded-lg font-bold text-xs uppercase mx-1 my-1"
                  type="button"
                  onClick={handleAddClick}
                >
                  Új bevitel
                </button>
                <button
                  className="bg-yellow-500 text-indigo py-2 px-3 rounded-lg font-bold text-xs uppercase mx-1 my-1"
                  onClick={handleEditClick}
                >
                  Módosít
                </button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <input
              type="text"
              placeholder="Keresés..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 mb-4 border rounded"
            />
            <Table partners={filteredPartners} onRowSelect={handleRowSelect} selectedRow={selectedRow} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          row={isNewEntry ? null : selectedRow}
          onSave={handleSave}
          onClose={handleModalClose}
          isNewEntry={isNewEntry}
        />
      )}
      {errorMessage && showAlert && <Alert message={errorMessage} type={status} onClose={handleCloseAlert} />}
    </div>
  );
}

export default Partner;
