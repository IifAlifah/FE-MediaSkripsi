import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Header from "../components/header";

const PageWithEditorAndImage = () => {
  useEffect(() => {
    const editorId = "kodeEditor";

    // Load Ace Editor dari CDN
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.36.5/ace.js";
    script.onload = () => {
      const ace = window.ace;
      const editor = ace.edit(editorId);
      editor.setTheme("ace/theme/chrome");
      editor.session.setMode("ace/mode/html");
      editor.setOption("printMargin", false);
      editor.setFontSize(16);
      editor.renderer.setShowGutter(false);
      editor.setValue(
        `<html lang="id">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Berita Hari Ini</title>
  </head>
  <body>

    <main>
      <header>
        <h1>Berita Terkini</h1>
      </header>

      <div>
        <h3>Fakta Singkat</h3>
        <p>Berita ini terjadi pada pukul 08.00 WIB di Jakarta Selatan.</p>
      </div>

      <footer>
        <p>© 2025 MediaKita</p>
      </footer>
    </main>

  </body>
</html>`,
        -1
      );
      editor.setReadOnly(true);
      editor.container.style.cursor = "default";

      // Tooltip setup
      const tooltip = document.createElement("div");
      tooltip.style.position = "absolute";
      tooltip.style.backgroundColor = "#333";
      tooltip.style.color = "#fff";
      tooltip.style.padding = "6px 10px";
      tooltip.style.borderRadius = "5px";
      tooltip.style.fontSize = "12px";
      tooltip.style.zIndex = "1000";
      tooltip.style.display = "none";
      tooltip.style.pointerEvents = "none";
      document.body.appendChild(tooltip);

      // Relasi node
      const nodeRelations = {
        html: { parent: "root node", child: ["head", "body"], sibling: "tidak ada" },
        head: { parent: "html", child: ["meta", "title"], sibling: "body" },
        meta: { parent: "head", child: [], sibling: "title" },
        title: { parent: "head", child: [], sibling: "meta" },
        body: { parent: "html", child: ["main"], sibling: "head" },
        main: { parent: "body", child: ["header", "div", "footer"], sibling: "tidak ada" },
        header: { parent: "main", child: ["h1"], sibling: "div, footer" },
        h1: { parent: "header", child: [], sibling: "tidak ada" },
        div: { parent: "main", child: ["h3", "p"], sibling: "header, footer" },
        h3: { parent: "div", child: [], sibling: "p" },
        p: { parent: "div", child: [], sibling: "h3" },
        footer: { parent: "main", child: ["p"], sibling: "header, div" },
        "p-footer": { parent: "footer", child: [], sibling: "tidak ada" },
      };

      const getNodeRelationText = (tag, line) => {
        const lowerTag = tag.toLowerCase();
        const isFooterP = lowerTag === "p" && line >= 24;
        const key = isFooterP ? "p-footer" : lowerTag;
      
        const relation = nodeRelations[key] || {
          parent: "tidak diketahui",
          child: [],
          sibling: "tidak diketahui",
        };
      
        const isRoot = key === "html"; // langsung cek apakah tag-nya html
      
        const parentText = isRoot
          ? `Tag <${tag}> adalah root node`
          : `Tag <${tag}> adalah anak dari <${relation.parent}>`;
      
        const siblingText =
          relation.sibling && relation.sibling !== "tidak ada"
            ? `, bersaudara dengan ${relation.sibling
                .split(", ")
                .map((s) => `<${s}>`)
                .join(" dan ")}`
            : "";
      
        const childText =
          relation.child.length > 0
            ? ` serta memiliki anak ${relation.child.map((c) => `<${c}>`).join(" dan ")}.`
            : ".";
      
        return `${parentText}${siblingText}${childText}`;
      };
      

      // Tooltip saat mouse hover
      const showTooltip = (e) => {
        const coords = editor.renderer.screenToTextCoordinates(e.clientX, e.clientY);
        const token = editor.session.getTokenAt(coords.row, coords.column);

        if (token && token.type.includes("tag-name")) {
          const tag = token.value.replace(/[<>/]/g, "");
          const text = getNodeRelationText(tag, coords.row);
          tooltip.innerText = text;
          tooltip.style.left = e.pageX + 10 + "px";
          tooltip.style.top = e.pageY + 10 + "px";
          tooltip.style.display = "block";
        } else {
          tooltip.style.display = "none";
        }
      };

      editor.container.addEventListener("mousemove", showTooltip);
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
    <Header title="Mengenal Struktur DOM Secara Interaktif" icon={FaSearch}/>
      <p style={{ marginBottom: "1rem" }}>
        Di bawah ini adalah representasi visual dari struktur DOM (Document Object Model) sebuah halaman HTML sederhana.
        Setiap elemen HTML ditampilkan dalam bentuk kode di sisi kiri, dan strukturnya divisualisasikan dalam gambar di sisi kanan.
        <b> Arahkan kursor</b> ke nama tag di editor untuk melihat penjelasan hubungan antar elemen, seperti parent, child, dan sibling-nya.
      </p>
      
      <div style={{ display: "flex", height: "70%", fontFamily: "sans-serif" }}>
        {/* KIRI: KODE EDITOR */}
        <div style={{ flex: 1, padding: "1rem" }}>
          <h3>Kode Editor</h3>
          <div
            id="kodeEditor"
            style={{
              width: "100%",
              height: "93%",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          ></div>
        </div>
  
        {/* KANAN: GAMBAR STRUKTUR */}
        <div style={{ flex: 1, padding: "1rem", borderLeft: "1px solid #ccc" }}>
          <h3>Struktur HTML</h3>
          <img
            src="/gambar/domTree2.png"
            alt="Struktur DOM"
            style={{
              width: "100%",
              height: "auto",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>
    </div>
  );
  
};

export default PageWithEditorAndImage;
