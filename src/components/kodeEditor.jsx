import React, { useEffect, useState } from "react";
import { FaCode, FaDesktop } from "react-icons/fa";
import "../../style/KodeEditor.css";

const KodeEditor = ({ code = "", runnable = false, editorId = "htmleditor" }) => {
  const [initialCode] = useState(code);
  const [editorInstance, setEditorInstance] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.36.5/ace.js";
    script.onload = () => {
      const ace = window.ace;
      if (ace) {
        const editor = ace.edit(editorId);
        editor.setTheme("ace/theme/chrome");
        editor.session.setMode("ace/mode/html");
        editor.setOption("printMargin", false);
        editor.setFontSize(18);
        editor.setValue(initialCode, -1);
        setEditorInstance(editor);
      }
    };
    document.body.appendChild(script);

    // Set default output saat pertama kali komponen dimuat
    setDefaultOutput();

    return () => {
      document.body.removeChild(script);
    };
  }, [editorId, initialCode]);

  // Fungsi untuk menampilkan teks default di output
  const setDefaultOutput = () => {
    const iframe = document.getElementById(`result-${editorId}`);
    if (iframe) {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write("");
      iframeDoc.close();
    }
  };

  const runCode = () => {
    if (editorInstance) {
      const code = editorInstance.getValue();
      const iframe = document.getElementById(`result-${editorId}`);
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(code);
      iframeDoc.close();
    }
  };

  const resetCode = () => {
    if (editorInstance) {
      editorInstance.setValue(initialCode, -1);
    }
  };

  const clearOutput = () => {
    setDefaultOutput(); // Setelah menghapus, tampilkan kembali teks default
  };

  return (
    <>
      <style>
        {`
          #${editorId}, #result-${editorId} {
            width: 100%;
            height: 100%;
            border: none;
          }
        `}
      </style>

      <div className="editor-output-container">
        <div className="header-box">
          <h3>
            <FaCode /> EDITOR
          </h3>
        </div>

        <div className="editor-container">
          <div id={editorId}></div>
        </div>

        <div className="button-container">
          {runnable && (
            <>
              <button onClick={runCode}>Jalankan</button>
              <button onClick={resetCode} className="btn btn-warning">Reset</button>
              <button onClick={clearOutput} className="btn btn-danger">Hapus</button>
            </>
          )}
        </div>

        <div className="header-box">
          <h3>
            <FaDesktop /> OUTPUT
          </h3>
        </div>

        <div className="output-container">
          <iframe id={`result-${editorId}`}></iframe>
        </div>
      </div>
    </>
  );
};

export default KodeEditor;
