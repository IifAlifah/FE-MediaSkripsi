import { useEffect } from "react";
import { FaCode, FaDesktop, FaPlay, FaRedo, FaSave, FaUpload } from "react-icons/fa";

const EditorOutput = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.36.5/ace.js";
    script.onload = () => {
      const ace = window.ace;
      if (ace) {
        window.editor = ace.edit("htmleditor");
        editor.setTheme("ace/theme/chrome");
        editor.session.setMode("ace/mode/html");
        editor.setOption("printMargin", false);
        editor.setFontSize(20);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const runCode = () => {
    const code = window.editor.getValue();
    const iframe = document.getElementById("result");
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(code);
    iframeDoc.close();
    document.getElementById("output-overlay").style.display = "none";
  };

  const resetAll = () => {
    if (window.editor) {
      window.editor.setValue("");
    }
    const iframe = document.getElementById("result");
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write("");
    iframeDoc.close();
  };

  // Fungsi simpan file HTML (download file)
  const saveFile = () => {
    const code = window.editor.getValue();
    const blob = new Blob([code], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "code.html";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Fungsi upload file dan load ke editor
  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/html") {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (window.editor) {
          window.editor.setValue(e.target.result, -1); // -1 supaya cursor di awal
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid HTML file.");
    }
  };

  return (
    <>
      <style>{`
        .editor-output-container {
          display: grid;
          grid-template-columns: 65% 35%;
          gap: 5px;
          height: calc(100vh - 10px);
          padding: 5px;
          box-sizing: border-box;
        }

        .section {
          display: flex;
          flex-direction: column;
          border: 1px solid #ccc;
          overflow: hidden;
        }

        .header-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          height: 60px;
        }

        .header-box h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
        }

        .editor-container,
        .output-container {
          flex: 1;
          border: 1px solid #ccc;
          box-sizing: border-box;
          overflow: hidden;
        }

        #htmleditor,
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        button {
          padding: 4px 6px;
          border: none;
          background-color: #007bff;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 1px;
          height: 36px;
        }

        .btn-run {
          background-color: #218838;
        }
        .btn-run:hover {
          background-color: #1c7430;
        }

        .btn-reset {
          background-color: #c82333;
        }
        .btn-reset:hover {
          background-color: #a71d2a;
        }

        .btn-save {
          background-color: #0069d9;
        }
        .btn-save:hover {
          background-color: #0056b3;
        }

        .btn-upload {
          height: 36px;
          margin-top: 5px;
          cursor: pointer;
          background-color: #5a6268;
          padding: 4px 6px;
          border-radius: 6px;
          color: white;
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 12px;
        }
        .btn-upload:hover {
          background-color: #4e555b;
        }

        input[type="file"] {
          display: none;
        }

        @media (max-width: 768px) {
          .editor-output-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            height: auto;
          }

          .section {
            height: 50vh;
          }

          .header-box h3 {
            font-size: 18px;
          }
          button {
            padding: 3px 5px;
            font-size: 11px;
            height: 28px;
          }

          label[for="upload-file"] {
            padding: 3px 5px;
            font-size: 11px;
            height: 28px;
          }
        }
      `}</style>

      <div className="editor-output-container">
        <div className="section">
          <div className="header-box p-3">
            <h3>
              <FaCode /> EDITOR
            </h3>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={runCode} className="btn-run">
                <FaPlay /> Jalankan
              </button>
              <button onClick={resetAll} className="btn-reset">
                <FaRedo /> Reset
              </button>
              <button onClick={saveFile} className="btn-save">
                <FaSave /> Simpan
              </button>
              <label htmlFor="upload-file" className="btn-upload">
                <FaUpload /> Buka File
              </label>
              <input
                type="file"
                id="upload-file"
                accept=".html"
                onChange={uploadFile}
              />
            </div>
          </div>

          <div className="editor-container">
            <div id="htmleditor"></div>
          </div>
        </div>

        <div className="section">
          <div className="header-box p-3">
            <h3>
              <FaDesktop /> OUTPUT
            </h3>
          </div>
          <div className="output-container">
            <div className="output-overlay" id="output-overlay">
              Output akan tampil di sini ...
            </div>
            <iframe id="result"></iframe>
          </div>

        </div>
      </div>
    </>
  );
};

export default EditorOutput;
