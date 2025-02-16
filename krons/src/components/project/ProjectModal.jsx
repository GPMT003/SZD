import React, { useState, useEffect } from 'react';
import ProjectPartnerModal from './../partner/ProjectPartnerModal';

function ProjectModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  partners,
  isModalOpen_Partner,
  setIsModalOpen_Partner,
}) {
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    contract_amount: '',
    contractor_name: '',
    partner_id: '',
    completion_level: '',
    planned_phases: '',
  });

  // Reset the form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        start_date: '',
        end_date: '',
        contract_amount: '',
        contractor_name: '',
        partner_id: '',
        completion_level: '',
        planned_phases: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await onSave(formData)) {
      setFormData({
        name: '',
        start_date: '',
        end_date: '',
        contract_amount: '',
        contractor_name: '',
        partner_id: '',
        completion_level: '',
        planned_phases: '',
      });
    }
  };

  const handleAddClick_Partner = () => {
    setIsModalOpen_Partner((prevState) => !prevState);
  };

  const handleModalClose_Partner = () => {
    setIsModalOpen_Partner(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-lg z-10 w-11/12 sm:w-1/2 max-h-screen overflow-y-auto">
        <h2 className="text-2xl mb-4 uppercase">
          {initialData ? 'Projekt módosítása' : 'Új projekt'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Projekt név</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Kezdete</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Vége</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Szerződési megállapodás (tervezett összeg)</label>
            <input
              type="number"
              name="contract_amount"
              value={formData.contract_amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Kivitelező neve</label>
            <input
              type="text"
              name="contractor_name"
              value={formData.contractor_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Partner</label>
            <div className="flex">
              <select
                name="partner_id"
                value={formData.partner_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Válassz partnert</option>
                {partners.map((partner) => (
                  <option key={partner.id} value={partner.id}>
                    {partner.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddClick_Partner}
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 ml-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                Új partner
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Készültségi szint</label>
            <input
              type="number"
              name="completion_level"
              value={formData.completion_level}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tervezett szakaszok</label>
            <input
              type="number"
              name="planned_phases"
              value={formData.planned_phases}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
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
      <ProjectPartnerModal
        isOpen={isModalOpen_Partner}
        onClose={handleModalClose_Partner}
        fetchPartners={partners}
      />
    </div>
  );
}

export default ProjectModal;
