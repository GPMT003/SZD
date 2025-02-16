import React, { useState, useEffect } from 'react';

function Modal({ isOpen, onClose, onSave, initialData = {}, vatOptions = [], unitOptions = [] }) {
  const defaultVatContent = vatOptions[0] || '';
  const defaultUnit = unitOptions[0] || '';

  const [formData, setFormData] = useState({
    accountNumber: '',
    itemNumber: '',
    name: '',
    vatContent: defaultVatContent,
    vtsz: '',
    orderNumber: '',
    unit: defaultUnit,
    purchasePrice: '',
  });

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData({ ...formData, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      vatContent: formData.vatContent || defaultVatContent,
      unit: formData.unit || defaultUnit,
    };

    await onSave(dataToSend);
    //onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg z-10 w-11/12 sm:w-1/2 max-h-screen overflow-y-auto"
      >
        <h2 className="text-2xl mb-4">{initialData ? 'Módosítás' : 'Új bevitel'}</h2>

        {[
          { label: 'Főkönyvi szám', name: 'accountNumber', type: 'text' },
          { label: 'Cikkszám', name: 'itemNumber', type: 'text' },
          { label: 'Megnevezés', name: 'name', type: 'text' },
          { label: 'Vtsz szám', name: 'vtsz', type: 'text' },
          { label: 'Elszámoló ár', name: 'purchasePrice', type: 'number' },
        ].map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ))}

        {[
          { label: 'ÁFA tartalom', name: 'vatContent', options: vatOptions },
          { label: 'Mennyiségi egység', name: 'unit', options: unitOptions },
        ].map(({ label, name, options }) => (
          <div className="mb-4" key={name}>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="py-3 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Mentés
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Mégse
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
