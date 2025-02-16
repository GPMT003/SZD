import React from 'react';

function Table({ columns, data, onRowSelect, selectedRow }) {

  const handleRowClick = (row) => {
    onRowSelect(row);
  };

  return (
    <div>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((column) => (
              <th key={column.accessor} className="x-6 py-3 text-left text-xs whitespace-nowrap font-medium px-4 text-gray-500 uppercase tracking-wider">
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className={`cursor-pointer ${selectedRow && selectedRow.id === row.id ? 'bg-gray-200' : ''}`}
              onClick={() => handleRowClick(row)}
            >
              {columns.map((column) => (
                <td key={column.accessor} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
