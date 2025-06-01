import React, { useEffect, useState, useRef } from "react";

const KodeEditor = ({ code = "", editorId = "htmleditor" }) => {
  const [initialCode] = useState(code);
  const [editorInstance, setEditorInstance] = useState(null);
  const editorRef = useRef(null);

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
        editor.setFontSize(20);
        editor.setValue(initialCode, -1);
        setEditorInstance(editor);

        adjustEditorHeight(editor);

        editor.session.on('change', () => {
          adjustEditorHeight(editor);
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [editorId, initialCode]);

  const adjustEditorHeight = (editor) => {
    if (editor && editorRef.current) {
      const lineHeight = editor.renderer.lineHeight || 20; 
      const lines = editor.session.getLength(); //
      const newHeight = lines * lineHeight;
  
      // Set tinggi editor sesuai jumlah baris
      editorRef.current.style.height = `${newHeight}px`;
  
      // Resize editor untuk menghindari space kosong
      editor.resize();
    }
  };
  

  return (
    <>
      <style>
        {`
          #${editorId} {
            width: 100%;
            border: none;
            margin: 0;
            padding: 0;
          }
        `}
      </style>

      <div className="editor-container">
        <div id={editorId} ref={editorRef}></div>
      </div>
    </>
  );
};

export default KodeEditor;
