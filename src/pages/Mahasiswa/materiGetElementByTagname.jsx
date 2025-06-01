import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import Isian from "../../components/isian.jsx";
import questions from "../../data/AktivitasMengakses/getElementByTagname.json"; // Pastikan path ini sesuai dengan struktur folder Anda
import Instruksi from "../../components/instruksi.jsx";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran.jsx";

const MateriByTagname = () => {
  const [progress, setProgress] = useState(0);
  const [halamanAktif, setHalamanAktif] = useState(5); // halaman saat ini
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
          <li>Memahami fungsi dan cara kerja metode getElementsByTagName() dalam DOM.</li>
        </ul>
        </>
      )

  const description = (
      <>
        <Header title="getElementByTagName()" />
       <p>
        Metode <code>getElementsByTagName()</code> digunakan untuk memilih elemen berdasarkan nama tag HTML mereka, seperti <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>, dan lain-lain. Metode ini akan mengembalikan semua elemen dengan nama tag tertentu 
        dalam dokumen. Hasil dari metode ini adalah sebuah <code>HTMLCollection</code>, yaitu kumpulan elemen yang dapat diakses seperti array.
      </p>
      <p>Perhatikan kode di bawah ini!</p>
        <KodeEditor
         code={`<!DOCTYPE html>
<html lang="en">
<body>
    <p>Ini adalah paragraf pertama.</p>
    <p>Ini adalah paragraf kedua.</p>

    <script>
    var paragraphs = document.getElementsByTagName("p");
    alert("Elemen yang diakses: " + paragraphs[0].textContent); 
    </script>

</body>
</html>`}
         runnable={true}
        />
        <br></br>

       <p>
        Pada kode di atas terdapat dua elemen <code>&lt;p&gt;</code>, masing-masing berisi teks 
        "Ini adalah paragraf pertama." dan "Ini adalah paragraf kedua."
      </p>

      <p>
        Di dalam JavaScript, fungsi <code>document.getElementsByTagName('p')</code> digunakan untuk mengambil semua elemen dengan tag <code>&lt;p&gt;</code>. 
        Hasilnya disimpan dalam variabel <code>paragraphs</code> sebagai sebuah <code>HTMLCollection</code>, yaitu kumpulan elemen yang bisa diakses seperti array.
      </p>

      <p>
        Elemen pertama diakses menggunakan <code>paragraphs[0]</code>. Untuk mendapatkan isi teksnya, digunakan 
        properti <code>textContent</code>, sehingga <code>paragraphs[0].textContent</code> menghasilkan "Ini adalah paragraf pertama.".
      </p>

      <p>
        Terakhir, fungsi <code>alert()</code> menampilkan pesan: <strong>"Elemen yang diakses: Ini adalah paragraf pertama."</strong>, 
        yang menunjukkan bahwa elemen berhasil diakses dan isinya berhasil ditampilkan.
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
          <SidebarMahasiswa/>
        </div>
        <div className="main-content">
          <AktivitasBox aktivitas={
            <>
              <TujuanPembelajaran tujuan={tujuanBelajar} />
              {/* <Materi description={materiIntro} /> */}
            </>
          } />
          <AktivitasBox aktivitas={<Materi description={description} />} />
          <AktivitasBox 
          aktivitas={aktivitas}
          />
        <div className="d-flex justify-content-between ms-4 me-4 mt-5">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => navigate("/materi/id")}
            className="btn btn-secondary"
          >
            Sebelumnya
          </button>

          {/* Tombol Selanjutnya */}
          <button
            onClick={() => navigate("/materi/classname")}
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

export default MateriByTagname;
