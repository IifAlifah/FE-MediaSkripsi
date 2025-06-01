import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar_profile";
import Materi from "../../components/Materi";
import GambarAktivitas from "../../components/gambarAktivitas";
import AktivitasBox from "../../components/box.jsx";
import Header from "../../components/header";
import KodeEditor from "../../components/kodeEditor.jsx";
import Isian from "../../components/isian.jsx";
import questions from "../../data/AktivitasManipulasi/MemanipulasiElemen.json"; // Pastikan path ini sesuai dengan struktur folder Anda
import Instruksi from "../../components/instruksi.jsx";
import axios from "axios";
import SidebarMahasiswa from "../../components/sidebarMahasiswa.jsx";
import TujuanPembelajaran from "../../components/tujuanPembelajaran.jsx";

const MateriMenambahMenghapus = () => {
    const [progress, setProgress] = useState(0);
    const [halamanAktif, setHalamanAktif] = useState(12); // halaman saat ini
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
          <li>Memahami dan menerapkan cara menambahkan serta menghapus elemen HTML dalam DOM.</li>
        </ul>
        </>
      )

    const description = (
      <>
      <Header title="Menambah dan Menghapus Elemen" />
          <p>Selain mengubah teks dan atribut, kita juga bisa menambah atau menghapus elemen baru ke dalam DOM 
              secara dinamis menggunakan metode <code>createElement()</code> dan <code>remove()</code>.</p>
      </>
    );
    const materiContent1 = (
        <>
        1. <strong>Menambah Elemen dengan <code>createElement()</code></strong><br></br>
        <p>Untuk membuat elemen baru, kita bisa menggunakan <code>createElement()</code>. Setelah elemen 
        baru dibuat, elemen tersebut dapat dimasukkan ke dalam dokumen menggunakan <code>appendChild()</code> atau <code>insertBefore()</code>.
        </p>
        <ul>
          <li>
            <strong><code>appendChild()</code></strong>: Metode ini digunakan untuk menambahkan elemen baru ke dalam elemen induk 
            (<em>parent element</em>) di akhir daftar anak (<em>child nodes</em>).
          </li>
          <li>
            <strong><code>insertBefore()</code></strong>: Metode ini memungkinkan kita menyisipkan elemen baru sebelum elemen tertentu 
            yang sudah ada. Metode ini membutuhkan dua argumen: elemen yang akan disisipkan dan elemen referensi (elemen sebelum elemen baru disisipkan).
          </li>
        </ul>
        <p>Perhatikan kode di bawah ini!</p>

        <KodeEditor
        key="editor1"
        code={`<!DOCTYPE html>
<html lang="en">
<body>
    <h1>Judul Halaman</h1>
    <p>Paragraf pertama.</p>
    <script>
        // Membuat elemen baru (div)
        let elemenBaru = document.createElement("div");
        elemenBaru.textContent = "Ini adalah elemen baru!";

        // Menambahkan elemen baru ke akhir body dengan appendChild
        document.body.appendChild(elemenBaru);

        // Membuat elemen baru lainnya (paragraf)
        let paragrafBaru = document.createElement("p");
        paragrafBaru.textContent = "Paragraf baru yang disisipkan.";

        // Menyisipkan paragraf baru sebelum h1 dengan insertBefore
        let elemenTujuan = document.querySelector("h1");
        document.body.insertBefore(paragrafBaru, elemenTujuan);
    </script>
</body>
</html>`}
         runnable={true}
         editorId="editor1" 
        />
        <br></br>
        <p>Pada kode di atas, pertama-tama kita membuat sebuah elemen <code>&lt;div&gt;</code> baru menggunakan 
        <code> document.createElement("div")</code>, lalu kita memberikan isi berupa teks 
        "Ini adalah elemen baru!" menggunakan <code>textContent</code>.</p>

        <p>Setelah elemen selesai dibuat dan diberi isi, kita menambahkannya ke akhir elemen 
        <code> &lt;body&gt;</code> menggunakan metode <code>appendChild()</code>, sehingga elemen tersebut akan muncul 
        di bagian paling bawah halaman.</p>

        <p>Selanjutnya, kita membuat elemen <code>&lt;p&gt;</code> baru dengan cara yang sama dan mengisinya dengan teks 
        "Paragraf baru yang disisipkan.". Setelah itu, kita mengambil elemen <code>&lt;h1&gt;</code> dari halaman 
        menggunakan <code>document.querySelector("h1")</code>, lalu menyisipkan paragraf baru tersebut sebelum elemen <code>&lt;h1&gt;</code> menggunakan metode <code>insertBefore()</code>.</p>

        <p>Dengan demikian, paragraf baru akan muncul di atas judul halaman, sedangkan elemen 
        <code> &lt;div&gt;</code> yang dibuat pertama akan muncul di bagian paling akhir.</p>
</>
    )

    const materiContent2 = (
        <>
        2. <strong>Menghapus Elemen dengan <code>remove()</code></strong><br></br>
        <p>Jika kita ingin menghapus elemen dari dokumen, kita dapat menggunakan metode <code>remove()</code> pada elemen tersebut. Metode ini akan langsung menghapus elemen dari 
        struktur DOM tanpa perlu melibatkan elemen induknya.</p>
        <p>Perhatikan kode di bawah ini!</p>

        <KodeEditor
        key="editor2"
         code={`<!DOCTYPE html>
<html lang="en">
<body>
    <div id="content">
        <p id="text">Ini adalah paragraf yang akan dihapus.</p>
        <p>Ini adalah paragraf kedua yang tetap ditampilkan.</p>
    </div>

    <script>
        var text = document.getElementById("text");
        text.remove(); 
    </script>
</body>
</html>
`}
         runnable={true}
         editorId="editor2" 
        />
        <br></br>
       <p>Pada kode di atas, elemen <code>&lt;p id="text"&gt;</code> pertama-tama diambil menggunakan <code>document.getElementById('text')</code> 
       dan disimpan dalam variabel <code>text</code>. Kemudian, metode <code>remove()</code> digunakan untuk menghapus elemen tersebut dari DOM. Dengan 
       demikian, paragraf yang berisi teks "Ini adalah paragraf yang akan dihapus." akan dihapus dari halaman web saat skrip dijalankan. Perlu dicatat 
       bahwa <code>remove()</code> menghapus elemen beserta semua konten dan atributnya, sementara metode lain seperti <code>removeAttribute()</code> 
       hanya akan menghapus atribut dari elemen tanpa menghapus elemen itu sendiri.</p>


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
          <AktivitasBox aktivitas={<Materi description={materiContent1} />} />
          <AktivitasBox aktivitas={<Materi description={materiContent2} />} />
          <AktivitasBox aktivitas={aktivitas} />

        <div className="d-flex justify-content-between ms-4 me-4 mt-5">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => navigate("/materi/menambah_menghapus")}
            className="btn btn-secondary"
          >
            Sebelumnya
          </button>

          {/* Tombol Selanjutnya */}
          <button
            onClick={() => navigate("/materi/mengubahCss")}
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

export default MateriMenambahMenghapus;
