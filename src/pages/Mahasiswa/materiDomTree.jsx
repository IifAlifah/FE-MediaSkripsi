import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import Gambar from "../../components/tambahGambar";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Instruksi from "../../components/instruksi.jsx";
import Header from "../../components/header.jsx";
import BoxEditor from "../../components/boxEditor.jsx";
import PageWithEditorAndImage from "../../components/interaktifDom.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran.jsx";

const MateriDomTree = () => {
  const [progress, setProgress] = useState(0);
  const [halamanAktif, setHalamanAktif] = useState(1); // halaman saat ini
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

    const updateProgress = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/progress/update",
        {}, // bisa ditambah body kalau backend butuh nilai progress tertentu
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Progress berhasil diperbarui");
  
        // ✅ Update state progress secara lokal
        const newProgress = halamanAktif + 1; // atau sesuai dengan logika kamu
        setProgress(newProgress);
      }
    } catch (error) {
      console.error("Gagal update progress:", error);
    }
  };
  
    useEffect(() => {
      // Fetch progress dari backend saat komponen mount
      const fetchProgress = async () => {
        const response = await fetch("http://localhost:5000/progress", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProgress(data.progress); // update state
      };
      fetchProgress();
    }, []);
  
    const tujuanBelajar = (
    <>
      <p>Setelah mempelajari materi ini, diharapkan kamu akan mampu untuk:</p>
      <ul>
          <li>Memahami struktur DOM Tree dalam dokumen HTML</li>
      </ul>
    </>
  );

  const description = (
    <>
      <Header title="DOM Tree" />
      <p>
        Ketika browser memuat halaman HTML, ia akan mengubah elemen-elemen HTML tersebut menjadi sebuah <b>DOM Tree</b> (Pohon DOM). <b>DOM Tree</b> adalah representasi hirarkis yang menggambarkan struktur elemen-elemen HTML dalam bentuk node-node yang saling 
        berhubungan, yang memungkinkan JavaScript untuk mengakses, memodifikasi, dan mengelola setiap elemen secara terpisah. Setiap elemen di dalam DOM Tree memiliki hubungan <b><i>parent-child</i></b> (induk-anak) dengan elemen lainnya. Sebagai contoh dapat dilihat pada <b>Gambar 2.1</b>.
      </p>
      
      <Gambar
        src="/gambar/gambar1_1.png" 
        alt="DOM Tree" 
        caption="Gambar 1.1 Contoh Struktur DOM Tree" 
      />
      
      <p>
      Pada <b>Gambar 1.1</b>, Struktur halaman web dimulai dengan tag &lt;html&gt; sebagai akar dokumen, yang tidak memiliki induk maupun saudara 
      karena semua elemen lain berada di dalamnya. Di bawah &lt;html&gt; terdapat dua cabang utama, yaitu &lt;head&gt; dan &lt;body&gt;, yang merupakan saudara 
      karena berbagi induk yang sama. &lt;head&gt; memiliki satu anak, yaitu &lt;title&gt;, sedangkan &lt;body&gt; memiliki tiga anak: &lt;h1&gt;, &lt;p&gt;, dan &lt;div&gt;, 
      yang juga merupakan saudara. Selanjutnya, &lt;div&gt; menjadi induk dari dua elemen, yaitu &lt;ul&gt; dan &lt;img&gt;, yang merupakan saudara satu sama lain. 
      Lebih dalam lagi, &lt;ul&gt; memiliki dua anak berupa elemen &lt;li&gt; yang juga saling bersaudara. Dari penjelasan diatas, dapat disimpulkan hubungan antar elemen mencakup:</p>
      <p>
      <ul>
        <li><b>Induk(<i>Parent</i>) dan Anak(<i>Child</i>)</b>: Elemen yang berada di dalam elemen lain disebut anak, sementara elemen yang menaunginya disebut induk. Seperti yang terlihat pada Gambar 1.2 &lt;html&gt; adalah induk dari &lt;head&gt; dan &lt;body&gt;, sedangkan &lt;ul&gt; adalah induk dari &lt;li&gt;. </li>
        <Gambar
        src="/gambar/gambar1_2.png" 
        alt="DOM Tree" 
        caption="Gambar 1.2 Parent-Child" 
      />
        <li><b>Saudara (<i>Sibling</i>)</b>: Elemen-elemen yang berbagi induk yang sama disebut saudara, seperti yang terlihat pada Gambar 1.3 &lt;head&gt; dan &lt;body&gt; atau &lt;h1&gt;, &lt;p&gt;, dan &lt;div&gt; di dalam &lt;body&gt;.</li>
        <Gambar
        src="/gambar/gambar1_3.png" 
        alt="DOM Tree" 
        caption="Gambar 1.3 Sibling" 
      />
        <li><b>Akar (<i>Root</i>)</b>: Elemen tertinggi, yaitu &lt;html&gt;, adalah akar dokumen yang menjadi titik awal dari seluruh struktur. Seperti yang terlihat pada Gambar 1.4</li>
        <Gambar
        src="/gambar/gambar1_4.png" 
        alt="DOM Tree" 
        caption="Gambar 1.4 Root" 
      />
      </ul>
      </p>
      <p>
      Melalui hubungan ini, DOM memungkinkan pengembang untuk mengakses, memanipulasi, dan mengatur elemen HTML secara terstruktur, serta menjadikan halaman web dinamis dan interaktif.
      </p>
    </>
  );

  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Belajar Struktur DOM</title>
</head>
<body>
    <header>
        <h1>Selamat Datang di Web School</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#home">Beranda</a></li>
            <li><a href="#about">Tentang Kami</a></li>
            <li><a href="#services">Layanan</a></li>
            <li><a href="#contact">Kontak</a></li>
        </ul>
    </nav>
    <div>
        <h2>Tentang Sekolah Kami</h2>
        <p>Kami menyediakan kursus pengembangan web untuk semua level.</p>
    </div>
    <footer>
        <p>&copy; 2024 Web School. Semua hak dilindungi.</p>
    </footer>
</body>
</html>
`;

const cekJawaban = () => {
  const jawabanBenar = ["body", "header, nav, footer", "ul", "p", "header"];
  let semuaBenar = true;

  for (let i = 1; i <= 5; i++) {
    const input = document.getElementById(`answer${i}`);
    if (!input) continue;

    const jawaban = input.value.trim().toLowerCase();
    if (jawaban === jawabanBenar[i - 1]) {
      input.style.border = "2px solid green";
    } else {
      input.style.border = "2px solid red";
      semuaBenar = false; 
    }
  }

  if (semuaBenar) {
    if (halamanAktif >= progress) {
      updateProgress(halamanAktif); // Update progres jika belum pernah menyelesaikan
    }

    Swal.fire({
      icon: "success",
      title: "Selamat!",
      text: "Kamu telah menyelesaikan materi ini.",
      confirmButtonText: "Lanjut",
    }).then(() => {
      setHalamanAktif((prev) => prev + 1); // Pindah ke materi berikutnya
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Jawaban belum benar semua!",
      text: "Silakan periksa kembali jawabanmu.",
    });
  }
};

  const instruksi = (
    <>  
      <p><b>Instruksi:</b></p>
      <ol>
        <li>Amati dan pahami struktur HTML yang diberikan di bawah ini.</li>
        <li>Jawablah pertanyaan berikut dengan langsung menuliskan nama elemen HTML (misalnya: <code>body</code>, <code>ul</code>, <code>header</code>, dll).</li>
        <li>Jawaban benar di tandai dengan kolom input berwarna hijau, dan jawaban salah di tandai dengan kolom input berubah jadi merah</li>
      </ol>
      </>
  );  
  
  const aktivitas = (
    <>
      <GambarAktivitas
        src="/aktivitas.png" 
        alt="Aktivitas" 
      />
      <Instruksi aktivitas ={instruksi}/>
      
      <div className="question-section mt-4 ms-4 me-4">
        <div className="code-section mb-4">
          <BoxEditor code={htmlCode} editorId="htmlViewer" />
        </div>
      <p>Silahkan analisis struktur HTML diatas, kemudian jawab pertanyaan-pertanyaan berikut!</p>

      <div className="question-input mt-4">
        <p>1. Parent dari elemen &lt;nav&gt; adalah</p>
        <input type="text" id="answer1" placeholder="Masukkan jawaban..." />
      </div>

      <div className="question-input">
        <p>2. Sebutkan semua sibling dari elemen &lt;div&gt;</p>
        <input type="text" id="answer2" placeholder="Masukkan jawaban..." />
      </div>

      <div className="question-input">
        <p>3. Anak dari elemen &lt;nav&gt; adalah</p>
        <input type="text" id="answer3" placeholder="Masukkan jawaban..." />
      </div>

      <div className="question-input">
        <p>4. Sibling dari elemen &lt;h2&gt; adalah</p>
        <input type="text" id="answer4" placeholder="Masukkan jawaban..." />
      </div>

      <div className="question-input">
        <p>5. Parent dari elemen &lt;h1&gt; adalah</p>
        <input type="text" id="answer5" placeholder="Masukkan jawaban..." />
      </div>

      <button onClick={cekJawaban}>Cek Jawaban</button>
    </div>

    </>
  );
  
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <div className="sidebar-wrapper">
          <SidebarMahasiswa/>
        </div>
        <div className="main-content">
        <AktivitasBox
          aktivitas={
            <>
              <TujuanPembelajaran tujuan={tujuanBelajar} />
            </>
          }
        />
        <AktivitasBox aktivitas={<Materi description={description} />} />
        <AktivitasBox aktivitas={<PageWithEditorAndImage />} />
        <AktivitasBox aktivitas={aktivitas}/>
        <div className="d-flex justify-content-between ms-4 me-4 mt-5">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => navigate("/materi/materiDom")}
            className="btn btn-secondary"
          >
            Sebelumnya
          </button>

          {/* Tombol Selanjutnya */}
          <button
            onClick={() => navigate("/materi/node")}
            className="btn btn-warning text-white"
            disabled={progress < halamanAktif}
          >
            Selanjutnya
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MateriDomTree;
