import { useState } from "react";
import * as XLSX from "xlsx";
import CopyButton from "./CopyButton";

function ExcelUpload() {
  const [excelFile, setExcelFile] = useState(null);
  const [user, setUser] = useState("");
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
      if (chave.includes("A")) {
        array.push(objeto[chave].v);
      }
    }

    if (array.includes(login)) {
      let index = array.indexOf(login) + 1;

      setIdap(objeto[`A${index}`].v);
      setEmail(objeto[`B${index}`].v);
      setName(objeto[`C${index}`].v);
      setCpf(objeto[`D${index}`].v);

      let date = XLSX.SSF.parse_date_code(objeto[`E${index}`].v);
      let formattedDate = `${date.d < 10 ? `0${date.d}` : date.d}/${
        date.m < 10 ? `0${date.m}` : date.m
      }/${date.y}`;

      setDate(formattedDate);
      setCoop(objeto[`F${index}`].v);

      setAngar(randomNumber());
    } else {
      setLoading("Usuário não encontrado.");
    }
  }

  const handleUpload = (userParam) => {
    setIdap(null);
    setEmail(null);
    setName(null);
    setCpf(null);
    setDate(null);
    setCoop(null);
    setAngar(null);

    setLoading("Carregando...");

    if (excelFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        logObjeto(workbook.Sheets["SIS_USUARIOS"], userParam);
      };
      reader.readAsBinaryString(excelFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Excel</button>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleUpload(user);
          }
        }}
      />
      {loading && !idap && <h3>{loading}</h3>}
      {idap && (
        <>
          <h4>Idap:</h4>
          <CopyButton text={idap} />
        </>
      )}
      {email && (
        <>
          <h4>E-mail:</h4>
          <CopyButton text={email} />
        </>
      )}
      {name && (
        <>
          <h4>Nome Completo:</h4>
          <CopyButton text={name} />
        </>
      )}
      {cpf && (
        <>
          <h4>CPF:</h4>
          <CopyButton text={cpf} />
        </>
      )}
      {date && (
        <>
          <h4>Data de Nascimento:</h4>
          <CopyButton text={date} />
        </>
      )}
      {coop && (
        <>
          <h4>Coop:</h4>
          <CopyButton text={coop} />
        </>
      )}
      {angar && (
        <>
          <h4>Código Angariador:</h4>
          <CopyButton text={angar} />
        </>
      )}
    </div>
  );
}

export default ExcelUpload;
