import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import Isian from "../../components/isian.jsx";
import questions from "../../data/AktivitasEventDom/MenghentikanEventBawaan.json";
import Instruksi from "../../components/instruksi.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran.jsx";

const MateriMenghentikanEventBawaan = () => {
    const [progress, setProgress] = useState(0);
    const [halamanAktif, setHalamanAktif] = useState(17); // halaman saat ini
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

    const handleIsianSuccess = () => {
        if (halamanAktif >= progress) {
          updateProgress(halamanAktif); // ✅ hanya update kalau belum pernah
        } else {
          console.log("Progress tidak diupdate karena sudah pernah diselesaikan.");
        }
      };

     const tujuanBelajar = (
        <>
        <p>Setelah selesai mempelajari materi ini, diharapkan kamu akan mampu untuk:</p>
        <ul>
          <li>Memahami dan menerapkan preventDefault() untuk mencegah perilaku bawaan elemen HTML saat event terjadi.</li>
        </ul>
        </>
    );

    const description = (
        <>
        <Header title="Menghentikan Event Bawaan dengan preventDefault()" />
        <p>
        Beberapa event memiliki perilaku bawaan yang mungkin ingin kita cegah. Misalnya, 
        mengirim formulir secara otomatis saat tombol submit diklik. Kita bisa menggunakan 
        preventDefault() untuk menghentikan perilaku tersebut.
        </p>
        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>preventDefault()</title>
</head>
<body>
    <a href="https://example.com" id="myLink">Kunjungi situs</a>

    <script>
    var link = document.getElementById("myLink");
    link.addEventListener("click", function(event) {
        event.preventDefault();  
        alert("Tautan tidak diikuti.");
    });
    </script>

</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>Pada contoh di atas, <code>event.preventDefault()</code> digunakan untuk mencegah perilaku 
        bawaan dari elemen HTML. Dalam hal ini, perilaku bawaan dari elemen <code>&lt;a&gt;</code> adalah 
        membuka tautan yang ditentukan oleh atribut <code>href</code>.</p>

        <p>Event listener ditambahkan pada elemen tautan dengan <code>id="myLink"</code>, yang dipicu 
        saat tautan diklik. Dalam fungsi event handler, metode <code>event.preventDefault()</code> 
        dipanggil untuk mencegah tautan diarahkan ke URL <code>https://example.com</code>.</p>

        <p>Sebagai gantinya, muncul sebuah alert dengan pesan <strong>"Tautan tidak diikuti."</strong>.</p>

        </>
    );
  
   const instruksi = (
      <>  
        <p><b>Instruksi:</b></p>
        <ol>
          <li>Amati dan pahami potongan kode HTML atau JavaScript yang disediakan.</li>
          <li>Tuliskan jawaban dengan tepat sesuai aturan penulisan JavaScript atau HTML.</li>
          <li>Perhatikan penulisan huruf besar dan kecil (case sensitive)</li>
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
          <div className="section-kuis ms-4 me-4">
            <p>Kerjakan soal-soal berikut ini!</p>
  
            <Isian questions={questions} onSuccess={handleIsianSuccess}/>
          </div>
        </>
      );

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <div className="sidebar-wrapper" >
          <SidebarMahasiswa />
        </div>
        <div className="main-content">
          <AktivitasBox aktivitas={<TujuanPembelajaran tujuan={tujuanBelajar} />} />
          <AktivitasBox aktivitas={<Materi description={description} />} />  
          <AktivitasBox aktivitas={aktivitas} />
      
        <div className="d-flex justify-content-between ms-4 me-4 mt-5">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => navigate("/materi/menanganiEventDom")}
            className="btn btn-secondary"
          >
            Sebelumnya
          </button>

          {/* Tombol Selanjutnya */}
          <button
            onClick={() => navigate("/materi/perambatanEvent")}
            className="btn btn-warning text-white"
            disabled={progress <= halamanAktif}
          >
            Selanjutnya
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MateriMenghentikanEventBawaan;
