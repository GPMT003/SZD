import React from 'react';

function Table({ doc }) {
  const openPdf = (pdfUrl) => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse">
        <thead>
          <tr>
            {['Dokumentum szám', 'Létrehozva', 'PDF'].map((header) => (
              <th
                key={header}
                className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {doc?.length > 0 ? (
            doc.map(({ id, DocNumber, created_at, path }) => (
              <tr key={id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-gray-700">
                  {DocNumber}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {created_at}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => openPdf(`http://localhost:8000${path}`)}
                  >
                    PDF Megnyitása
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                Nincs elérhető dokumentum
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
