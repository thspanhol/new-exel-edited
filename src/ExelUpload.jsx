import { useState } from 'react';
import * as XLSX from 'xlsx';


function ExcelUpload() {
  const [excelFile, setExcelFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExcelFile(file);
  };

  const handleUpload = () => {
    if (excelFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
  
        // Aqui é possível acessar as folhas do arquivo Excel usando workbook.Sheets
        // e fazer qualquer transformação necessária
        console.log(workbook.Sheets);
        console.log(workbook.Sheets['Planilha1']['A2']);
        // console.log(workbook.Sheets['NOME DO AQUIVO (mostrado na linha 22)']['A2']);

        workbook.Sheets['Planilha1']['A2'].v = 'Thales'
  
        // Por exemplo, criar um novo arquivo Excel:
        const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWorkbook, workbook.Sheets[workbook.SheetNames[0]], 'Nova Planilha');
  
        // Agora é possível baixar o novo arquivo Excel
        XLSX.writeFile(newWorkbook, 'novo_excel.xlsx');
      };
      reader.readAsBinaryString(excelFile);
    }
  };
  

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Excel</button>
    </div>
  );
}

export default ExcelUpload;
