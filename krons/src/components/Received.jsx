import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Alert from './Alert';
import ProjectPartnerModal from './partner/ProjectPartnerModal';
import ItemModal from './Item/ItemModal';
import PDFGenerator from './PdfGen';
import Loader from './Loader';


function Receipt() {
  const [partners, setPartners] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState('');
  const [date, setDate] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [rows, setRows] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: 'error' });
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    taxNumber: '',
    vatNumber: '',
    location: '',
    valuationMethod: 'Fifo'
  });

  const fetchPartners = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/partners', {}, {
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      });
      setPartners(response.data);
    } catch (error) {
      setAlert(error.response.data.message);
    }
  };
  
  const fetchArticles = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/items', {}, {
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      });
      setArticles(response.data);
    } catch (error) {
      setAlert(error.response.data.message);
    }
  };

  const fetchData = async (url, headers) => {
    try {
      const response = await axios.post(url, {}, { headers });
      return response.data;
    } catch (error) {
      setAlert({ message: error.response.data.message, type: 'error' });
    }
  };

  const [status, setStatus] = useState('error');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const headers = {
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [partnersData, articlesData, settingsData, receiptNumberData] = await Promise.all([
          fetchData('http://localhost:8000/api/partners', headers),
          fetchData('http://localhost:8000/api/items', headers),
          fetchData('http://localhost:8000/api/getSettings', headers),
          fetchData('http://localhost:8000/api/generateReceiptNumber', headers),
        ]);
        setPartners(partnersData);
        setArticles(articlesData);
        setFormData(settingsData);
        setReceiptNumber(receiptNumberData);
        setLoading(false);
      } catch (error) {
        setAlert({ message: error.message, type: 'error' });
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const isReceiptDataValid = useMemo(() => {
    const isCompanyDataValid = formData.companyName && formData.taxNumber && formData.vatNumber && formData.location;
    const selectedPartnerData = partners.find((partner) => partner.id === parseInt(selectedPartner));
    const isPartnerValid = selectedPartnerData != null;
    const isDateValid = date && date !== '';
    const isReceiptNumberValid = receiptNumber && receiptNumber !== '';
    const areRowsValid = rows.every((row) => {
      const article = articles.find((art) => art.id === row.articleId);
      return article && row.articleUnit && row.price && row.quantity;
    });

    return isCompanyDataValid && isPartnerValid && isDateValid && isReceiptNumberValid && areRowsValid;
  }, [formData, selectedPartner, date, receiptNumber, rows, partners, articles]);

  const handleAddRow = () => {
    setRows([...rows, { articleId: '', articleUnit: '', articleVat: '', price: 1, quantity: 1 }]);
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleArticleSelect = (index, articleId) => {
    const article = articles.find((art) => art.id === parseInt(articleId));
    if (article) {
      handleRowChange(index, 'articleId', article.id);
      handleRowChange(index, 'articleUnit', article.unit);
      handleRowChange(index, 'articleVat', article.vatContent);
      handleRowChange(index, 'price', article.price !== undefined ? article.price : rows[index].price || 0);
    }
  };

  const afterSave = async () => {
    setRows([]);
    setSave(false);
    try {
      const response = await axios.post('http://localhost:8000/api/generateReceiptNumber',{},
        {headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }}
      );
      setReceiptNumber(response.data);
      setLoading(false)
    } catch (error) {
      setAlert(error.response.data.message)
      setLoading(false)
    }
  
  };

  const handleSave = async (e) => {
    setSave(true);
    e.preventDefault();
    const data = {
      partnerId: selectedPartner,
      date,
      receiptNumber,
      rows
    };

    try {
      await axios.post('http://localhost:8000/api/saveReceipt', data, { headers });
      setAlert({ message: 'Bizonylat sikeresen mentve!', type: 'success' });
      afterSave();
    } catch (error) {
      setAlert({ message: error.response.data.message, type: 'error' });
      setSave(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const [isModalOpen_Partner, setIsModalOpen_Partner] = useState(false);
  const [isModalOpen_Item, setIsModalOpen_Item] = useState(false);

  const handleAddClick_Partner = () => {
    setIsModalOpen_Partner(prevState => !prevState);
  };

  const handleModalClose_Partner = () => {
    setIsModalOpen_Partner(false);
    fetchPartners();
  };

  const handleAddClick_Items = () => {
    setIsModalOpen_Item(prevState => !prevState);
  };

  const handleModalClose_Items = () => {
    setIsModalOpen_Item(false);
    fetchArticles();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="py-1 bg-blueGray-50">
        <form className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-auto mt-4" onSubmit={handleSave} method='POST'>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">Bevételi Bizonylat</h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Partner</label>
                <div className="flex">
                <select
                  name="partner"
                  value={selectedPartner}
                  onChange={(e) => setSelectedPartner(e.target.value)}
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
                <label className="block text-sm font-medium mb-2">Dátum</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Bizonylatszám</label>
                <input
                  type="text"
                  value={receiptNumber}
                  readOnly
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2">Cikknév</th>
                      <th className="py-2">Egység</th>
                      <th className="py-2">ÁFA</th>
                      <th className="py-2">Ár</th>
                      <th className="py-2">Mennyiség</th>
                      <th className="py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">
                          <select
                            value={row.articleId}
                            onChange={(e) => handleArticleSelect(index, e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                          >
                            <option value="">Válassz cikket</option>
                            {articles.map((article) => (
                              <option key={article.id} value={article.id}>
                                {article.name}
                              </option>
                            ))}
                            
                          </select>
                        </td>
                        <td className="border px-4 py-2">{row.articleUnit}</td>
                        <td className="border px-4 py-2">{row.articleVat}</td>
                        <td className="border px-4 py-2">
                          <input
                            type="number"
                            value={row.price}
                            onChange={(e) => handleRowChange(index, 'price', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="number"
                            value={row.quantity}
                            onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => setRows(rows.filter((_, i) => i !== index))}
                            className="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                          >
                            Törlés
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={handleAddRow}
                type="button"
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                Új sor hozzáadása
              </button>
              <button
                type="button"
                onClick={handleAddClick_Items}
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 ml-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                Új Cikk hozzáadása
              </button>
              <div className="flex justify-end mt-4">
                
                {isReceiptDataValid && (
                  <PDFGenerator
                    receiptData={{
                      companyData: formData,
                      docType: "Bevételi Bizonylat",
                      partner: partners.find((partner) => partner.id === parseInt(selectedPartner)),
                      date,
                      receiptNumber,
                      rows: rows.map(row => ({
                        articleName: articles.find(art => art.id === row.articleId)?.name || '',
                        articleUnit: row.articleUnit,
                        articleVat: row.articleVat,
                        price: row.price,
                        quantity: row.quantity
                      }))
                    }}
                    isValid={isReceiptDataValid}
                    setShowAlert={setShowAlert}
                    setStatus={setStatus}
                    setErrorMessage={setErrorMessage}
                    setSave={setSave}
                    save={save}
                  />
                )}
                <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 ml-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Mentés
                </button>
              </div>
            </div>
          </div>
        </form>
        <ProjectPartnerModal
          isOpen={isModalOpen_Partner}
          onClose={handleModalClose_Partner}
          selectedPartner={setSelectedPartner}
        />
        <ItemModal
            isOpen={isModalOpen_Item}
            onClose={handleModalClose_Items}
        />

        {alert.message && <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
      </div>
    </div>
  );
}

export default Receipt;
