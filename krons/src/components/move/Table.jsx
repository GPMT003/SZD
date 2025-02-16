import React from 'react';

function Table({ moves, handleRowSelect, selectedRow }) {
  return (
    <div className="block w-full overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mozgásnem
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Főkönyvi szám
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {moves.map((move) => (
            <tr
              key={move.id}
              onClick={() => handleRowSelect(move)}
              className={`cursor-pointer ${selectedRow && selectedRow.id === move.id ? 'bg-gray-100' : ''}`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{move.moveType}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{move.accountNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
