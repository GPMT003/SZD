import React, { Fragment,useEffect } from 'react';
import { Text, View, Page, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import axios from 'axios';

const PDFGenerator = ({ receiptData , isValid, setShowAlert, setStatus, setErrorMessage, save, setSave}) => {

  useEffect(() => {
    if (save === true) {
      handleSave();
    }
  }, [save])
  

  
  const reciept_data = {
    receiptNumber: receiptData.receiptNumber,
    address: receiptData.partner,
    date: receiptData.date,
    items: receiptData.rows
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
            <Text style={styles.invoice}>{receiptData.docType} </Text>
            {(receiptData.docAllType && receiptData.docMove) && (
              <Text style={styles.invoiceNumber}>
                {receiptData.docAllType.name}:  {receiptData.docMove.moveType}
              </Text>
            )}            
            <Text style={styles.invoiceNumber}>Sorszám: {reciept_data.receiptNumber} </Text>
          </View>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
          <View>
            <Text style={styles.address}>{receiptData.docType === "Bevételi Bizonylat" ?'Vevo: ' : 'Szállító: '} {receiptData.companyData.companyName}</Text>
            <Text style={styles.address}>Adószám: {receiptData.companyData.taxNumber}</Text>
            <Text style={styles.address}>Közösségi adószám: {receiptData.companyData.vatNumber}</Text>
            <Text style={styles.address}>Székhely: {receiptData.companyData.location}</Text>
          </View>
          <View>
            <Text style={styles.address}>{receiptData.docType !== "Bevételi Bizonylat" ?'Vevo: ' : 'Szállító: '} {receiptData.partner.name}</Text>
            <Text style={styles.address}>Adószám: {receiptData.partner.taxNumber}</Text>
            <Text style={styles.address}>Székhely: {receiptData.partner.address}</Text>
          </View>
        </View>
      </View>
    </>
  );

  const UserAddress = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Text style={styles.address}>Dátum: {reciept_data.date}</Text>
      </View>
    </View>
  );

  const Comment = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Text style={styles.address}>Megjegyzés: {receiptData.comment}</Text>
      </View>
    </View>
  );

  const TableHead = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
      <View style={styles.theader}><Text>Termék:</Text></View>
      <View style={styles.theader}><Text>Egységár:</Text></View>
      <View style={styles.theader}><Text>Áfa(%):</Text></View>
      <View style={styles.theader}><Text>Nettó:</Text></View>
      <View style={styles.theader}><Text>Áfa:</Text></View>
      <View style={styles.theader}><Text>Mennyiség:</Text></View>
      <View style={styles.theader}><Text>Bruttó:</Text></View>
    </View>
  );

  const TableBody = () => (
    receiptData.rows.map((receipt, id) => (
      <Fragment key={id}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={styles.tbody}>
            <Text>{receipt.articleName}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{receipt.price}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{receipt.articleVat}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{(receipt.price * receipt.quantity)}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{receipt.articleVat === 'FAD' ? 0 : ((parseFloat(receipt.articleVat) / 100) * receipt.price * receipt.quantity).toFixed(0)}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{receipt.quantity}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{receipt.articleVat === 'FAD' ? (receipt.price * receipt.quantity) : (((parseFloat(receipt.articleVat) / 100) * receipt.price * receipt.quantity) + receipt.price * receipt.quantity)}</Text>
          </View>
        </View>
      </Fragment>
  )));

  const TableTotal = () => (
    <View style={{ width: '100%', flexDirection: 'row' }}>
      <View style={styles.total}><Text></Text></View>
      <View style={styles.total}><Text></Text></View>
      <View style={styles.tbody}><Text>Total</Text></View>
      <View style={styles.tbody}>
        <Text>
          {reciept_data.items.reduce((sum, item) => {
            if (item.articleVat === 'FAD') {
              return sum;
            }
            return sum + (((parseFloat(item.articleVat) / 100) * item.price * item.quantity) + item.price * item.quantity);
          }, 0)}
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
        {receiptData.comment && receiptData.comment !== "" && (
          <Comment/>
        )}
        <TableHead />
        <TableBody />
        <TableTotal />
      </Page>
    </Document>
  );

  const handlePreviewClick = () => {

    if(isValid){
      const doc = <InvoiceComponent />;

      pdf(doc) 
          .toBlob() 
          .then((blob) => {
  
          const url = URL.createObjectURL(blob);
          
          const pdfWindow = window.open(url, '_blank');
  
          if (pdfWindow) {
              pdfWindow.document.close(); 
          } else {
              console.error('Failed to open PDF window');
          }
          })
          .catch((error) => {
          console.error('Error generating PDF: ', error);
      });
    }
    else{
      setShowAlert(true)
      setStatus('warning')
      setErrorMessage('Tölsd ki nyomtatványt')
    }
  }

  const handleSave = async () => {
    const doc = <InvoiceComponent />;
    const generatedPdf = await pdf(doc).toBlob();
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64pdf = reader.result.split(',')[1];

      // Add your API call here to send the PDF to the backend

      try {
        const response = await axios.post(
          'http://localhost:8000/api/savePdf', 
          {
            pdf: base64pdf, // A base64 kódolt PDF fájl
            invoice_number: reciept_data.receiptNumber // Invoice number, ha szükséges
          },
          {
            headers: {
              'Content-Type': 'application/json', // JSON típus
              'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Az Authorization token
            }
          }
        );
        setSave(false); // Ha sikeres volt a mentés, állítsd be a save változót false-ra
      } catch (error) {
        console.error('Error during save:', error); // Hibakezelés
      }
      
    };
    reader.readAsDataURL(generatedPdf);
  }
    
    return (
        <div>
        <button
            type='button'
            onClick={handlePreviewClick}
            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
        >
            Előnézet
        </button>
        </div>
    );
};

export default PDFGenerator;
