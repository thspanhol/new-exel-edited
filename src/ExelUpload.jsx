import { useState } from 'react';
import * as XLSX from 'xlsx';


function ExcelUpload() {
  const [excelFile, setExcelFile] = useState(null);
  const [user, setUser] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExcelFile(file);
  };

  function logObjeto(objeto, login) {

    let array = [];

    for (let chave in objeto) {
      if (chave.includes('A')) {
        array.push(objeto[chave].v)
      }
    }

    if (array.includes(login)) {

      /* console.log(array); */

      let index = array.indexOf(login) +1

      console.log(objeto[`A${index}`].v)
      console.log(objeto[`B${index}`].v)
      console.log(objeto[`C${index}`].v)
      console.log(objeto[`D${index}`].v)

      let date = XLSX.SSF.parse_date_code(objeto[`E${index}`].v)
      let formattedDate = `${date.d < 10 ? `0${date.d}` : date.d}/${date.m < 10 ? `0${date.m}` : date.m}/${date.y}`;
     
      console.log(formattedDate)
      console.log(objeto[`F${index}`].v)
    } else {
      console.log('Usuário não encontrado.');
    }

   
  }

  const handleUpload = (userParam) => {
    if (excelFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
  
        // Aqui é possível acessar as folhas do arquivo Excel usando workbook.Sheets
        // e fazer qualquer transformação necessária
        /* console.log(workbook.Sheets);
        console.log(workbook.Sheets['SIS_USUARIOS']);
        console.log(typeof workbook.Sheets['SIS_USUARIOS']);
        console.log(workbook.Sheets['SIS_USUARIOS'][0]);
        console.log(typeof workbook.Sheets['SIS_USUARIOS'][0]); */
        // console.log(workbook.Sheets['NOME DO AQUIVO (mostrado na linha 22)']['A2']);
        

        logObjeto(workbook.Sheets['SIS_USUARIOS'], userParam)

       /*  workbook.Sheets['Planilha1']['A2'].v = 'Thales' */
  
        // Por exemplo, criar um novo arquivo Excel:
        /* const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWorkbook, workbook.Sheets[workbook.SheetNames[0]], 'Nova Planilha'); */
  
        // Agora é possível baixar o novo arquivo Excel
        /* XLSX.writeFile(newWorkbook, 'novo_excel.xlsx'); */
      };
      reader.readAsBinaryString(excelFile);
    }
  };
  

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Excel</button>
      <input type='text' value={user} onChange={(e) => setUser(e.target.value)} onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleUpload(user)
        }
      }} />
    </div>
  );
}

export default ExcelUpload;
