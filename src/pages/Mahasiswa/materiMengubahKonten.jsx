import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import Isian from "../../components/isian.jsx";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import questions from "../../data/AktivitasManipulasi/MengubahKontenElemen.json"
import Instruksi from "../../components/instruksi.jsx";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";

const MateriMengubahKonten = () => {
    const [progress, setProgress] = useState(0);
    const [halamanAktif, setHalamanAktif] = useState(10); // halaman saat ini
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
          <li>Memahami dan menerapkan textContent atau innerHTML sesuai kebutuhan untuk memanipulasi konten halaman web.</li>
        </ul>
        </>
      )
    
    const description = (
        <>
        <Header title="Mengubah Konten dalam Elemen HTML" />
        <p>Ada dua cara utama untuk mengubah konten elemen HTML yaitu dengan menggunakan:</p>
        <ul>
            <li>
                <b>textContent</b> digunakan untuk mengubah atau mendapatkan teks dari sebuah elemen HTML tanpa 
                mempengaruhi elemen-elemen HTML di dalamnya. Ini berguna jika kita hanya ingin mengubah teks murni, 
                tanpa menambahkan atau memodifikasi tag HTML di dalam elemen tersebut.
            </li>
        </ul>
        <p>Perhatikan kode di bawah ini!</p>
        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <div id="greeting">Halo, selamat datang!</div>
    <button onclick="ubahTeks()">Klik untuk ubah konten</button>

    <script>
    function ubahTeks() {
        var greeting = document.getElementById("greeting");
        greeting.textContent = "Halo, selamat datang di website kami!";
    }
    </script>
</body>
</html>
`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>

        <p>
          Saat halaman web pertama kali dibuka, elemen <code>&lt;div&gt;</code> dengan atribut <code>id="greeting"</code> menampilkan teks <b>"Halo, selamat datang!"</b>. 
          Di bawahnya terdapat sebuah tombol <b>"Klik untuk ubah"</b>. Tombol ini memiliki atribut <code>onclick</code> yang akan menjalankan fungsi JavaScript bernama <code>ubahTeks()</code> saat diklik.
        </p>
        <p> 
          Di dalam fungsi <code>ubahTeks()</code>, elemen dengan <code>id="greeting"</code> diakses menggunakan method <code>document.getElementById()</code>. 
          Kemudian, properti <code>textContent</code> digunakan untuk mengubah isi teks elemen tersebut menjadi <b>"Halo, selamat datang di website kami!"</b>.
        </p>

        </>
    );

    const materiContent = (
        <>
     <ul>
            <li>innerHTML digunakan untuk mengubah atau mendapatkan konten HTML dari sebuah elemen, 
                termasuk tag HTML di dalamnya. Dengan innerHTML, kita bisa menambahkan atau mengubah 
                elemen HTML lain di dalam elemen target.</li>
        </ul>
        <p>Perhatikan kode di bawah ini!</p>
        <KodeEditor
        key="editor2"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <div id="container">Selamat datang!</div>
    <button onclick="ubahKonten()">Klik untuk ubah konten</button>

    <script>
    function ubahKonten() {
        var container = document.getElementById("container");
        container.innerHTML = "<h2>Konten Baru</h2><p>Ini adalah paragraf baru.</p>";
    }
    </script>
</body>
</html>
`}
         runnable={true}
         editorId="editor2" 
        />

        <p>
          Saat halaman web dimuat, elemen <code>&lt;div&gt;</code> dengan atribut <code>id="container"</code> menampilkan teks <b>"Selamat datang!"</b>. 
          Di bawahnya terdapat sebuah tombol <b>"Klik untuk ubah konten"</b>. Tombol ini memiliki atribut <code>onclick</code> yang akan menjalankan fungsi JavaScript bernama <code>ubahKonten()</code>.
        </p>
        <p>
          Di dalam fungsi <code>ubahKonten()</code>, elemen dengan <code>id="container"</code> diakses menggunakan <i>method</i> <code>document.getElementById()</code>. 
          Kemudian, properti <code>innerHTML</code> digunakan untuk mengganti seluruh isi HTML di dalam elemen tersebut menjadi <code>&lt;h2&gt;Konten Baru&lt;/h2&gt;&lt;p&gt;Ini adalah paragraf baru.&lt;/p&gt;</code>. 
          Ini memungkinkan kita untuk menyisipkan struktur HTML baru, bukan hanya teks biasa.
        </p>

        </>
    );

    const materiContent1 = (
        <>
         <p>Perbedaan utama antara textContent dan innerHTML terletak pada cara keduanya menangani konten di dalam elemen HTML. 
        textContent digunakan untuk mengubah atau mendapatkan teks murni dari elemen, tanpa mempengaruhi elemen HTML di dalamnya. 
        Sebaliknya, innerHTML digunakan untuk mengubah atau mendapatkan konten HTML, yang berarti Anda bisa menyisipkan tag HTML 
        seperti <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, atau elemen lainnya ke dalam elemen target.</p>

        <p>Oleh karena itu, textContent lebih tepat digunakan saat hanya ingin mengubah teks, sementara innerHTML lebih cocok 
            digunakan saat perlu memodifikasi atau menambah elemen HTML di dalam elemen yang ditargetkan.</p>
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
          <AktivitasBox aktivitas={<Materi description={materiContent} />} />
          <AktivitasBox aktivitas={<Materi description={materiContent1} />} /> 
          <AktivitasBox aktivitas={aktivitas} />
        
          <div className="d-flex justify-content-end ms-4 me-4 mt-5">
            <button
              onClick={() => navigate("/materi/memanipulasiAtributElemen")}
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

export default MateriMengubahKonten;
