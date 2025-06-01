import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import Isian from "../../components/isian.jsx";
import questions from "../../data/AktivitasMengakses/getElementById.json"; // Pastikan path ini sesuai dengan struktur folder Anda
import Instruksi from "../../components/instruksi.jsx";
import axios from "axios";

const MateriId = () => {
    const [progress, setProgress] = useState(0);
    const [halamanAktif, setHalamanAktif] = useState(4); // halaman saat ini
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
          <li>Memahami fungsi dan penggunaan metode getElementById() dalam DOM.</li>
        </ul>
        </>
      )
    
    // const materiIntro = (
    //     <>
    //       <p>Sebelum memanipulasi elemen, JavaScript harus terlebih 
    //       dahulu mengakses elemen yang ingin dimanipulasi. DOM (Document Object Model) menyediakan beberapa cara untuk 
    //       mengakses elemen-elemen dalam dokumen HTML. Berikut adalah beberapa cara untuk mengakses elemen-elemen DOM yang 
    //       sering digunakan dalam pengembangan web:
    //       </p>
    //     </>
    // );
        

    const description = (
        <>
        <Header title="getElementById" />
        <p>
        Metode <b>getElementById()</b> digunakan untuk memilih satu elemen berdasarkan nilai id yang unik di dalam dokumen. 
        Setiap elemen HTML yang memiliki atribut id seharusnya memiliki nilai yang unik, sehingga hanya satu elemen yang dapat dipilih dengan cara ini.
        </p>
        <p>Perhatikan kode di bawah ini!</p>
        <KodeEditor
         code={`<!DOCTYPE html>
<html lang="en">
<body>

    <header id="header">Selamat datang di Halaman Saya</header>

    <div id="content">
        <p>Ini adalah konten utama halaman web. Anda bisa menambahkan teks dan elemen lainnya di sini.</p>
    </div>

    <footer id="footer">
        <p>Terima kasih telah mengunjungi halaman ini.</p>
    </footer>

    <script>
        var Element = document.getElementById("header");
        alert("Elemen yang diakses: " + Element.textContent);
    </script>

</body>
</html>`}
         runnable={true}
        />
        <br></br>
        <p>
          Pada contoh di atas, <code>getElementById('header')</code> digunakan untuk mengakses elemen yang memiliki Id <code>header</code>, 
          yang dalam hal ini adalah elemen <code>&lt;header&gt;</code> yang berisi teks "Selamat datang di Halaman Saya". 
          Fungsi <code>getElementById()</code> akan mengembalikan elemen tersebut sebagai objek DOM, dan objek tersebut dapat dimanipulasi lebih lanjut. 
          Dalam hal ini, kita menggunakan <code>textContent</code> untuk mengambil teks murni dari elemen tersebut, yaitu 
          "Selamat datang di Halaman Saya", dan kemudian menampilkannya menggunakan <code>alert()</code>. 
          Alert yang muncul akan menunjukkan pesan: <strong>"Elemen yang diakses: Selamat datang di Halaman Saya"</strong> 
          yang menunjukkan teks dari elemen yang kita akses.
        </p>

        <p>
        Penting untuk dicatat bahwa <b>getElementById()</b> hanya mengembalikan elemen pertama yang ditemukan dengan Id yang sesuai, 
        sehingga jika ada elemen lain dengan Id yang sama, hanya elemen pertama yang akan diakses.
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

          <Isian questions={questions} onSuccess={handleIsianSuccess} />
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
          <AktivitasBox aktivitas={
            <>
              <TujuanPembelajaran tujuan={tujuanBelajar} />
            </>
          } 
          />  
          <AktivitasBox aktivitas={<Materi description={description} />} />  
          <AktivitasBox aktivitas={aktivitas} />

          <div className="d-flex justify-content-end ms-4 me-4 mt-5">
            <button
              onClick={() => navigate("/materi/tagName")}
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

export default MateriId;
