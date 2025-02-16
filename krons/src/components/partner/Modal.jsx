import React, { useState, useEffect } from 'react';

function Modal({ row = {}, onSave, onClose, isNewEntry }) {
  const [formData, setFormData] = useState({
    id: row?.id || '',
    name: row?.name || '',  
    taxNumber: row?.taxNumber || '',
    address: row?.address || '',
  });

  useEffect(() => {
    
    if (row && Object.keys(row).length > 0) {
      setFormData({
        id: row?.id || '',
        name: row?.name || '',
        taxNumber: row?.taxNumber || '',
        address: row?.address || '',
      });
    }
  }, [row]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-2/3 lg:w-1/2 xl:w-1/3 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl mb-4">{isNewEntry ? 'Új bevitel' : 'Módosítás'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Partner neve</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
            <label className="block text-gray-700">Címe</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="py-3 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Mentés
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Mégse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
