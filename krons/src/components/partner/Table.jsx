import React from 'react';

function Table({ partners, onRowSelect, selectedRow }) {
  const handleRowClick = (row) => {
    onRowSelect(row);
  };

  return (
    <div className="relative w-full overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse">
        <thead>
          <tr>
            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Partner neve
            </th>
            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Adószáma
            </th>
            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Címe
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {partners.map((row) => (
            <tr
              key={row.id}
              className={`cursor-pointer ${selectedRow && selectedRow.id === row.id ? 'bg-gray-200' : ''}`}
              onClick={() => handleRowClick(row)}
            >
              <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-gray-700">
                {row.name}
              </th>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {row.taxNumber}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {row.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
