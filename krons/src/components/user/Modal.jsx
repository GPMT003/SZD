import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    role: false,
    is_active: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || false,
        is_active: initialData.is_active ?? false,
      });
    } else {
      resetFormData();
    }
  }, [initialData]);

  const resetFormData = () => {
    setFormData({
      id: '',
      name: '',
      email: '',
      role: false,
      is_active: false,
    });
  };

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {initialData ? 'Felhasználó szerkesztése' : 'Új felhasználó hozzáadása'}
        </h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Név', type: 'text', name: 'name', value: formData.name },
            { label: 'Email', type: 'email', name: 'email', value: formData.email },
          ].map(({ label, type, name, value }) => (
            <div key={name} className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor={name}>
                {label}:
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          ))}

          {[
            { label: 'Admin jog', name: 'role', checked: formData.role },
            { label: 'Felhasználó aktív', name: 'is_active', checked: formData.is_active },
          ].map(({ label, name, checked }) => (
            <div key={name} className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor={name}>
                {label}:
              </label>
              <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={handleChange}
                className="mr-2"
              />
              <span>{checked ? 'Igen' : 'Nem'}</span>
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
};

export default Modal;
