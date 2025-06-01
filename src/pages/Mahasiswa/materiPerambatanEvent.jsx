import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import questions from "../../data/AktivitasEventDom/PerambatanEvent.json"
import Instruksi from "../../components/instruksi.jsx";
import Isian from "../../components/isian.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ModalPetunjukKuisIsian from "../../components/modalPetunjukKuisIsian.jsx";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran.jsx";

const MateriPerambatanEvent = () => {
    const [showModal, setShowModal] = useState(false); 
    const [progress, setProgress] = useState(0);
    const [halamanAktif, setHalamanAktif] = useState(18); // halaman saat ini
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

    const handleNextClick = () => {
      setShowModal(true);
    };

     const tujuanBelajar = (
        <>
        <p>Setelah selesai mempelajari materi ini, diharapkan kamu akan mampu untuk:</p>
        <ul>
          <li>Memahami dan menggunakan stopPropagation() untuk menghentikan perambatan event ke elemen induk dalam DOM.</li>
        </ul>
        </>
    );
    const description = (
        <>
        <Header title="Menghentikan Perambatan Event dengan stopPropagation()" />
        <p>
        Terkadang, event pada elemen anak dapat memicu event yang sama pada elemen induknya. 
        Untuk mencegahnya, kita bisa menggunakan stopPropagation().
        </p>
        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>stopPropagation</title>
</head>
<body>
    <div id="parent" style="padding: 20px; background-color: lightblue;">
        <button id="child">Klik saya</button>
    </div>
      
      <script>
        var parent = document.getElementById("parent");
        var child = document.getElementById("child");
      
        parent.addEventListener("click", function() {
          alert("Parent diklik");
        });
      
        child.addEventListener("click", function(event) {
          event.stopPropagation();  
          alert("Child diklik");
        });
      </script>

</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>Pada contoh di atas, ketika elemen <code>&lt;button&gt;</code> (child) diklik, 
        event listener pada elemen induk <code>&lt;div&gt;</code> (parent) juga akan terpicu 
        secara otomatis karena mekanisme <strong>event bubbling</strong>.</p>

        <p>Namun, dengan menggunakan metode <code>stopPropagation()</code> dalam event listener 
        pada elemen child, kita mencegah event tersebut untuk terus menyebar ke elemen induk. 
        Akibatnya, hanya pesan <strong>"Child diklik"</strong> yang muncul saat tombol diklik, 
        sementara pesan <strong>"Parent diklik"</strong> yang seharusnya muncul dari klik pada 
        elemen parent tidak akan ditampilkan.</p>

        <p>Ini menunjukkan bagaimana kita dapat mengendalikan perilaku event dan mencegahnya 
        menyebar ke elemen lain di atasnya dalam hierarki DOM.</p>

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
        {!showModal && (
            <div className="sidebar">
                <SidebarMahasiswa />
            </div>
        )}
        <div className="main-content">
          <AktivitasBox aktivitas={<TujuanPembelajaran tujuan= {tujuanBelajar} />} />
          <AktivitasBox aktivitas={<Materi description={description} />} />  
          <AktivitasBox 
          aktivitas={aktivitas}
          />

        <ModalPetunjukKuisIsian
          show={showModal}
          onClose={() => setShowModal(false)}
          bab="Event pada DOM"
          kuis={4}
          routeMulai="/kuis5"
        />

        <div className="d-flex justify-content-between ms-4 me-4 mt-5">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => navigate("/materi/menghentikanEventBawaan")}
            className="btn btn-secondary"
          >
            Sebelumnya
          </button>

          {/* Tombol Selanjutnya */}
          <button
            onClick={handleNextClick}
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

export default MateriPerambatanEvent;
