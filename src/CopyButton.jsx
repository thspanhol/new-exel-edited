import { useRef } from "react";

const CopyButton = ({ text }) => {
  const textRef = useRef(null);

  const copyText = () => {
    // Seleciona o texto dentro do elemento do botão
    textRef.current.select();
    // Copia o texto selecionado para a área de transferência do navegador
    document.execCommand("copy");
    // Desseleciona o texto para evitar efeitos colaterais de seleção visível
    window.getSelection().removeAllRanges();
  };

  return (
    <div>
      {/* Usa um elemento input do tipo "text" para armazenar o texto que será copiado */}
      <input
        type="text"
        value={text}
        ref={textRef}
        style={{ position: "absolute", left: "-9999px" }}
        readOnly
      />
      {/* O botão que ao ser clicado irá copiar o texto */}
      <button className="btn" onClick={copyText}>{text}</button>
    </div>
  );
};

export default CopyButton;
