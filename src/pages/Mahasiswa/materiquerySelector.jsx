import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import Isian from "../../components/isian.jsx";
import questions from "../../data/AktivitasMengakses/querySelector.json"; // Pastikan path ini sesuai dengan struktur folder Anda
import Instruksi from "../../components/instruksi.jsx";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran.jsx";

const MateriquerySelector = () => {
  const [progress, setProgress] = useState(0);
  const [halamanAktif, setHalamanAktif] = useState(7); // halaman saat ini
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
          <li>Memahami fungsi dan cara kerja metode querySelector dan querySelectorAll dalam DOM.</li>
        </ul>
        </>
      )

  const description = (
      <>
        <Header title="querySelector dan querySelectorAll" />
        <p>
        Metode querySelector() dan querySelectorAll() memberikan fleksibilitas yang lebih tinggi dalam memilih elemen-elemen berdasarkan selektor CSS. 
        <b> querySelector()</b> mengembalikan elemen pertama yang cocok dengan selektor, sementara <b>querySelectorAll()</b> mengembalikan semua elemen yang cocok.
        <ul>
            <li>querySelector(): Mengembalikan elemen pertama yang cocok dengan selektor CSS.</li>
            <li>querySelectorAll(): Mengembalikan NodeList dari semua elemen yang cocok dengan selektor CSS.</li>
        </ul>
        </p>
        <p>Perhatikan kode di bawah ini!</p>
        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <h1 class="title">Judul Utama</h1>
    <p class="content">Ini adalah paragraf pertama.</p>
    <p class="content">Ini adalah paragraf kedua.</p>

    <script>
        var firstParagraph = document.querySelector(".content");
        alert("Elemen yang diakses: " + firstParagraph.textContent);
    </script>

</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>Pada contoh di atas, <code>querySelector(".content")</code> memilih elemen pertama yang memiliki class 
        <code> content</code>. Dalam hal ini, elemen yang dipilih adalah paragraf pertama, yaitu 
        <code> &lt;p class="content"&gt;Ini adalah paragraf pertama.&lt;/p&gt;</code>. Fungsi querySelector hanya 
        mengembalikan elemen pertama yang sesuai dengan selector yang diberikan.</p>
        
        <p>Perhatikan kode di bawah ini</p>
        <KodeEditor
        key="editor2"
         code={`<!DOCTYPE html>
<html lang="en">
<body>
    <ul>
        <li class="item">Item 1</li>
        <li class="item">Item 2</li>
        <li class="item">Item 3</li>
    </ul>

    <script>
        var allItems = document.querySelectorAll(".item");
        for (var i = 0; i < allItems.length; i++) {
            alert("Elemen ke-" + (i + 1) + ": " + allItems[i].textContent);
        }
    </script>

</body>
</html>`}
         runnable={true}
         editorId="editor2" 
        />
        <p>Pada contoh di atas, <code>querySelectorAll(".item")</code> digunakan untuk mengakses semua elemen dengan 
        class <code>item</code>. Fungsi ini mengembalikan NodeList yang berisi semua elemen yang memiliki kelas tersebut 
        (dalam hal ini, elemen <code>&lt;li&gt;</code> dengan class <code>item</code>).</p>

        <p>NodeList ini kemudian diproses menggunakan perulangan <code>for</code>. Pada setiap iterasi, elemen ke-<em>i</em> 
        diakses dengan <code>allItems[i]</code> dan textContent untuk mengambil isi teks dari elemen tersebut dalam sebuah alert. Setiap elemen ditampilkan secara berurutan, seperti berikut:</p>

        <ul>
        <li>Elemen ke-1: Item 1</li>
        <li>Elemen ke-2: Item 2</li>
        <li>Elemen ke-3: Item 3</li>
        </ul>

        <p>Dengan demikian, perulangan ini memungkinkan untuk menampilkan semua elemen yang diakses menggunakan
            querySelectorAll.</p>

        </>
    );
  
  const materiContent = (
    <>
      <p>Keunggulan utama dari metode querySelector() dan querySelectorAll() adalah kemampuannya untuk 
            menggunakan selektor CSS kompleks. Misalnya, kita bisa menggunakan ID, class, elemen, atau bahkan atribut dalam satu selektor.</p>
        <p>Perhatikan kode di bawah ini!</p>
        <KodeEditor
        key="editor3"
         code={`<!DOCTYPE html>
<html lang="en">
<body>
    <div class="box highlight" id="firstBox">Box pertama</div>
    <div class="box" id="secondBox">Box kedua</div>

    <script>

    var content = document.querySelector("#firstBox.highlight");
    alert("Elemen yang diakses adalah " + content.textContent);

    </script>

</body>
</html>`}
         runnable={true}
         editorId="editor3" 
        />
        <p>Pada contoh di atas, <code>#firstBox.highlight</code> akan memilih hanya elemen yang memiliki 
        id <code>firstBox</code> dan class <code>highlight</code>. Selektor ini dapat lebih kompleks dan 
        fleksibel jika dibandingkan dengan metode lainnya.</p>
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
          <AktivitasBox aktivitas={<Materi description={materiContent} />} />
          <AktivitasBox aktivitas={aktivitas} />
        <div className="d-flex justify-content-between ms-4 me-4 mt-5">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => navigate("/materi/classname")}
            className="btn btn-secondary"
          >
            Sebelumnya
          </button>

          {/* Tombol Selanjutnya */}
          <button
            onClick={() => navigate("/materi/nodeTraversing")}
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

export default MateriquerySelector;
