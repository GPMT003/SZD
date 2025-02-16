import React,{ useState, Fragment, useEffect  }from 'react'
import axios from 'axios';
import { Text, View, Page, Document, StyleSheet, pdf } from '@react-pdf/renderer';

const Export = ({setAlert}) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState('')
    let grandTotal = 0;
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Input validation
      if (!startDate || !endDate) {
        setAlert({ message: 'A dátum megadása kötelező', type: 'error' });
        return;
      }
  
      if (startDate > endDate) {
        setAlert({ message: 'Az kezdő dátum nem lehet nagyobb a befejező dátumnál', type: 'error' });
        return;
      }
  
      try {
        const response = await axios.post(
          'http://localhost:8000/api/exportToPdf',
          { startDate, endDate },
          {
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        );
        if (response.data.status) {
          setAlert({ message: response.data.message, type: 'success' });
          setData(response.data);
          await handlePreviewClick();
        }
      } catch (error) {
        setAlert({ message: 'Hiba történt a folyamat során', type: 'error' });
      }
    };
    
    
      const styles = StyleSheet.create({
        page: { fontSize: 11, paddingTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column' },
        spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: "#3E3E3E" },
        titleContainer: { flexDirection: 'row', marginTop: 24 },
        reportTitle: { fontSize: 16, textAlign: 'center' },
        invoice: { fontWeight: 'bold', fontSize: 20 },
        invoiceNumber: { fontSize: 11, fontWeight: 'bold' },
        address: { fontWeight: 400, fontSize: 10 },
        theader: { marginTop: 20, fontSize: 10, fontStyle: 'bold', paddingTop: 4, paddingLeft: 7, flex: 1, height: 20, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },
        tbody: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1, borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },
        total: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1.5, borderColor: 'whitesmoke', borderBottomWidth: 1 }
      });
    
    
      const InvoiceTitle = () => (
        <View style={styles.titleContainer}>
          <View style={styles.spaceBetween}>
            <Text style={styles.reportTitle}>KRONS</Text>
          </View>
        </View>
      );
    
      const Address = () => (
        <>
          <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
              <View>
                <Text style={styles.invoice}>Raktár készlet </Text>
                  <Text style={styles.invoiceNumber}>
                    Jelentés kezdete:  {data.start}
                  </Text>         
                <Text style={styles.invoiceNumber}>Jelentés vége: {data.end} </Text>
              </View>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
              <View>
                <Text style={styles.address}>Cég neve: {data.company.companyName}</Text>
                <Text style={styles.address}>Adószám: {data.company.taxNumber}</Text>
                <Text style={styles.address}>Közösségi adószám: {data.company.vatNumber}</Text>
                <Text style={styles.address}>Székhely: {data.company.location}</Text>
              </View>
              <View>
              </View>
            </View>
          </View>
        </>
      );
    
      const UserAddress = () => (
        <View style={styles.titleContainer}>
          <View style={styles.spaceBetween}>
            <Text style={styles.address}>Dátum: {new Date().toDateString()}</Text>
          </View>
        </View>
      );
    
      const TableHead = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
          <View style={styles.theader}><Text>Termék:</Text></View>
          <View style={styles.theader}><Text>Mértékegység:</Text></View>
          <View style={styles.theader}><Text>Beszerzési ár:</Text></View>
          <View style={styles.theader}><Text>Kivezetési ár:</Text></View>
          <View style={styles.theader}><Text>Mennyiség:</Text></View>
          <View style={styles.theader}><Text>Dátum:</Text></View>
          <View style={styles.theader}><Text>Termék érték:</Text></View>
        </View>
      );

      const mergeAndGroupData = (income, outgoing) => {
        const mergedData = [...income, ...outgoing].sort((a, b) => new Date(a.date) - new Date(b.date));
      
        const groupedData = mergedData.reduce((acc, item) => {
          const { id } = item;
          if (!acc[id]) {
            acc[id] = [];
          }
          acc[id].push(item);
          return acc;
        }, {});
      
        return groupedData;
      };
    
      const TableBody = () => {
        const groupedData = mergeAndGroupData(data.income, data.outgoing); 
      
        return (
          <>
            {Object.keys(groupedData).map((id) => {
              let subTotal = 0; 
              let subVol = 0;
              return (
                <Fragment key={id}>
                  {groupedData[id].map((item, index) => {
                    const itemTotal = item.volume * (item.price || -item.average);
                    subTotal += itemTotal;
                    subVol += itemTotal / (item.price || item.average);
                    grandTotal += itemTotal; 
      
                    return (
                      <View key={index} style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={styles.tbody}>
                          <Text>{item.name}</Text>
                        </View>
                        <View style={styles.tbody}>
                          <Text>{item.unit}</Text>
                        </View>
                        <View style={styles.tbody}>
                          <Text>{item.price || ''}</Text>
                        </View>
                        <View style={styles.tbody}>
                          <Text>{- item.average || ''}</Text>
                        </View>
                        <View style={styles.tbody}>
                          <Text>{item.volume}</Text>
                        </View>
                        <View style={styles.tbody}>
                          <Text>{item.date}</Text>
                        </View>
                        <View style={styles.tbody}>
                          <Text>{(itemTotal).toFixed(2)}</Text>
                        </View>
                      </View>
                    );
                  })}
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={styles.total}><Text></Text></View>
                    <View style={styles.total}><Text>Részösszeg:</Text></View>
                    <View style={styles.total}><Text></Text></View>
                    <View style={styles.tbody}><Text>
                        {subVol.toFixed(2)}
                    </Text></View>
                    <View style={styles.tbody}>
                      <Text>
                        {subTotal.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </Fragment>
              );
            })}
          </>
        );
      };
      const TableTotal = () => (
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={styles.total}><Text></Text></View>
          <View style={styles.total}><Text></Text></View>
          <View style={styles.tbody}><Text>Teljes összeg:</Text></View>
          <View style={styles.tbody}>
            <Text>
              {grandTotal.toFixed(2)}
            </Text>
          </View>
        </View>
      );
    
      const InvoiceComponent = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            <InvoiceTitle />
            <Address />
            <UserAddress />
            <TableHead />
            <TableBody />
            <TableTotal />
          </Page>
        </Document>
      );
    
      const handlePreviewClick = () => {
        if (!data) {
          setAlert({ message: 'Nincsenek elérhető adatok', type: 'error' });
          return;
        }
      
        const doc = <InvoiceComponent />;
        pdf(doc)
          .toBlob()
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            const pdfWindow = window.open(url, '_blank');
      
            if (pdfWindow) {
              pdfWindow.document.close();
            } else {
              console.error('Nem sikerült megnyitni a PDF ablakot');
            }
          })
          .catch((error) => {
            console.error('Hiba történt a PDF generálása során: ', error);
          });
      };
      
      useEffect(() => {
        if (data) {
          handlePreviewClick();
        }
      }, [data]);
  
    return (
        <div className="py-1 bg-blueGray-50">
        <form className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-auto mt-4" >
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base py-4 text-blueGray-700 uppercase">Készlet jelentés export</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kezdő dátum</label>
                        <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Befejező dátum</label>
                        <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                        />
                    </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
                        >
                        Exportálás
                    </button>
                </div>
                </div>
            </div>
            </div>
        </form>
       </div>
    );
};

export default Export
