import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import Isian from "../../components/isian.jsx";
import questions from "../../data/AktivitasManipulasi/MengubahCss.json"; // Pastikan path ini sesuai dengan struktur folder Anda
import Instruksi from "../../components/instruksi.jsx";
import ModalPetunjukKuisIsian from "../../components/modalPetunjukKuisIsian.jsx";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran.jsx";

const MateriMengubahCss = () => {
    const [showModal, setShowModal] = useState(false); 
    const [progress, setProgress] = useState(0);
    const [halamanAktif, setHalamanAktif] = useState(13); // halaman saat ini
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
          <li>Memahami dan menerapkan cara mengubah tampilan elemen HTML dengan menggunakan properti style. </li>
        </ul>
        </>
      )

    const description = (
        <>
        <Header title="Mengubah Gaya (CSS) Elemen dengan style" />
        <p>
        Dalam JavaScript, kita dapat mengubah gaya (CSS) elemen HTML secara dinamis menggunakan properti style. 
        Properti ini memungkinkan kita untuk mengakses dan memodifikasi gaya yang diterapkan langsung pada elemen 
        HTML melalui JavaScript, tanpa perlu mengubah file CSS secara langsung. Dengan cara ini, kita dapat mengubah 
        tampilan elemen di halaman web, seperti mengganti warna latar belakang, mengubah ukuran, atau memodifikasi berbagai properti CSS lainnya.
        </p>
        <p>Perhatikan kode di bawah ini!</p>
        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <div id="box" style="width: 100px; height: 100px; background-color: blue; margin-bottom: 5px;"></div>
    
    <button onclick="ubahGaya()">Klik untuk Ubah Tampilan</button>

    <script>
    function ubahGaya() {
        var box = document.getElementById("box");
        box.style.backgroundColor = "red"; 
        box.style.width = "150px";         
    }
    </script>
</body>
</html>
`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>Pada contoh di atas, elemen <code>&lt;div id="box"&gt;</code> awalnya memiliki gaya CSS 
        yang ditetapkan di dalam atribut <code>style</code>, yaitu lebar 100px, tinggi 100px, dan 
        warna latar belakang biru. Kemudian, dengan menggunakan JavaScript, kita mengakses elemen 
        tersebut menggunakan <code>document.getElementById('box')</code>. Setelah elemen diakses, 
        JavaScript dapat mengubah gaya CSS elemen tersebut secara dinamis.</p>

        <p>Pada kode JavaScript, <code>box.style.backgroundColor = "red";</code> mengubah warna 
        latar belakang elemen menjadi merah, sedangkan <code>box.style.width = "150px";</code> 
        mengubah lebar elemen dari 100px menjadi 150px. Ini menunjukkan bagaimana JavaScript 
        dapat digunakan untuk memodifikasi properti CSS elemen HTML setelah halaman dimuat.</p>

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
          <AktivitasBox aktivitas={aktivitas} />

          <ModalPetunjukKuisIsian
              show={showModal}
              onClose={() => setShowModal(false)}
              bab="Manipulasi Konten"
              kuis={3}
              routeMulai="/kuis4"
          />
      
        <div className="d-flex justify-content-between ms-4 me-4 mt-5">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => navigate("/materi/menambah_menghapu")}
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

export default MateriMengubahCss;
