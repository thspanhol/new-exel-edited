import { useRef } from "react";

const CopyButton = ({ text }) => {
  const textRef = useRef(null);

  const copyText = () => {
    textRef.current.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        ref={textRef}
        style={{ position: "absolute", left: "-9999px" }}
        readOnly
      />
      <button className="btn" onClick={copyText}>
        {text}
      </button>
    </div>
  );
};

export default CopyButton;
