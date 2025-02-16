import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Alert from './Alert';
import Export from './Export';
import Export2 from './Export2';

function SQLQueryForm() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleExecute = async (e) => {
    e.preventDefault();
    setAlert({ message: '', type: '' });

    if (!query.trim()) {
      setAlert({ message: 'A lekérdezés nem lehet üres!', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/execute-sql', { query }, {
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      });

      if (response.data.results.length > 0) {
        const newColumns = Object.keys(response.data.results[0]).map((key) => ({ Header: key, accessor: key }));
        if (JSON.stringify(columns) !== JSON.stringify(newColumns)) {
          setColumns(newColumns);
        }
      } else {
        setColumns([]);
      }

      if (JSON.stringify(data) !== JSON.stringify(response.data.results)) {
        setData(response.data.results);
      }

      setAlert({ message: 'Lekérdezés sikeresen végrehajtva!', type: 'success' });
    } catch (error) {
      if (error.response) {
        setAlert({ message: error.response.data.message || 'Ismeretlen hiba történt', type: 'error' });
      } else if (error.request) {
        setAlert({ message: 'A kérés nem válaszolt, kérlek próbáld újra!', type: 'error' });
      } else {
        setAlert({ message: 'Hiba történt a lekérdezés végrehajtása során!', type: 'error' });
      }
      setColumns([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Results');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'results.xlsx');
  };

  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: memoizedColumns,
    data: memoizedData,
  });

  return (
    <>
        <div className="py-1 bg-blueGray-50">
          <form className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-auto mt-4" onSubmit={handleExecute}>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700 uppercase">SQL Lekérdező</h3>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">SQL Lekérdezés</label>
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white py-2 px-3 rounded-lg"
                  disabled={loading}
                >
                  {loading ? 'Töltés...' : 'Végrehajtás'}
                </button>
              </div>
            </div>
          </form>
          {alert.message && <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />}
          {data.length > 0 && (
            <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-auto mt-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="block w-full overflow-x-auto p-4">
                  <div className="mb-4">
                    <button
                      onClick={handleExport}
                      className="bg-indigo-500 text-white py-2 px-3 rounded-lg"
                    >
                      Exportálás Excelbe
                    </button>
                  </div>
                  <table {...getTableProps()} className="min-w-full bg-white">
                  <thead>
                    {headerGroups.map((headerGroup, headerIndex) => (
                      <tr key={headerIndex} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, colIndex) => (
                          <th
                            key={colIndex} 
                            {...column.getHeaderProps()}
                            className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                          >
                            {column.render('Header')}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row, rowIndex) => {
                      prepareRow(row);
                      return (
                        <tr key={rowIndex} {...row.getRowProps()}>
                          {row.cells.map((cell, cellIndex) => (
                            <td
                              key={cellIndex} 
                              {...cell.getCellProps()}
                              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"
                            >
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                  </table>

                </div>
              </div>
            </div>
          )}
        </div>
        < Export setAlert={setAlert} />
        < Export2 setAlert={setAlert} />
    </>
  );
}

export default SQLQueryForm;
