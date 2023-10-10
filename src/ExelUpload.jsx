import { useState } from 'react';
import * as XLSX from 'xlsx';
import CopyButton from './CopyButton';


function ExcelUpload() {
  const [excelFile, setExcelFile] = useState(null);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(null);

  const [idap, setIdap] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [date, setDate] = useState(null);
  const [coop, setCoop] = useState(null);
  const [angar, setAngar] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExcelFile(file);
  };

  function randomNumber() {
    const min = 1000000;
    const max = 9999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
      setIdap(objeto[`A${index}`].v)
      console.log(objeto[`B${index}`].v)
      setEmail(objeto[`B${index}`].v)
      console.log(objeto[`C${index}`].v)
      setName(objeto[`C${index}`].v)
      console.log(objeto[`D${index}`].v)
      setCpf(objeto[`D${index}`].v)

      let date = XLSX.SSF.parse_date_code(objeto[`E${index}`].v)
      let formattedDate = `${date.d < 10 ? `0${date.d}` : date.d}/${date.m < 10 ? `0${date.m}` : date.m}/${date.y}`;
     
      console.log(formattedDate)
      setDate(formattedDate)
      console.log(objeto[`F${index}`].v)
      setCoop(objeto[`F${index}`].v)

      setAngar(randomNumber())
    } else {
      console.log('Usuário não encontrado.');
      setLoading('Usuário não encontrado.')
    }

   
  }

  const handleUpload = (userParam) => {

    setIdap(null)
    setEmail(null)
    setName(null)
    setCpf(null)
    setDate(null)
    setCoop(null)
    setAngar(null)

    setLoading('Carregando...')

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
      {loading && !idap && <h3>{loading}</h3>}
      {idap && <>
      <h4>Idap:</h4>
      <CopyButton text={idap}/>
      </>}
      {email && <>
        <h4>E-mail:</h4>
      <CopyButton text={email}/>
      </>}
      {name && <>
        <h4>Nome Completo:</h4>
      <CopyButton text={name}/>
      </>}
      {cpf && <>
        <h4>CPF:</h4>
      <CopyButton text={cpf}/>
      </>}
      {date && <>
        <h4>Data de Nascimento:</h4>
      <CopyButton text={date}/>
      </>}
      {coop && <>
        <h4>Coop:</h4>
      <CopyButton text={coop}/>
      </>}
      {angar && <>
        <h4>Código Angariador:</h4>
      <CopyButton text={angar}/>
      </>}
    </div>
  );
}

export default ExcelUpload;
