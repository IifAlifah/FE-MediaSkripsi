import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import Isian from "../../components/isian.jsx";
import questions from "../../data/AktivitasMengakses/getElementByClassname.json"; // Pastikan path ini sesuai dengan struktur folder Anda
import Instruksi from "../../components/instruksi.jsx";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran.jsx";

const MateriByClassname = () => {
  const [progress, setProgress] = useState(0);
  const [halamanAktif, setHalamanAktif] = useState(6); // halaman saat ini
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
          <li>Memahami fungsi dan cara kerja metode getElementsByClassName() dalam DOM.</li>
        </ul>
        </>
      )

  const description = (
      <>
        <Header title="getElementByClassName()" />
        <p>
        Di JavaScript, kita dapat mengakses elemen HTML menggunakan className atau getElementsByClassName() 
        untuk mencari elemen-elemen yang memiliki <i>class</i> tertentu. Fungsi ini sangat berguna ketika kita ingin 
        menangani banyak elemen yang memiliki kelas yang sama. Fungsi ini mengembalikan HTMLCollection, 
        yang merupakan kumpulan elemen. <b>HTMLCollection</b> berfungsi seperti array, tetapi tidak sepenuhnya array, jadi kita bisa mengakses elemen menggunakan indeks, seperti array.
        </p>
        <p>Perhatikan kode di bawah ini!</p>
        <KodeEditor
         code={`<!DOCTYPE html>
<html lang="en">
<body>
    <div class="card">Kartu pertama</div>
    <div class="card">Kartu kedua</div>

    <script>
    var cards = document.getElementsByClassName("card");
    alert("Elemen yang diakses: " + cards[1].textContent); 
    </script>

</body>
</html>`}
         runnable={true}
        />
        <br></br>
        
        <p>
        Pada contoh di atas, <code>getElementsByClassName('card')</code> digunakan untuk mengambil semua
         elemen <code>&lt;div&gt;</code> yang memiliki <i>class</i> <code>card</code>.
        </p> 

        <p>
          Elemen kedua dari koleksi diakses dengan <code>cards[1]</code>, kemudian properti <code>textContent</code> digunakan 
          untuk mengambil isi teks dari elemen tersebut, yaitu "Kartu kedua".
        </p>

        <p>
          Terakhir, <code>alert()</code> digunakan untuk menampilkan pesan: <strong>"Elemen yang diakses: Kartu kedua"</strong>, menandakan bahwa elemen berhasil diakses dan isinya ditampilkan.
        </p>
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
            onClick={() => navigate("/materi/tagname")}
            className="btn btn-secondary"
          >
            Sebelumnya
          </button>

          {/* Tombol Selanjutnya */}
          <button
            onClick={() => navigate("/materi/querySelector")}
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

export default MateriByClassname;
