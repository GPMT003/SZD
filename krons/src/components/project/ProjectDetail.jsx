import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '../Alert';

function ProjectDetail({ isOpen, onClose, projectId }) {
  const [receipts, setReceipts] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    if (isOpen && projectId) {
      fetchReceipts();
    }
  }, [isOpen, projectId]);

  const fetchReceipts = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/projectReceipts',
        { pid: projectId },
        {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      setReceipts(response.data);
    } catch (error) {
      setAlert({
        message: `Hiba történt a bizonylatok lekérése során: ${error.message}`,
        type: 'error',
      });
    }
  };

  const formatNumber = (number) => parseFloat(number).toFixed(2);

  const totalAmount = receipts.reduce((acc, receipt) => acc + parseFloat(receipt.totalAmount), 0);
  const totalAvgCost = receipts.reduce((acc, receipt) => acc + parseFloat(receipt.totalAvgCost), 0);

  const handleCloseAlert = () => setAlert({ message: '', type: '' });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-lg z-10 w-11/12 sm:w-3/4 lg:w-1/2 max-h-screen overflow-y-auto">
        <h2 className="text-2xl mb-4">Projekthez tartozó bizonylatok</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 border px-4">Bizonylat dátuma</th>
              <th className="py-2 border px-4">Tételek összege</th>
              <th className="py-2 border px-4">Bizonylatszám</th>
              <th className="py-2 border px-4">Átlagos költség összege</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt) => (
              <tr key={receipt.documentId}>
                <td className="border px-4 py-2">{receipt.date}</td>
                <td className="border px-4 py-2">{formatNumber(receipt.totalAmount)}</td>
                <td className="border px-4 py-2">{receipt.documentId}</td>
                <td className="border px-4 py-2">{formatNumber(receipt.totalAvgCost)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="border px-4 py-2 font-bold">Összesen</td>
              <td className="border px-4 py-2 font-bold">{formatNumber(totalAmount)}</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2 font-bold">{formatNumber(totalAvgCost)}</td>
            </tr>
          </tfoot>
        </table>
        <div className="py-3 sm:flex sm:flex-row-reverse">
          <button
            onClick={onClose}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Mégse
          </button>
        </div>
      </div>
      {alert.message && <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
    </div>
  );
}

export default ProjectDetail;
