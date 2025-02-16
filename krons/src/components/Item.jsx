import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Item/Table';
import Modal from './Item/Modal';
import Alert from './Alert';
import Loader from './Loader';

const vatOptions = ['0%', '5%', '18%', '27%', 'FAD'];
const unitOptions = ['db', 'kg', 'm', 'm2', 'm3'];

const API_URL = 'http://localhost:8000/api';


function Item() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.post(`${API_URL}/items`, {}, { headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      } });
      setItems(response.data);
      setFilteredItems(response.data);
      setLoading(false);
    } catch (error) {
      setAlert({ message: error.response.data.message, type: 'error' });
      setLoading(false);
    }
  };

  const columns = [
    { Header: 'Főkönyvi szám', accessor: 'accountNumber' },
    { Header: 'Cikkszám', accessor: 'itemNumber' },
    { Header: 'Megnevezés', accessor: 'name' },
    { Header: 'ÁFA tartalom', accessor: 'vatContent' },
    { Header: 'Vtsz szám', accessor: 'vtsz' },
    { Header: 'Mennyiségi egység', accessor: 'unit' },
    { Header: 'Elszámoló ár', accessor: 'purchasePrice' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterItems(value);
  };

  const filterItems = (term) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);
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
    setIsModalOpen(true);
    setIsNewEntry(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const handleSave = async (updatedRow) => {
    try {
      let response;
      if (isNewEntry) {
        response = await axios.post(`${API_URL}/createItem`, updatedRow, {headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        } });
      } else {
        response = await axios.post(`${API_URL}/updateItem`, updatedRow, {headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        } });
      }
      fetchItems();  
      setIsModalOpen(false);
      setSelectedRow(null);
    } catch (error) {
      setAlert({ message: error.response.data.message, type: 'error' });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-auto mt-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700 uppercase">Tételek</h3>
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
                  type="button"
                  onClick={handleEditClick}
                >
                  Módosítás
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
            <Table columns={columns} data={filteredItems} onRowSelect={handleRowSelect} selectedRow={selectedRow} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSave}
          initialData={isNewEntry ? {} : selectedRow}
          vatOptions={vatOptions}
          unitOptions={unitOptions}
        />
      )}
      {alert.message && <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
    </div>
  );
}

export default Item;
