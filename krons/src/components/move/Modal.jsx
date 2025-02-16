import React, { useEffect, useState } from 'react';

function Modal({ isOpen, onClose, onSave, initialData = {} }) {
  const [formData, setFormData] = useState({
    moveType: '',
    accountNumber: '',
    isBV: false,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || { moveType: '', accountNumber: '', isBV: false });
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSave(formData);
    if (success) {
      setFormData({ moveType: '', accountNumber: '', isBV: false });
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({ moveType: '', accountNumber: '', isBV: false });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto">

    <div className="fixed inset-0 z-40 bg-gray-500 opacity-75" onClick={handleClose}></div>
    
    {/* Modal content */}
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center min-h-screen px-4 py-20 text-center"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 text-left z-50">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {Object.keys(initialData || {}).length === 0
            ? 'Új mozgásnem hozzáadása'
            : 'Mozgásnem szerkesztése'}
        </h3>

        {/* Move Type input */}
        <div className="mb-4">
          <label htmlFor="moveType" className="block text-sm font-medium text-gray-700">
            Mozgásnem
          </label>
          <input
            type="text"
            name="moveType"
            id="moveType"
            value={formData.moveType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Account Number input */}
        <div className="mb-4">
          <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
            Főkönyvi szám
          </label>
          <input
            type="text"
            name="accountNumber"
            id="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Checkbox input for BV */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isBV"
            name="isBV"
            checked={formData.isBV}
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
          />
          <label htmlFor="isBV" className="ml-3 text-sm font-medium text-gray-700">
            Könyvszerinti értéken történik
          </label>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm text-gray-700 border rounded-md bg-white hover:bg-gray-50"
          >
            Mégse
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Mentés
          </button>
        </div>
      </div>
    </form>
  </div>

  );
}

export default Modal;
